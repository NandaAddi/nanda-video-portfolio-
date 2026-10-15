/**
 * Cloudflare Worker: Reverse Proxy & CDN Edge Cache for hello.nandaaddiwijaya.my.id
 * Proxies requests to jsDelivr (GitHub repository assets)
 * and provides secure server-side POST /upload without exposing GitHub PAT to frontend.
 */

const DEFAULT_CONFIG = {
  GITHUB_OWNER: 'NandaAddi',
  GITHUB_REPO: 'portfolio-assets',
  GITHUB_BRANCH: 'main',
  JSDELIVR_BASE: 'https://cdn.jsdelivr.net',
};

export default {
  async fetch(request, env, ctx) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Max-Age': '86400',
    };

    // 1. Handle CORS Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const url = new URL(request.url);
    const pathname = url.pathname;

    // 2. Handle POST /upload (Server-side upload using env secrets)
    if (request.method === 'POST' && pathname === '/upload') {
      const token = env.GITHUB_ACCESS_TOKEN;
      const owner = env.GITHUB_REPO_OWNER || env.GITHUB_OWNER || DEFAULT_CONFIG.GITHUB_OWNER;
      const repo = env.GITHUB_REPO_NAME || env.GITHUB_REPO || DEFAULT_CONFIG.GITHUB_REPO;
      const branch = env.GITHUB_BRANCH || DEFAULT_CONFIG.GITHUB_BRANCH;

      if (!token) {
        return new Response(
          JSON.stringify({ error: 'GITHUB_ACCESS_TOKEN is not configured in Cloudflare Worker environment.' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      try {
        const body = await request.json();
        const { filename, content, folder = 'images' } = body;

        if (!content) {
          return new Response(JSON.stringify({ error: 'Missing file content' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        const cleanName = (filename || 'asset.webp').toLowerCase().replace(/[^a-z0-9.-]/g, '-');
        const filePath = `${folder}/${Date.now()}-${cleanName}`;

        const ghRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
            'User-Agent': 'Cloudflare-Worker-CDN-Proxy',
          },
          body: JSON.stringify({
            message: `Upload media via Admin: ${filePath}`,
            content: content,
            branch: branch,
          }),
        });

        if (!ghRes.ok) {
          const errData = await ghRes.json().catch(() => ({}));
          return new Response(
            JSON.stringify({ error: errData.message || `GitHub error ${ghRes.status}` }),
            { status: ghRes.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const proxiedUrl = `https://${url.hostname}/${filePath}`;
        return new Response(
          JSON.stringify({ success: true, url: proxiedUrl, path: filePath }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Only allow GET and HEAD for asset delivery
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
    }

    // Root status route
    if (pathname === '/' || pathname === '') {
      const owner = env.GITHUB_REPO_OWNER || env.GITHUB_OWNER || DEFAULT_CONFIG.GITHUB_OWNER;
      const repo = env.GITHUB_REPO_NAME || env.GITHUB_REPO || DEFAULT_CONFIG.GITHUB_REPO;
      const branch = env.GITHUB_BRANCH || DEFAULT_CONFIG.GITHUB_BRANCH;
      return new Response(
        JSON.stringify({
          status: 'online',
          service: 'Custom CDN Proxy (jsDelivr + GitHub)',
          domain: url.hostname,
          target: `${owner}/${repo}@${branch}`,
          timestamp: new Date().toISOString(),
        }, null, 2),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // 3. Resolve Target jsDelivr URL
    const owner = env.GITHUB_REPO_OWNER || env.GITHUB_OWNER || DEFAULT_CONFIG.GITHUB_OWNER;
    const repo = env.GITHUB_REPO_NAME || env.GITHUB_REPO || DEFAULT_CONFIG.GITHUB_REPO;
    const branch = env.GITHUB_BRANCH || DEFAULT_CONFIG.GITHUB_BRANCH;

    let targetUrl;
    if (pathname.startsWith('/gh/')) {
      targetUrl = `${DEFAULT_CONFIG.JSDELIVR_BASE}${pathname}${url.search}`;
    } else {
      const cleanPath = pathname.replace(/^\/+/, '');
      targetUrl = `${DEFAULT_CONFIG.JSDELIVR_BASE}/gh/${owner}/${repo}@${branch}/${cleanPath}${url.search}`;
    }

    // 4. Check Cloudflare Edge Cache
    const cacheKey = new Request(targetUrl, request);
    const cache = caches.default;
    let cachedResponse = await cache.match(cacheKey);

    if (cachedResponse) {
      const resHeaders = new Headers(cachedResponse.headers);
      resHeaders.set('X-Proxy-Cache', 'HIT');
      resHeaders.set('Access-Control-Allow-Origin', '*');
      return new Response(cachedResponse.body, {
        status: cachedResponse.status,
        statusText: cachedResponse.statusText,
        headers: resHeaders,
      });
    }

    // 5. Fetch upstream asset from jsDelivr
    try {
      const upstreamResponse = await fetch(targetUrl, {
        headers: { 'User-Agent': 'NandaAddi-CDN-Proxy/1.0' },
      });

      if (!upstreamResponse.ok) {
        return new Response(
          `Asset not found on jsDelivr/GitHub (${upstreamResponse.status}). Target: ${targetUrl}`,
          {
            status: upstreamResponse.status,
            headers: { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' },
          }
        );
      }

      const headers = new Headers(upstreamResponse.headers);
      headers.set('Access-Control-Allow-Origin', '*');
      headers.set('X-Proxy-Cache', 'MISS');
      headers.set('X-Proxied-By', url.hostname);
      headers.set('Cache-Control', 'public, max-age=31536000, s-maxage=31536000, immutable');

      const responseToCache = new Response(upstreamResponse.body, {
        status: upstreamResponse.status,
        statusText: upstreamResponse.statusText,
        headers,
      });

      ctx.waitUntil(cache.put(cacheKey, responseToCache.clone()));
      return responseToCache;
    } catch (err) {
      return new Response(`Proxy Error: ${err.message}`, {
        status: 502,
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
    }
  },
};
