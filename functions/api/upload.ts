interface Env {
  GITHUB_ACCESS_TOKEN?: string;
  GITHUB_REPO_OWNER?: string;
  GITHUB_REPO_NAME?: string;
  GITHUB_BRANCH?: string;
  PUBLIC_CDN_DOMAIN?: string;
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const { request, env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  try {
    const token = env.GITHUB_ACCESS_TOKEN;
    const owner = env.GITHUB_REPO_OWNER || 'NandaAddi';
    const repo = env.GITHUB_REPO_NAME || 'portfolio-assets';
    const branch = env.GITHUB_BRANCH || 'main';

    if (!token) {
      return new Response(
        JSON.stringify({
          error: 'GITHUB_ACCESS_TOKEN belum diset di Cloudflare Pages (Settings > Environment variables).'
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body = await request.json() as { filename?: string; content?: string; folder?: string };
    const { filename, content, folder = 'images' } = body;

    if (!content) {
      return new Response(
        JSON.stringify({ error: 'Konten file tidak ditemukan (Missing file content)' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const cleanName = (filename || 'asset.webp').toLowerCase().replace(/[^a-z0-9.-]/g, '-');
    const filePath = `${folder}/${Date.now()}-${cleanName}`;

    const ghRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'Cloudflare-Pages-Uploader',
      },
      body: JSON.stringify({
        message: `Upload media via Admin: ${filePath}`,
        content: content,
        branch: branch,
      }),
    });

    if (!ghRes.ok) {
      const errJson = (await ghRes.json().catch(() => ({}))) as { message?: string };
      return new Response(
        JSON.stringify({ error: errJson.message || `Gagal commit ke GitHub (Status ${ghRes.status})` }),
        { status: ghRes.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use custom domain URL (hi.nandaaddiwijaya.my.id)
    const requestUrl = new URL(request.url);
    const host = env.PUBLIC_CDN_DOMAIN || requestUrl.host || 'hi.nandaaddiwijaya.my.id';
    const cdnUrl = `https://${host}/${filePath}`;

    return new Response(
      JSON.stringify({ success: true, url: cdnUrl, path: filePath }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || 'Terjadi kesalahan internal server saat upload' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

export const onRequestOptions = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
};
