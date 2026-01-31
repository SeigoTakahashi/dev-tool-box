import { test, expect } from "@playwright/test";

test.describe("JSONフォーマッタページ", () => {
  // 各テストの前にページへ移動
  test.beforeEach(async ({ page }) => {
    await page.goto("/json/formatter");
  });

  test("主要な入力フォームとプレビューが表示されていること", async ({
    page,
  }) => {
    // JSON入力エリアがあるか
    await expect(
      page.locator(
        'textarea[placeholder="ここに整形したいテキストを入力してください"]',
      ),
    ).toBeVisible();

    // 整形ボタンがあるか
    await expect(page.getByText("きれいにする↓↓")).toBeVisible();

    // 整形結果エリアがあるか
    await expect(
      page.locator('textarea[placeholder="整形結果がここに表示されます"]'),
    ).toBeVisible();
  });

  test("JSONを整形できること", async ({ page }) => {
    const inputJson = '{"name":"John","age":30,"city":"New York"}';
    const formattedJson = `{
  "name": "John",
  "age": 30,
  "city": "New York"
}`;

    // JSON入力エリアにテキストを入力
    await page.fill(
      'textarea[placeholder="ここに整形したいテキストを入力してください"]',
      inputJson,
    );

    // 整形ボタンをクリック
    await page.click("text=きれいにする↓↓");

    // 整形結果エリアに期待される整形済みJSONが表示されていることを確認
    await expect(
      page.locator('textarea[placeholder="整形結果がここに表示されます"]'),
    ).toHaveValue(formattedJson);
  });

  test("無効なJSONを入力した場合、エラーメッセージが表示されること", async ({
    page,
  }) => {
    const invalidJson = '{"name":"John","age":30,"city":"New York"'; // 閉じ括弧がない無効なJSON

    // JSON入力エリアに無効なテキストを入力
    await page.fill(
      'textarea[placeholder="ここに整形したいテキストを入力してください"]',
      invalidJson,
    );

    // 整形ボタンをクリック
    await page.click("text=きれいにする↓↓");

    // エラーメッセージが表示されていることを確認
    await expect(page.getByText("エラー: ")).toBeVisible();
  });
});
