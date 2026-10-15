// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://hi.nandaaddiwijaya.my.id',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/admin'),
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'id'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    optimizeDeps: {
      include: ['@supabase/supabase-js'],
    },
    plugins: [
      {
        name: 'dev-api-upload-handler',
        configureServer(server) {
          // Dev middleware for /images proxy
          server.middlewares.use('/images', async (req, res, next) => {
            const env = loadEnv('development', process.cwd(), '');
            const owner = env.GITHUB_REPO_OWNER || 'NandaAddi';
            const repo = env.GITHUB_REPO_NAME || 'portfolio-assets';
            const branch = env.GITHUB_BRANCH || 'main';
            const upstream = `https://cdn.jsdelivr.net/gh/${owner}/${repo}@${branch}/images${req.url}`;
            try {
              const fetchRes = await fetch(upstream);
              if (fetchRes.ok) {
                const contentType = fetchRes.headers.get('content-type') || 'image/jpeg';
                res.setHeader('Content-Type', contentType);
                const arrayBuffer = await fetchRes.arrayBuffer();
                res.end(Buffer.from(arrayBuffer));
                return;
              }
            } catch (e) {}
            next();
          });

          server.middlewares.use('/api/upload', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.end('Method Not Allowed');
              return;
            }

            const env = loadEnv('development', process.cwd(), '');
            const token = env.GITHUB_ACCESS_TOKEN;
            const owner = env.GITHUB_REPO_OWNER || 'NandaAddi';
            const repo = env.GITHUB_REPO_NAME || 'portfolio-assets';
            const branch = env.GITHUB_BRANCH || 'main';
            const domain = env.PUBLIC_CDN_DOMAIN || 'hi.nandaaddiwijaya.my.id';

            if (!token) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'GITHUB_ACCESS_TOKEN belum diset di file .env server' }));
              return;
            }

            // Read JSON body
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', async () => {
              try {
                const { filename, content, folder = 'images' } = JSON.parse(body);
                const cleanName = (filename || 'asset.webp').toLowerCase().replace(/[^a-z0-9.-]/g, '-');
                const filePath = `${folder}/${Date.now()}-${cleanName}`;

                const ghRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
                  method: 'PUT',
                  headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json',
                    'User-Agent': 'Astro-Portfolio-Server',
                  },
                  body: JSON.stringify({
                    message: `Upload media via Admin Portfolio: ${filePath}`,
                    content: content,
                    branch: branch,
                  }),
                });

                if (!ghRes.ok) {
                  const errJson = await ghRes.json().catch(() => ({}));
                  res.statusCode = ghRes.status;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: errJson.message || `Gagal commit ke GitHub (${ghRes.status})` }));
                  return;
                }

                const proxiedUrl = `https://${domain}/${filePath}`;
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, url: proxiedUrl, path: filePath }));
              } catch (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: err.message }));
              }
            });
          });
        },
      },
    ],
  },
});
