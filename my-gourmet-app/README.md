
# グルメ探しアプリ（React × TypeScript × ホットペッパーAPI）

ホットペッパー グルメサーチAPIを使って飲食店を検索し、「行きたい」ボードに保存することも可能なWebアプリです。

## 機能
- キーワード検索／位置検索（緯度・経度／現在地）
- 検索結果のカード表示（店名／ジャンル／住所／アクセス／写真）
- 「行きたい」ボードへの追加／メモ保存／削除（LocalStorage）

## 技術
- React（Vite, TypeScript）
- ホットペッパー グルメサーチAPI
- LocalStorage
- Vercel（デプロイ）

## セットアップ
```bash
npm install
cp .env.example .env
# .env および server/.envに正しいAPIキーを設定
npm run dev
```

### ローカル

ローカルホストのAPIアクセスでは、ホットペッパーAPI側のCORSにより、許可されていません。
そのため、Viteのdev-proxy＋簡易Nodeのサーバー再度経由でアクセスさせるようにしています。

※別ターミナルで同時に実行する
```bash
npm run server
```
次が確認できればOK
http://localhost:3001/api/gourmet?keyword=ラーメン&count=3


### 構成
my-gourmet-app/
├─ server/
│  ├─ index.ts          # ← バックエンド（Express）
│  └─ .env              # ← サーバ側の環境変数
├─ src/                 # ← フロント（React/Vite）
│  ├─ ...tsx
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
