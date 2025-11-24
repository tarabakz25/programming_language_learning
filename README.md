# プログラミング言語学習プラットフォーム

わかりやすくプログラミング言語を学べる動的な学習サイトです。

## 機能

- 📚 **わかりやすい解説記事**: 公式ドキュメントの構造を保ちながら、初心者にも理解しやすい解説を提供
- 🔐 **認証機能**: Google/GitHubアカウントでログイン可能（Supabase使用）
- 💡 **実践的な例**: 各セクションに実際に動作するコード例を用意
- ✅ **確認問題**: 各セクションの最後に3択または4択形式のクイズを提供
- 🌙 **ダークモード対応**: システム設定に応じて自動切り替え

## 技術スタック

- **フレームワーク**: Next.js 16 (App Router)
- **スタイリング**: Tailwind CSS v4
- **認証**: Supabase Auth
- **コンテンツ**: MDX (next-mdx-remote)
- **UIコンポーネント**: shadcn/ui
- **パッケージマネージャー**: Bun

## セットアップ

### 1. 依存関係のインストール

\`\`\`bash
bun install
\`\`\`

### 2. Supabaseの設定

1. [Supabase](https://supabase.com)でプロジェクトを作成
2. プロジェクト設定から以下を取得:
   - Project URL
   - Anon Key
3. `.env.local`ファイルを作成:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

### 3. Supabase認証の設定

Supabaseダッシュボードで以下を設定:

1. **Authentication > Providers** で以下を有効化:
   - Google OAuth
   - GitHub OAuth

2. **Authentication > URL Configuration** で以下を設定:
   - Site URL: `http://localhost:3000` (開発環境)
   - Redirect URLs: `http://localhost:3000/auth/callback`

### 4. 開発サーバーの起動

\`\`\`bash
bun run dev
\`\`\`

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

## コンテンツの追加方法

### 新しい言語の追加

1. `content/[言語名]/` ディレクトリを作成
2. セクションごとに `.mdx` ファイルを作成

例:

\`\`\`bash
mkdir -p content/python
touch content/python/variables.mdx
\`\`\`

### MDXファイルの構造

`TEMPLATE_INSTRUCTIONS.md` を参照してください。基本的な構造は以下の通りです:

\`\`\`mdx
# セクションタイトル

## 概要
...

## 解説
...

## 例
\`\`\`python
# コード例
\`\`\`

## 確認問題
<Quiz
  questions={[...]}
/>
\`\`\`

### サンプルコンテンツ

`content/python/variables.mdx` にサンプルコンテンツが含まれています。これを参考に新しいコンテンツを作成できます。

## プロジェクト構造

\`\`\`
.
├── app/                    # Next.js App Router
│   ├── auth/              # 認証関連
│   ├── learn/             # 学習コンテンツページ
│   └── page.tsx           # ホームページ
├── components/            # Reactコンポーネント
│   ├── auth/              # 認証コンポーネント
│   ├── layout/            # レイアウトコンポーネント
│   ├── quiz.tsx           # クイズコンポーネント
│   └── ui/                # UIコンポーネント
├── content/               # MDXコンテンツ
│   └── [language]/        # 言語ごとのディレクトリ
├── lib/                   # ユーティリティ
│   ├── content.ts         # コンテンツ読み込み
│   ├── mdx.tsx            # MDXレンダリング
│   └── supabase/          # Supabaseクライアント
└── TEMPLATE_INSTRUCTIONS.md  # コンテンツ生成ガイド
\`\`\`

## ビルド

\`\`\`bash
bun run build
\`\`\`

## ライセンス

MIT
