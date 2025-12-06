# Copilot Instructions

このリポジトリでは、以下の開発指針・ディレクトリ構成・命名規則・テスト方針に従ってコードを生成すること。

---

# 1. プロジェクト全体方針

- 必要になるまで作らない（YAGNI）
- 複雑にしない、重複させない（KISS / DRY）
- 関心ごとを分離し、役割ごとにファイル・関数を分割する
- 名前は「意図」を伝える。コメントは「なぜそうするか」を書く
- マジックナンバーは定数化し、巨大な式は分解する
- 使わないコードはすぐ削除。スコープは最小に
- 小さく変更 → テスト → 改善を繰り返す
- 共通処理は utils に切り出すが、過剰抽象化は避ける
- フォーマットは Prettier / ESLint を徹底する

---

# 2. 機能一覧（この範囲の実装を前提とする）

## ■ テキスト系ツール
- 文字数・バイト数・単語数カウンター
- 改行コード変換（LF ⇄ CRLF）
- 命名規則変換（スネーク ⇄ キャメル）
- diff（テキスト比較）
- Markdown → HTML プレビュー

## ■ JSONツール
- JSON整形（フォーマッタ）
- JSONバリデータ
- JSON → CSV 変換
- CSV → JSON 変換

## ■ Web開発者向けツール
- URLエンコード・デコード
- Base64エンコード・デコード
- 正規表現テスター
- Cron式ジェネレーター
- ハッシュ生成器（MD5、SHA-1、SHA-256）

## ■ 色ツール
- カラーコード変換（hex ⇄ rgb ⇄ hsl）
- カラーパレット生成
- グラデーションプレビュー

## ■ 画像ツール
- 画像圧縮
- Favicon生成
- 背景除去

## ■ 生活便利ツール
- QRコード生成
- 単位変換
- ランダム生成（パスワード / 名前 / ランダム選択）
- パスワード強度チェッカー

---

# 3. ディレクトリ構成

Copilot は以下のディレクトリ構造を必ず守ること。

.github/
	workflows/
		ci.yml
	copilot-instructions.md

features/
  text/
    components/
      TextCounter.tsx
      CaseConverter.tsx
      LineEndingConverter.tsx
      TextDiff.tsx
      MarkdownPreview.tsx
    utils/
      countCharacters.ts
      countWords.ts
      countBytes.ts
      convertCase.ts
      convertLineEnding.ts
      diffText.ts

  json/
    components/
      JsonFormatter.tsx
      JsonValidator.tsx
      JsonToCsv.tsx
      CsvToJson.tsx
    utils/
      formatJson.ts
      validateJson.ts
      jsonToCsv.ts
      csvToJson.ts

  web/
    components/
      UrlEncoderAndDecoder.tsx
      Base64EncoderAndDecoder.tsx
      RegexTester.tsx
      CronGenerator.tsx
      HashGenerator.tsx
    utils/
      encodeUrl.ts
      decodeUrl.ts
      encodeBase64.ts
      decodeBase64.ts
      testRegex.ts
      generateCron.ts
      generateHash.ts

  color/
    components/
      ColorConverter.tsx
      PaletteGenerator.tsx
      GradientPreview.tsx
    utils/
      converteHexRgb.ts
      converteRgbHsl.ts
      generatePalette.ts
      generateGradient.ts

  image/
    components/
      ImageCompressor.tsx
      FaviconGenerator.tsx
      BackgroundRemover.tsx
    utils/
      compressImage.ts
      generateFavicon.ts
      removeBackground.ts

  utility/
    components/
      QrCodeGenerator.tsx
      UnitConverter.tsx
      RandomGenerator.tsx
      PasswordStrengthChecker.tsx
    utils/
      generateQrCode.ts
      convertUnit.ts
      generateRandom.ts
      checkPasswordStrength.ts
   
common/
	components/
	utils/
 
pages/
	text/
	json/
	web/
	color/
	image/
	utility/

tests/
	unit/
		text/
		json/
		web/
		color/
		image/
		utility/

Dockerfile
docker-compose.yml


### ルール
- `components/` → UI（React）
- `utils/` → ロジック・純粋関数
- `pages/` → ページ層（React Router）
- `tests/unit/` → 単体テスト（features と対応）

---

# 4. 命名規則

### React コンポーネント
- **PascalCase**（例: `ColorConverter.tsx`）

### 関数
- **camelCase**

### utils の命名
- `convertHexToRgb.ts`
- `generatePalette.ts`
- `validateJson.ts`
など、「動詞 + 対象」で意図がわかるもの。

---

# 5. テスト方針（AAAパターン）

必ず以下に従うこと：

- **Arrange → Act → Assert（AAAパターン）**
- 読んで意図がわかるテスト名にする
- 外部依存はスタブ / モックで差し替える
- 日時・UUID・乱数など環境依存値は差し替える
- テストを高速に保つ（遅い処理は偽物を使うが使いすぎない）
- シンプルで保守性の高いコーディング

---

# 6. Copilot が生成するときの具体的ルール

### UI とロジックの分離
- UI ロジック → components/
- 処理ロジック → utils/
- 1つの関数は1つの責務

### 既存コードの再利用
- 同じカテゴリの utils を優先的に使う  
- 既存の命名・構造・責務に合わせる
- Material UIを活用すること

### 禁止事項
- 無断でフォルダ構成を変更しない
- 勝手に技術スタックを追加しない

---

# 7. コードスタイル

- TypeScript 前提
- エラー処理は適切に（try/catch を使用）
- Prettier / ESLint のフォーマットを厳守する

---

# 8. 出力フォーマット（Copilotへの指示）

- コードと説明を出す場合は簡潔に
- フォルダ構造に沿ったファイルを生成する
- 既存ファイル名・関数名に従う

---

これらのルールに従って、コード・補完・説明・テストを生成すること。
