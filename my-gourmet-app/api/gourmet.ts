// 本番（Vercel Functions）版API（VercelはこのファイルをServerless Functionsとして自動デプロイします。）

import type { VercelRequest, VercelResponse } from '@vercel/node';
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const HOTPEPPER_KEY = process.env.HOTPEPPER_API_KEY;   // ← 行6
    if (!HOTPEPPER_KEY) {
      return res.status(500).json({ error: 'HOTPEPPER_API_KEY not set' });
    }
    const url = new URL('https://webservice.recruit.co.jp/hotpepper/gourmet/v1/');
    url.searchParams.set('key', HOTPEPPER_KEY);
    url.searchParams.set('format', 'json');
    for (const [k, v] of Object.entries(req.query)) {
      const sv = Array.isArray(v) ? v[0] : v;
      if (typeof sv === 'string' && sv) url.searchParams.set(k, sv);
    }
    const r = await fetch(url.toString());
    if (!r.ok) {
      const body = await r.text();
      return res.status(r.status).send(body);
    }
    const data = await r.json();
    return res.json(data?.results?.shop ?? []);
  } catch (e: any) {
    return res.status(500).json({ error: e?.message ?? 'proxy error' });
  }
}
