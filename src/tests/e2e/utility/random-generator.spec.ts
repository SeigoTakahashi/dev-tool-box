import { test, expect} from "@playwright/test";

test.describe("ランダム生成ページ", () => {
    // 各テストの前にページへ移動
    test.beforeEach(async ({ page }) => {
        await page.goto("/utility/random-generator");
    });

    test("生成ボタンが表示されていること", async ({ page }) => {
        // UUID生成ボタンがあるか
        await expect(page.getByRole("button", { name: "UUID生成" })).toBeVisible();

        // パスワード生成ボタンがあるか
        await expect(page.getByRole("button", { name: "パスワード生成" })).toBeVisible();
    });

    test("UUID生成ボタンをクリックすると、UUIDが表示されること", async ({ page }) => {
        // UUID生成ボタンをクリック
        await page.click('button:has-text("UUID生成")');

        // 生成結果エリアが表示されていることを確認
        const resultArea = page.locator(".uuid-display");
        await expect(resultArea).toBeVisible();

        // UUID形式であることを確認
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        const resultText = await resultArea.textContent();
        expect(resultText).toMatch(uuidRegex);
    });

    test("パスワード生成ボタンをクリックすると、パスワードが表示されること", async ({ page }) => {
        // パスワード生成ボタンをクリック
        await page.click('button:has-text("パスワード生成")');

        // 生成結果エリアが表示されていることを確認
        const resultArea = page.locator(".password-display");
        await expect(resultArea).toBeVisible();

        // 生成されたパスワードが12文字以上であることを確認
        const resultText = await resultArea.textContent();
        expect(resultText && resultText.length).toBeGreaterThanOrEqual(12);
    });
});