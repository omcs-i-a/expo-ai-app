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

### 機能ブランチの命名規則

1.  **プレフィックス + 説明:**
    *   `feature/`: 新しい機能を追加するブランチ (例: `feature/add-login`, `feature/user-profile`)
    *   `fix/`: バグを修正するブランチ (例: `fix/login-error`, `fix/button-display`)
    *   `hotfix/`: 本番環境の緊急のバグを修正するブランチ (例: `hotfix/payment-failure`)
    *   `chore/`: コードの変更を伴わない雑多な作業 (例: `chore/update-dependencies`, `chore/refactor-config`)
    *   `docs/`: ドキュメントの変更 (例: `docs/add-api-guide`)
    *   `release/`: リリースの準備をするブランチ (例: `release/1.2.0`)

    プレフィックスを使うことで、ブランチの種類が一目でわかりやすくなります。

2.  **短い説明的な名前:**
    *   ブランチ名には、そのブランチで行う作業の内容を具体的に記述します。
    *   長すぎる名前は避け、簡潔にまとめます。
    *   単語の区切りには、ハイフン (`-`) またはアンダースコア (`_`) を使用します。キャメルケース (例: `addNewFeature`) は一般的ではありません。

3.  **Issue 番号を含める:**
    *   GitHub Issues などを使用している場合、ブランチ名に Issue 番号を含めると、Issue とブランチの関連付けが明確になります (例: `feature/add-login-123`, `fix/login-error-456`)。

**具体的な例:**

| 作業内容                              | ブランチ名の例                                 |
| ------------------------------------- | ---------------------------------------------- |
| ログイン機能の追加(Issue #123 に対応) | `feature/add-login-123`                        |
| ユーザープロフィールの表示            | `feature/user-profile-123`                     |
| ボタンの表示がおかしい問題を修正      | `fix/button-display-123`                       |
| 支払い処理のエラーを修正（緊急）      | `hotfix/payment-failure-123`                   |
| 依存関係の更新                        | `chore/update-dependencies-123`                |
| API ガイドの追加                      | `docs/add-api-guide-123`                       |
| バージョン 1.2.0 のリリース準備       | `release/1.2.0`                                |
| ログイン機能の追加                    | `feature/add-login-123` または `123-add-login` |

**避けるべき名前:**

*   `test`, `wip` (work in progress), `temp` などの曖昧な名前
*   `my-branch`, `new-feature` などの一般的すぎる名前
*   長すぎる名前、スペースを含む名前、特殊文字を含む名前

**チームでのルール作り:**

チームで開発する場合は、ブランチ名の命名規則を統一することが重要です。ルールをドキュメント化し、チームメンバー全員が同じ規則に従うようにしましょう。

**まとめ:**

*   機能ブランチの名前は、そのブランチで行う作業の内容を明確かつ簡潔に表すものにする。
*   プレフィックスを使用すると、ブランチの種類が一目でわかりやすくなる。
*   Issue 番号を含めると、Issue とブランチの関連付けが明確になる。
*   チームで開発する場合は、ブランチ名の命名規則を統一する。




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