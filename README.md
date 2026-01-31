# Dev Tool Box 

## 概要
開発者の日常的な「ちょっとした手間」を解消するための、  
**Web完結型ユーティリティツール集**です。

セキュリティを考慮し、**すべての処理はブラウザ（クライアントサイド）のみで完結**します。

🔗 URL  
https://dev-tool-box.pages.dev/

---

## 🛠 技術スタック

| 項目 | 使用技術 |
|----|----|
| Core | React / TypeScript / Vite |
| UI | Material UI / Tailwind CSS |
| Infrastructure | Docker / Cloudflare Pages |
| Test | Vitest（単体） / Playwright（E2E） |
| CI/CD | GitHub Actions |

---

## 🏗 設計のこだわり

### Feature-based Architecture
機能（Text, JSON 等）ごとにディレクトリを分割し、関心事を分離。

### Testing Policy
「壊れたら困る仕様」を重点的にテストし、保守性を担保。

### AI-Driven Development
`copilot-instructions.md` による AI 補完の最適化と品質管理。

---

## 📂 ディレクトリ構成

```plaintext
src/
├── features/ (機能ごとのコンポーネント・ロジック)
├── pages/    (各ツールのルーティング用ページ)
├── common/   (全体共通のUI部品・共通utils)
└── tests/    (単体テスト・E2Eテスト)
````

---

## 📝 機能一覧


#### テキスト系ツール
- 文字数、バイト数、単語数カウンター
- 改行コード変換（LF ⇄ CRLF）
- 命名規則変換（スネーク・キャメル）
- diffツール（2つのテキスト比較）
- Markdown → HTMLプレビュー
#### JSON系ツール
- JSON整形（フォーマッタ）
- JSONバリデータ（try/catch）
- JSON → CSV変換
- CSV → JSON変換
#### Web開発者向けツール
- URLエンコード・デコード
- Base64エンコード・デコード
- 正規表現テスター
- Cron式ジェネレーター
- ハッシュ生成器（SHA-1、SHA-256など）
#### 色系ツール
- カラーコード変換（#hex ⇆ rgb ⇆ hsl）
- カラーパレット生成（ランダム生成 or ベースカラーから派生）
- グラデーションプレビュー
#### 画像系
- 画像圧縮
- Favicon生成
- 画像背景除去
#### 生活便利ツール
- QRコード生成
- 基底変換（2進数 ⇆ 10進数 など）
- ランダムジェネレーター（パスワード、UUID）
- パスワード強度チェッカー

---

## 📦 開発環境のセットアップ

Docker を使用して、コマンド一つで開発環境を構築できます。

```bash
# リポジトリのクローン
git clone https://github.com/SeigoTakahashi/dev-tool-box.git

# Dockerでの起動
docker-compose up -d
```

起動後、以下にアクセス可能です。

```
http://localhost:5174
```

---

## 📝 開発フロー

1. `feature/xxx` ブランチを作成
2. 実装後、ローカルでテストを実行

   ```bash
   npm run test
   ```
3. Pull Request を作成（テンプレートに沿って記述）
4. GitHub Actions による自動テスト通過後、**Squash Merge**
