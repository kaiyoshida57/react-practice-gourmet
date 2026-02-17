import type { HotpepperShop, WishItem } from '../types/hotpepper';

type Props = {
  shops: HotpepperShop[];
  onAdd: (item: WishItem) => void;
};

export default function ResultList({ shops, onAdd }: Props) {
  if (!shops?.length) return <p className="results-empty">検索結果はありません。</p>;

  return (
    <div className="results">
      {shops.map((s) => (
        <div key={s.id} className="card">
          {s.photo?.mobile?.l ? (
            <div className="card-image">
              <img src={s.photo.mobile.l} alt={s.name} />
            </div>
          ) : (
            <div className="card-image" aria-hidden />
          )}
          <div className="card-body">
            <h2 className="card-title">{s.name}</h2>
            {s.genre?.name && <p className="card-genre">{s.genre.name}</p>}
            {s.address && <p className="card-address">{s.address}</p>}
            {s.access && <p className="card-access">{s.access}</p>}
            <button
              type="button"
              className="card-add-btn"
              onClick={() =>
                onAdd({
                  id: s.id,
                  name: s.name,
                  address: s.address,
                  genre: s.genre?.name,
                  photo: s.photo?.mobile?.l,
                })
              }
            >
              行きたいに追加
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
