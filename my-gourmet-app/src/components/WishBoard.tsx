import type { WishItem } from '../types/hotpepper';

type Props = {
  list: WishItem[];
  onMemoChange: (id: string, memo: string) => void;
  onRemove: (id: string) => void;
};

export default function WishBoard({ list, onMemoChange, onRemove }: Props) {
  return (
    <section className="wish-board">
      <h2 className="wish-board-title">行きたいお店ボード 📌</h2>
      {!list.length && <p className="wish-board-empty">まだ追加されていません。</p>}
      <div className="wish-list">
        {list.map((item) => (
          <div key={item.id} className="card">
            {item.photo ? (
              <div className="card-image">
                <img src={item.photo} alt={item.name} />
              </div>
            ) : (
              <div className="card-image" aria-hidden />
            )}
            <div className="card-body">
              <h2 className="card-title">{item.name}</h2>
              <p className="card-meta">{[item.genre, item.address].filter(Boolean).join(' / ')}</p>
              <textarea
                className="card-memo"
                placeholder="メモ"
                value={item.memo || ''}
                onChange={(e) => onMemoChange(item.id, e.target.value)}
              />
              <button type="button" className="card-remove-btn" onClick={() => onRemove(item.id)}>
                削除
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
