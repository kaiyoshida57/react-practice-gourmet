import { useState } from 'react';

type Props = {
  onSearch: (params: Record<string, string>) => void;
};

export default function SearchForm({ onSearch }: Props) {
  const [keyword, setKeyword] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [range, setRange] = useState('3'); // 1000m
  const [count, setCount] = useState('20'); // 取得件数

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      keyword: keyword.trim(),
      ...(lat && lng ? { lat, lng, range } : {}),
      count,
    });
  };

  const useGeolocation = () => {
    if (!navigator.geolocation) return alert('Geolocationが利用できません');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude.toFixed(6));
        setLng(pos.coords.longitude.toFixed(6));
      },
      (err) => alert(`位置取得に失敗：${err.message}`),
    );
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-fields-row">
        <div className="input-with-icon">
          <span className="search-bar-icon">
            <svg width="16" height="16" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="#aaa" strokeWidth="1.5" />
              <path d="M11.1 11.1l3 3" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="例：ラーメン 新橋"
            type="text"
            className="search-form-keyword-input"
          />
        </div>
      </div>
      <div className="search-fields-row">
        <input
          value={lat}
          onChange={(e) => setLat(e.target.value)}
placeholder="緯度（任意）"
            type="text"
            className="search-form-field-flex"
          />
        <input
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          placeholder="経度（任意）"
            type="text"
            className="search-form-field-flex"
          />
        <select value={range} onChange={(e) => setRange(e.target.value)}>
          <option value="1">300m</option>
          <option value="2">500m</option>
          <option value="3">1000m</option>
          <option value="4">2000m</option>
          <option value="5">3000m</option>
        </select>
        <button type="button" onClick={useGeolocation}>
          現在地取得
        </button>
      </div>
      <div className="search-actions-row">
        <select value={count} onChange={(e) => setCount(e.target.value)}>
          <option value="10">10件</option>
          <option value="20">20件</option>
          <option value="50">50件</option>
        </select>
        <button type="submit">検索</button>
      </div>
    </form>
  );
}
