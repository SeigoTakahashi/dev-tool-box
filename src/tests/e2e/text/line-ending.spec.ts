import { test, expect } from "@playwright/test";

test.describe("改行コード変換ページ", () => {
  // 各テストの前にページへ移動
  test.beforeEach(async ({ page }) => {
    await page.goto("/text/line-ending");
  });

  test("主要な入力フォームとプレビューが表示されていること", async ({
    page,
  }) => {
    // 入力エリアが表示されているか
    await expect(
      page.locator(
        'textarea[placeholder="ここに改行コードを変換したいテキストを入力してください"]',
      ),
    ).toBeVisible();

    // 改行コード設定エリアが表示されているか
    await expect(page.getByRole("radio", { name: "LF (\\n)" })).toBeVisible();
    await expect(
      page.getByRole("radio", { name: "CRLF (\\r\\n)" }),
    ).toBeVisible();
    await expect(page.getByRole("radio", { name: "CR (\\r)" })).toBeVisible();

    // 変換ボタンが表示されているか
    await expect(page.getByText("変換する")).toBeVisible();

    // 変換結果エリアが表示されているか
    await expect(
      page.locator('textarea[placeholder="変換結果がここに表示されます"]'),
    ).toBeVisible();
  });

  test("テキストを入力して改行コードを変換すると、変換結果が表示されること", async ({
    page,
  }) => {
    const inputText = "Line 1\r\nLine 2\r\nLine 3";

    // テキストを入力エリアに入力
    await page.fill(
      'textarea[placeholder="ここに改行コードを変換したいテキストを入力してください"]',
      inputText,
    );

    // 改行コード設定をLFに変更
    await page.getByRole("radio", { name: "LF (\\n)" }).check();

    // 変換ボタンをクリック
    await page.click("text=変換する");

    // 変換結果エリアが表示されているか確認
    const resultArea = page.locator(
      'textarea[placeholder="変換結果がここに表示されます"]',
    );
    await expect(resultArea).toBeVisible();

    // 変換結果が正しいか確認
    const expectedOutput = "Line 1\nLine 2\nLine 3";
    await expect(resultArea).toHaveText(expectedOutput);
  });
});
