import { useCallback, useState, useEffect } from 'react';
import { searchGourmet } from './api/hotpepper';
import SearchForm from './components/SearchForm';
import ResultList from './components/ResultList';
import WishBoard from './components/WishBoard';
import type { WishItem } from './types/hotpepper';
import type { HotpepperShop } from './types/hotpepper';
import Footer from './components/Footer';
import './App.css';

// ローカルストレージ用カスタムフック
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // 例：ストレージ不可（プライベートモード等）は無視
    }
  }, [key, value]);

  return [value, setValue] as const;
}

export default function App() {
  const [shops, setShops] = useState<HotpepperShop[]>([]);
  const [wish, setWish] = useLocalStorage<WishItem[]>('wishShops', []);

  // 検索実行
  // ※useCallbackでメモ化して子コンポーネントの再レンダリングを防止
  const onSearch = useCallback(async (params: Record<string, string>) => {
    try {
      const results = await searchGourmet(params);
      setShops(results);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : '未知のエラー';
      alert(`検索に失敗しました：${msg}`);
    }
  }, []);

  const onAdd = useCallback(
    (item: WishItem) => {
      setWish((prev) => (prev.find((p) => p.id === item.id) ? prev : [...prev, { ...item, memo: '' }]));
    },
    [setWish],
  );

  const onMemoChange = useCallback(
    (id: string, memo: string) => {
      setWish((prev) => prev.map((p) => (p.id === id ? { ...p, memo } : p)));
    },
    [setWish],
  );

  const onRemove = useCallback(
    (id: string) => {
      setWish((prev) => prev.filter((p) => p.id !== id));
    },
    [setWish],
  );

  return (
    <div>
      <h1>
        みんなのグルメ探し <span className="sub-title">行きたいお店をカンタン検索＆保存</span>
      </h1>
      <SearchForm onSearch={onSearch} />
      <ResultList shops={shops} onAdd={onAdd} />
      <WishBoard list={wish} onMemoChange={onMemoChange} onRemove={onRemove} />
      <Footer />
    </div>
  );
}
