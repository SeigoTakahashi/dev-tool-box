import { test, expect } from "@playwright/test";

test.describe("JSON → CSV 変換ページ", () => {
  // 各テストの前にページへ移動
  test.beforeEach(async ({ page }) => {
    await page.goto("/json/json-to-csv");
  });

  test("主要な入力フォームとプレビューが表示されていること", async ({
    page,
  }) => {
    // CSVファイルを選択ボタンがあるか
    await expect(page.getByText("JSONファイルを選択")).toBeVisible();

    // 入力エリアが表示されているか
    await expect(
      page.locator(
        'textarea[placeholder="ここに変換したいJSONを入力してください"]',
      ),
    ).toBeVisible();
  });

  test("JSONデータを入力すると、CSVプレビューが表示されること", async ({
    page,
  }) => {
    const jsonData = `[
  {
    "name": "Alice",
    "age": "30",
    "city": "New York"
  },
  {
    "name": "Bob",
    "age": "25",
    "city": "Los Angeles"
  }
]`;

    // JSONデータを入力エリアに入力
    await page.fill(
      'textarea[placeholder="ここに変換したいJSONを入力してください"]',
      jsonData,
    );

    // CSVダウンロードボタンが表示されているか確認
    await expect(page.getByText("CSVをダウンロード")).toBeVisible();
  });

  test("無効なJSONデータを入力した場合、エラーメッセージが表示されること", async ({
    page,
  }) => {
    const invalidJsonData = `{
  "name": "Alice",
  "age": "30",
  "city": "New York"
}`;
    // JSONデータを入力エリアに入力
    await page.fill(
      'textarea[placeholder="ここに変換したいJSONを入力してください"]',
      invalidJsonData,
    );

    // エラーメッセージが表示されているか確認
    await expect(page.locator(".MuiAlert-root")).toBeVisible();
  });
});
