import { test, expect } from "@playwright/test";

test.describe("グラデーションプレビューページ", () => {
  // 各テストの前にページへ移動
  test.beforeEach(async ({ page }) => {
    await page.goto("/color/gradient-preview"); // configのbaseURLが適用されます
  });

  test("主要な入力フォームとプレビューが表示されていること", async ({
    page,
  }) => {
    await expect(page.getByLabel("開始色")).toBeVisible();
    await expect(page.getByLabel("終了色")).toBeVisible();
    await expect(page.getByLabel("角度 (0-360度)")).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'CSSコード' })).toBeVisible();
  });

  test("開始色と終了色を変更すると、プレビューが更新されること", async ({
    page,
  }) => {
    // カラーピッカー（input type="color"）を特定
    // TextFieldの直前にあるカラーピッカーを取得する
    const startPicker = page.locator('input[type="color"]').first();
    const endPicker = page.locator('input[type="color"]').nth(1);

    // 色を変更 (fillではなく、直接valueを設定してinputイベントを発火させる)
    await startPicker.fill("#ff0000"); // 赤
    await endPicker.fill("#0000ff");   // 青

    // readonlyのTextFieldに値が反映されているか確認
    await expect(page.getByLabel("開始色")).toHaveValue("#ff0000");
    await expect(page.getByLabel("終了色")).toHaveValue("#0000ff");

    // CSSコードの内容を確認
    const cssCodeArea = page.getByRole('textbox', { name: 'CSSコード' });
    // TextFieldの中身をチェック
    await expect(cssCodeArea).toHaveValue(
      "background: linear-gradient(90deg, #ff0000, #0000ff);"
    );
  });
});
