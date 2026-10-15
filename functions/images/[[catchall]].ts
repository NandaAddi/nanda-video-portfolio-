interface Env {
  GITHUB_REPO_OWNER?: string;
  GITHUB_REPO_NAME?: string;
  GITHUB_BRANCH?: string;
}

export const onRequestGet = async (context: { request: Request; env: Env }) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const pathname = url.pathname; // e.g. /images/1792091263320-mqdefault--1-.jpg

  const owner = env.GITHUB_REPO_OWNER || 'NandaAddi';
  const repo = env.GITHUB_REPO_NAME || 'portfolio-assets';
  const branch = env.GITHUB_BRANCH || 'main';

  // Target upstream on GitHub / jsDelivr CDN
  const cleanPath = pathname.replace(/^\/+/, '');
  const upstreamUrl = `https://cdn.jsdelivr.net/gh/${owner}/${repo}@${branch}/${cleanPath}`;

  try {
    const upstreamResponse = await fetch(upstreamUrl, {
      headers: {
        'User-Agent': 'NandaAddi-Portfolio-Proxy/1.0',
      },
    });

    if (!upstreamResponse.ok) {
      return new Response(`Asset tidak ditemukan (${upstreamResponse.status}): ${cleanPath}`, {
        status: upstreamResponse.status,
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    const headers = new Headers(upstreamResponse.headers);
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Cache-Control', 'public, max-age=31536000, s-maxage=31536000, immutable');
    headers.set('X-Proxied-By', url.hostname);

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers,
    });
  } catch (err: any) {
    return new Response(`Error fetching asset: ${err.message}`, {
      status: 502,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
};

export const onRequestHead = onRequestGet;

export const onRequestOptions = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
    },
  });
};
