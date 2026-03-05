import 'dotenv/config'; // env読み込み（server/.env）
import express from 'express'; // expressは簡易webサーバー

const app = express();

const HOTPEPPER_KEY = process.env.HOTPEPPER_API_KEY;
if (!HOTPEPPER_KEY) {
  console.warn('[WARN] HOTPEPPER_API_KEY が未設定です（server/.env を確認）');
}

app.get('/api/gourmet', async (req, res) => {
  const url = new URL('https://webservice.recruit.co.jp/hotpepper/gourmet/v1/');
  url.searchParams.set('key', HOTPEPPER_KEY || '');
  url.searchParams.set('format', 'json');

  for (const [k, v] of Object.entries(req.query)) {
    const sv = Array.isArray(v) ? v[0] : v;
    if (typeof sv === 'string' && sv) url.searchParams.set(k, sv);
  }

  try {
    const r = await fetch(url.toString());
    if (!r.ok) {
      const body = await r.text();
      return res.status(r.status).send(body);
    }
    const data = await r.json();
    return res.json(data?.results?.shop ?? []);
  } catch (e: unknown) {
    return res.status(500).json({ error: (e as Error).message ?? 'proxy error' });
  }
});

app.listen(3001, () => console.log('Hotpepper proxy on http://localhost:3001/api/gourmet'));

console.log('[DEBUG] HOTPEPPER_API_KEY =', process.env.HOTPEPPER_API_KEY ? 'LOADED' : 'MISSING');
