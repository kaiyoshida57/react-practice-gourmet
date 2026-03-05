export default function UsageGuide() {
  return (
    <section className="usage-guide">
      <h2 className="usage-guide-title">使い方 📖</h2>

      <div className="usage-guide-block">
        <h3 className="usage-guide-subtitle">検索する</h3>
        <p>
          上の検索欄に、探したいお店のキーワード（例：ラーメン、カフェ、居酒屋）を入力して「検索」を押すと、お店の一覧が表示されます。近くのお店を探したいときは、緯度・経度を入力するか「現在地取得」を押してから「検索」を押してください。
        </p>
      </div>

      <div className="usage-guide-block">
        <h3 className="usage-guide-subtitle">行きたいお店を保存する</h3>
        <p>
          検索結果の各お店カードにある「行きたい」ボタンを押すと、そのお店が「行きたいボード」に追加されます。追加したお店にはメモを付けたり、一覧から削除したりできます。保存した内容は、お使いの端末にのみ残り、同じブラウザで開けば次回以降もご利用いただけます。
        </p>
      </div>
    </section>
  );
}
