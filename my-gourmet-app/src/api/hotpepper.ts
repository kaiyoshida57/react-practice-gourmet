
// フロントは自前APIのみ呼ぶ
export async function searchGourmet(params: Record<string, string>) {
  // 同一オリジンの /api/gourmet を叩く
  const url = new URL('/api/gourmet', window.location.origin);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v); // 空文字は除外
  });

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Proxy error: ${res.status}`);
  return await res.json(); // ← shops配列が返る
}
