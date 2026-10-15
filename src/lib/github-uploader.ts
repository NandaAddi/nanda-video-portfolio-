/**
 * GitHub Media Asset Uploader Utility
 * Uploads media assets via secure server endpoint (/api/upload or Cloudflare Worker /upload).
 * ZERO credentials or secrets are stored in the frontend or localStorage!
 * All tokens (GITHUB_ACCESS_TOKEN, GITHUB_REPO_OWNER, GITHUB_REPO_NAME) reside exclusively in .env.
 */

export const CDN_DOMAIN = (import.meta.env.PUBLIC_CDN_DOMAIN || 'hi.nandaaddiwijaya.my.id').replace(/\/+$/, '');

/**
 * Convert a browser File object to a Base64 string (without data URL prefix)
 */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

/**
 * Upload a media file via server endpoint.
 * In local development: /api/upload (Vite dev middleware reads .env)
 * In production: https://hello.nandaaddiwijaya.my.id/upload (Cloudflare Worker reads .env)
 */
export async function uploadFileToGitHub(
  file: File,
  folder: string = 'images'
): Promise<{ url: string; path: string }> {
  const base64Content = await fileToBase64(file);

  const payload = {
    filename: file.name,
    content: base64Content,
    folder,
  };

  // 1. Try local dev server endpoint first (/api/upload)
  try {
    const localRes = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (localRes.ok) {
      const data = await localRes.json();
      return { url: data.url, path: data.path };
    }

    // If server returned an explicit error JSON, display that error
    const errJson = await localRes.json().catch(() => ({}));
    if (errJson && errJson.error) {
      throw new Error(errJson.error);
    }
  } catch (err: any) {
    if (err.message && (err.message.includes('GITHUB_ACCESS_TOKEN') || !err.message.includes('fetch'))) {
      throw err;
    }
    // If /api/upload is not reachable (e.g. running on production static host without Functions), fall through to Worker
  }

  // 2. Try Cloudflare Worker CDN Proxy upload endpoint if custom worker domain is configured
  if (CDN_DOMAIN && CDN_DOMAIN !== 'hello.nandaaddiwijaya.my.id' && CDN_DOMAIN !== 'hi.nandaaddiwijaya.my.id') {
    const workerEndpoint = `https://${CDN_DOMAIN}/upload`;
    const remoteRes = await fetch(workerEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!remoteRes.ok) {
      const errData = await remoteRes.json().catch(() => ({}));
      throw new Error(
        errData.error || `Gagal mengupload via server CDN (Status ${remoteRes.status}).`
      );
    }

    const result = await remoteRes.json();
    return {
      url: result.url,
      path: result.path,
    };
  }

  throw new Error('Upload gagal: Endpoint /api/upload belum tersedia di server. Pastikan Cloudflare Pages deployment terbaru sudah selesai.');
}

/**
 * Trigger static site rebuild webhook
 */
export async function triggerDeployWebhook(webhookUrl?: string): Promise<{ success: boolean; message: string }> {
  const targetUrl = webhookUrl || (import.meta.env.PUBLIC_DEPLOY_WEBHOOK as string);

  if (!targetUrl) {
    throw new Error('Deploy Webhook URL belum diisi di .env (PUBLIC_DEPLOY_WEBHOOK).');
  }

  try {
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trigger: 'admin_portfolio_update', timestamp: new Date().toISOString() }),
    });

    if (!response.ok) {
      throw new Error(`Webhook returned status ${response.status}`);
    }

    return {
      success: true,
      message: 'Perintah rebuild website berhasil dikirim ke server build!',
    };
  } catch (err: any) {
    throw new Error(`Gagal memicu build webhook: ${err.message}`);
  }
}
