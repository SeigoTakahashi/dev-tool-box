import { test, expect } from "@playwright/test";

test.describe("QRコード生成ページ", () => {
  // 各テストの前にページへ移動
  test.beforeEach(async ({ page }) => {
    await page.goto("/utility/qr-code-generator");
  });

  test("主要な入力フォームと生成ボタンが表示されていること", async ({
    page,
  }) => {
    // URL入力フィールドがあるか
    await expect(page.getByLabel("URL")).toBeVisible();

    // 生成ボタンが表示されているか
    await expect(
      page.getByRole("button", { name: "QRコードを生成" }),
    ).toBeVisible();
  });

  test("URLを入力して生成ボタンをクリックすると、QRコードが表示されること", async ({
    page,
  }) => {
    const testUrl = "https://example.com";

    // URL入力フィールドに値を入力
    await page.fill(
      'input[placeholder="QRコードに変換したいURLを入力してください"]',
      testUrl,
    );

    // 生成ボタンをクリック
    await page.getByRole("button", { name: "QRコードを生成" }).click();

    // QRコード画像が表示されているか確認
    const qrCodeImage = page.locator(".qr-code-box");
    await expect(qrCodeImage).toBeVisible();
  });
});
