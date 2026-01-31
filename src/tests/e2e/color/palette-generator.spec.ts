import { test, expect } from "@playwright/test";

test.describe("カラーパレット生成ページ", () => {
  // 各テストの前にページへ移動
  test.beforeEach(async ({ page }) => {
    await page.goto("/color/palette-generator");
  });

  test("主要な入力フォームとプレビューが表示されていること", async ({
    page,
  }) => {
    await expect(page.getByLabel("ベースカラー（HEX）")).toBeVisible();

    // 単色パレットプレビューが表示されているか
    await expect(page.getByText("単色")).toBeVisible();

    // 補色パレットプレビューが表示されているか
    await expect(page.getByText("補色")).toBeVisible();

    // 類似色パレットプレビューが表示されているか
    await expect(page.getByText("類似色")).toBeVisible();

    // 三色配色パレットプレビューが表示されているか
    await expect(page.getByText("三色配色")).toBeVisible();

    // 四色配色パレットプレビューが表示されているか
    await expect(page.getByText("四色配色")).toBeVisible();
  });
});
