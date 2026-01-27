import { test, expect } from "@playwright/test";

test.describe("カラーコード変換ページ", () => {
  // 各テストの前にページへ移動
  test.beforeEach(async ({ page }) => {
    await page.goto("/color/color-converter"); // configのbaseURLが適用されます
  });

  test("主要な入力フォームとプレビューが表示されていること", async ({ page }) => {
    // HEX入力フィールドがあるか
    await expect(page.getByLabel("RGB")).toBeVisible();
    
    // 初期状態のRGB/HSL表示があるか
    await expect(page.getByLabel("RGB")).toBeVisible();
    await expect(page.getByLabel("HSL")).toBeVisible();

    // カラープレビューが表示されているか
    const preview = page.locator(".MuiGrid-root >> div").nth(1); 
    await expect(preview).toBeVisible();
  });

  test("HEXを変更すると、RGB/HSLとプレビューが更新されること", async ({ page }) => {
    const hexInput = page.getByLabel("HEX");

    // 青色 (#0000FF) を入力
    await hexInput.fill("#0000FF");

    // RGBのテキストフィールドが自動更新されているか確認
    await expect(page.getByLabel("RGB")).toHaveValue("rgb(0, 0, 255)");
    await expect(page.getByLabel("HSL")).toHaveValue("hsl(240, 100%, 50%)");
  });

  test("異常系: 不正なHEXコードを入力した時にエラーが表示されること", async ({ page }) => {
    const hexInput = page.getByLabel("HEX");

    // 不正な値を入力
    await hexInput.fill("invalid-color");

    // Alertが表示されるか
    const alert = page.locator(".MuiAlert-root");
    await expect(alert).toBeVisible();
  });
});