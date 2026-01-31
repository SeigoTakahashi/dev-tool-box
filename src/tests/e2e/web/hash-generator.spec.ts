import { test, expect } from "@playwright/test";

test.describe("ハッシュ生成器ページ", () => {
  // 各テストの前にページへ移動
  test.beforeEach(async ({ page }) => {
    await page.goto("/web/hash-generator");
  });

  test("主要な入力フォームが表示されていること", async ({ page }) => {
    // 入力フィールドが表示されているか
    await expect(page.getByLabel("SHA-1")).toBeVisible();
    await expect(page.getByLabel("SHA-256")).toBeVisible();
    await expect(page.getByLabel("SHA-384")).toBeVisible();
    await expect(page.getByLabel("SHA-512")).toBeVisible();

    // 入力と結果表示エリアが表示されているか
    await expect(
      page.locator("textarea[placeholder='ここに入力してください']"),
    ).toBeVisible();
    await expect(
      page.locator("textarea[placeholder='生成結果がここに表示されます']"),
    ).toBeVisible();

    // 変換ボタンが表示されているか
    await expect(page.getByRole("button", { name: "生成する" })).toBeVisible();
  });

  test("テキストを入力してハッシュを生成できること", async ({ page }) => {
    const inputText = "Hello, World!";

    // 入力エリアに値を入力
    await page.fill(
      'textarea[placeholder="ここに入力してください"]',
      inputText,
    );

    // 変換ボタンをクリック
    await page.getByRole("button", { name: "生成する" }).click();

    // 結果表示エリアにハッシュ値が表示されているか確認
    const outputText = await page
      .locator('textarea[placeholder="生成結果がここに表示されます"]')
      .inputValue();
    expect(outputText.length).toBeGreaterThan(0);
  });
});
