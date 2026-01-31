import { test, expect } from "@playwright/test";

test.describe("テキスト比較ページ", () => {
  // 各テストの前にページへ移動
  test.beforeEach(async ({ page }) => {
    await page.goto("/text/text-diff");
  });

  test("主要な入力フォームと差分結果が表示されていること", async ({ page }) => {
    // 入力エリアが表示されているか
    await expect(
      page.locator('textarea[placeholder="テキスト1を入力"]'),
    ).toBeVisible();

    await expect(
      page.locator('textarea[placeholder="テキスト2を入力"]'),
    ).toBeVisible();

    // 比較ボタンが表示されているか
    await expect(page.getByText("比較する")).toBeVisible();
  });

  test("2つのテキストを入力して比較すると、差分結果が表示されること", async ({
    page,
  }) => {
    const text1 = "Hello World!\nThis is a test.\nHave a nice day.";
    const text2 = "Hello World!\nThis is an example.\nHave a great day.";

    // テキストを入力エリアに入力
    await page.fill('textarea[placeholder="テキスト1を入力"]', text1);

    await page.fill('textarea[placeholder="テキスト2を入力"]', text2);

    // 比較ボタンをクリック
    await page.click("text=比較する");

    // 差分結果エリアが表示されているか確認
    const resultArea = page.locator(".diff-container");
    await expect(resultArea).toBeVisible();
  });
});
