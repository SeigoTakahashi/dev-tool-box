import { test, expect } from "@playwright/test";

test.describe("CSV→ JSON 変換ページ", () => {
  // 各テストの前にページへ移動
  test.beforeEach(async ({ page }) => {
    await page.goto("/json/csv-to-json");
  });

  test("主要な入力フォームとプレビューが表示されていること", async ({
    page,
  }) => {
    // CSVファイルを選択ボタンがあるか
    await expect(page.getByText("CSVファイルを選択")).toBeVisible();

    // 入力エリアが表示されているか
    await expect(
      page.locator(
        'textarea[placeholder="ここに変換したいCSVを入力してください"]',
      ),
    ).toBeVisible();
  });

  test("CSVデータを入力すると、JSONプレビューが表示されること", async ({
    page,
  }) => {
    const csvData = `name,age,city
Alice,30,New York
Bob,25,Los Angeles`;

    // CSVデータを入力エリアに入力
    await page.fill(
      'textarea[placeholder="ここに変換したいCSVを入力してください"]',
      csvData,
    );

    // JSONプレビューが表示されているか確認
    const jsonPreview = page.locator(
      'textarea[placeholder="変換結果のJSONがここに表示されます"]',
    ); // JSONプレビューのセレクタを適宜変更してください
    await expect(jsonPreview).toBeVisible();

    // JSONダウンロードボタンが表示されているか確認
    await expect(page.getByText("JSONをダウンロード")).toBeVisible();

    // プレビュー内容が正しいか確認
    const expectedJson = `[
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
    await expect(jsonPreview).toHaveText(expectedJson);
  });

  test("無効なCSVデータを入力した場合、エラーメッセージが表示されること", async ({
    page,
  }) => {
    const invalidCsvData = `name,age,city
Alice,30
Bob,25,Los Angeles,ExtraField`;

    // 無効なCSVデータを入力エリアに入力
    await page.fill(
      'textarea[placeholder="ここに変換したいCSVを入力してください"]',
      invalidCsvData,
    );

    // エラーメッセージが表示されているか確認
    await expect(page.locator('.MuiAlert-root')).toBeVisible();
  });
});
