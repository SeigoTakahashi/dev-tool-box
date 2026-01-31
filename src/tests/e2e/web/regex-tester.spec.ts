import { test, expect } from "@playwright/test";

test.describe("正規表現テスターページ", () => {
  // 各テストの前にページへ移動
  test.beforeEach(async ({ page }) => {
    await page.goto("/web/regex-tester");
  });

  test("主要な入力フォームが表示されていること", async ({ page }) => {
    // 正規表現入力フィールドがあるか
    await expect(
      page.locator("textarea[placeholder='/パターン/']"),
    ).toBeVisible();

    // フラグ入力フィールドがあるか
    await expect(page.getByLabel("g（グローバル）")).toBeVisible();
    await expect(page.getByLabel("i（大文字小文字区別しない）")).toBeVisible();
    await expect(page.getByLabel("m（複数行）")).toBeVisible();
    await expect(page.getByLabel("s（ドット全文字）")).toBeVisible();

    // テキスト入力フィールドがあるか
    await expect(
      page.locator("textarea[placeholder='ここにテキストを入力']"),
    ).toBeVisible();

    // 結果表示エリアがあるか
    await expect(page.getByText("実行結果")).toBeVisible();
  });

    test("正規表現とテキストを入力すると、マッチ結果が表示されること", async ({ page }) => {
    const pattern = "foo";
    const testText = "foo bar foo baz";

    // 正規表現入力フィールドに値を入力
    await page.fill("textarea[placeholder='/パターン/']", pattern);

    // gフラグを有効化
    await page.getByLabel("g（グローバル）").check();

    // テキスト入力フィールドに値を入力
    await page.fill("textarea[placeholder='ここにテキストを入力']", testText);

    // 実行結果にマッチした部分が表示されていることを確認
    const resultArea = page.getByTestId("regex-result-area");
    await expect(resultArea).toBeVisible();
  });

  test("無効な正規表現を入力した場合、エラーメッセージが表示されること", async ({ page }) => {
    const invalidPattern = "[unclosed";

    // 正規表現入力フィールドに無効な値を入力
    await page.fill("textarea[placeholder='/パターン/']", invalidPattern);

    // テキスト入力フィールドに値を入力
    await page.fill("textarea[placeholder='ここにテキストを入力']", "some text");

    // エラーメッセージが表示されていることを確認
    const errorMessage = page.locator(".MuiAlert-root");
    await expect(errorMessage).toBeVisible();
  });
});
