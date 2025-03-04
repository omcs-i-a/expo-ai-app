# AIチャットアプリ用 Cursor ルール (.cursorrules)

## プロジェクト概要

- このプロジェクトは、React Native (Expo) を使って、多機能AIチャットアプリを開発するものです。
- Web 版 (Vercel にデプロイ) とネイティブ版 (iOS/Android) の両方に対応し、可能な限りコードを共有します。
- チャット機能では、OpenAI と Gemini の API を使い分け、ユーザーの質問に AI が回答します。
- チャットの内容に応じて、「学び」タブに情報をまとめたり、「プロ」タブに遷移して専門家に相談したりできます。
- Pro プランの価格に関する質問には、RAG (Retrieval-Augmented Generation) システムを使って回答します。

## 開発について

機能開発を行う際は、develop ブランチから新しい機能ブランチを作成します (例: git checkout -b feature/new-feature develop)。

機能ブランチでの作業が完了したら、develop ブランチにプルリクエストを作成してマージします。

develop ブランチが安定したら、main ブランチにマージしてリリースして、vercelに自動デプロイします。

## ディレクトリ構造

my-expo-app/
├── app/ # Expo Router によりルーティングされるアプリ本体
│ ├── (tabs)/ # タブナビゲーション用のグループ（Web・ネイティブ共通）
│ │ ├── _layout.tsx # タブ全体のレイアウト設定。ここでWebとモバイルのスタイルを分岐
│ │ ├── index.tsx # ホーム画面
│ │ ├── chat.tsx # チャット画面（共通ロジック＋プラットフォームごとに条件分岐も可能）
│ │ ├── manabi.tsx # 「学び」タブ：学びに関する話題のまとめ画面
│ │ ├── pro.tsx # 「プロ」タブ：専門家選択などPro向けの画面（専門家に相談するフロー用）
│ │ └── ... # その他のタブ（例：exploreなど）
│ ├── (modals)/ # モーダル (Web, モバイル共通)
│ ├── components/ # 画面固有のコンポーネント
│ │ ├── chat/ # チャット関連コンポーネント
│ │ │ ├── Header.tsx
│ │ │ ├── MessageList.tsx
│ │ │ ├── MessageItem.tsx
│ │ │ ├── InputArea.tsx
│ │ │ └── ProModal.tsx # 専門家相談モーダル (Web, モバイル共通)
│ │ └── ...
│ ├── contexts/ # コンテキスト (状態管理)
│ │ └── ChatContext.tsx # チャットの状態 (APIキーなど)
│ ├── data/ # データ (例: ドメインモデル, APIレスポンスの型)
│ ├── hooks/ # カスタムフック
│ ├── lib/ # 外部ライブラリ (自作)
│ │ └── openai.ts # OpenAI API クライアント
│ │ └── gemini.ts # Gemini API クライアント
│ │ └── rag.ts # RAG システム クライアント
│ ├── services/ # ドメインサービス、アプリケーションサービス
│ ├── utils/ # ユーティリティ関数
│ └── constants/ # 定数
├── components/ # 再利用可能な UI コンポーネント
├── assets/
├── .gitignore
├── app.json
├── package.json
└── tsconfig.json