import { test, expect } from "@playwright/test";

test.describe("JSONバリデーターページ", () => {
  // 各テストの前にページへ移動
  test.beforeEach(async ({ page }) => {
    await page.goto("/json/validator");
  });

  test("主要な入力フォームが表示されていること", async ({ page }) => {
    // JSON入力エリアがあるか
    await expect(
      page.locator(
        'textarea[placeholder="ここに検証したいJSONを入力してください"]',
      ),
    ).toBeVisible();

    // 検証ボタンがあるか
    await expect(page.getByText("検証する")).toBeVisible();
  });

  test("有効なJSONを入力した場合、成功メッセージが表示されること", async ({
    page,
  }) => {
    const validJson = `{
  "name": "John",
  "age": 30,
  "city": "New York"
}`;

    // JSON入力エリアに有効なJSONを入力
    await page.fill(
      'textarea[placeholder="ここに検証したいJSONを入力してください"]',
      validJson,
    );

    // 検証ボタンをクリック
    await page.click("text=検証する");

    // 成功メッセージが表示されていることを確認
    await expect(page.getByText("有効なJSONです。")).toBeVisible();
  });

  test("無効なJSONを入力した場合、エラーメッセージが表示されること", async ({
    page,
  }) => {
    const invalidJson = `{
  "name": "John",
  "age": 30,
  "city": "New York"`;

    // JSON入力エリアに無効なJSONを入力
    await page.fill(
      'textarea[placeholder="ここに検証したいJSONを入力してください"]',
      invalidJson,
    );

    // 検証ボタンをクリック
    await page.click("text=検証する");

    // エラーメッセージが表示されていることを確認
    await expect(page.getByText("無効なJSONです。")).toBeVisible();
  });
});
