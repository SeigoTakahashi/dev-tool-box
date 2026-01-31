import { test, expect} from "@playwright/test";

test.describe("パスワード強度チェッカーページ", () => {
    // 各テストの前にページへ移動
    test.beforeEach(async ({ page }) => {
        await page.goto("/utility/password-checker");
    });

    test("主要な入力フォームが表示されていること", async ({ page }) => {
        // パスワード入力フィールドがあるか
        await expect(page.getByLabel("パスワード")).toBeVisible();
    });

    test("パスワードを入力すると、強度評価が表示されること", async ({ page }) => {
        const password = "P@ssw0rd123";

        // パスワード入力フィールドに値を入力
        await page.fill('input[placeholder="パスワードを入力"]', password);

        // 強度評価が表示されていることを確認
        const strengthIndicator = page.locator(".strength-indicator");
        await expect(strengthIndicator).toBeVisible();
    });
});