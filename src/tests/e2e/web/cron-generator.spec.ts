import { test, expect } from "@playwright/test";

test.describe("Cron式ジェネレーターページ", () => {
    // 各テストの前にページへ移動
    test.beforeEach(async ({ page }) => {
        await page.goto("/web/cron-generator");
    });

    test("主要な入力フォームが表示されていること", async ({ page }) => {
        // 各フィールドが表示されているか
        await expect(page.getByLabel("毎分")).toBeVisible();
        await expect(page.getByLabel("毎時")).toBeVisible();
        await expect(page.getByLabel("毎日")).toBeVisible();
        await expect(page.getByLabel("毎月")).toBeVisible();
        await expect(page.getByLabel("毎週")).toBeVisible();
        await expect(page.getByLabel("カスタム")).toBeVisible();

        // 初期値である毎日の詳細設定が表示されているか
        await expect(page.getByTestId("daily-hour-input")).toBeVisible();
        await expect(page.getByTestId("daily-minute-input")).toBeVisible();

        // 生成されたCron式が表示されているか
        await expect(page.locator('input[readonly]')).toBeVisible();
    });

    test("毎日の詳細設定を変更すると、生成されるCron式が更新されること", async ({ page }) => {
        // 毎日ラジオボタンを選択
        await page.getByLabel("毎日").check();

        // 時と分の入力フィールドに値を入力
        const hourInput = page.getByTestId("daily-hour-input");
        const minuteInput = page.getByTestId("daily-minute-input");
        await hourInput.fill("14");
        await minuteInput.fill("30");

        // 生成されたCron式が更新されているか確認
        const cronOutput = page.locator('input[readonly]');
        await expect(cronOutput).toHaveValue("30 14 * * *");
    });

    test("無効な時間を入力した場合、エラーメッセージが表示されること", async ({ page }) => {
        // 毎日ラジオボタンを選択
        await page.getByLabel("毎日").check();

        // 無効な時間を入力
        const hourInput = page.getByTestId("daily-hour-input");
        await hourInput.fill("25");

        
        // エラーメッセージが表示されるか確認
        const errorMessage = page.locator(".MuiAlert-root");
        await expect(errorMessage).toBeVisible();
    });
});
