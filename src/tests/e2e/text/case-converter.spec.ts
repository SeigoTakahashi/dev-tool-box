import { test, expect} from "@playwright/test";

test.describe("命名規則変換ページ", () => {
    // 各テストの前にページへ移動
    test.beforeEach(async ({ page }) => {
        await page.goto("/text/case-converter");
    });

    test("主要な入力フォームとプレビューが表示されていること", async ({
        page,
    }) => {
        // 入力エリアが表示されているか
        await expect(
            page.locator(
                'textarea[placeholder="ここにテキストを入力してください...（例：HelloWorld）"]',
            ),
        ).toBeVisible();

        // 変換後エリアが表示されているか
        await expect(page.locator('span, p').filter({ hasText: /^キャメルケース$/ })).toBeVisible();
        await expect(page.locator('span, p').filter({ hasText: /^ケバブケース$/ })).toBeVisible();
        await expect(page.locator('span, p').filter({ hasText: /^スネークケース$/ })).toBeVisible();
        await expect(page.locator('span, p').filter({ hasText: /^パスカルケース$/ })).toBeVisible();
    });

    test("テキストを入力すると、各命名規則に変換されたプレビューが表示されること", async ({
        page,
    }) => {
        const inputText = "Hello World Example";

        // テキストを入力エリアに入力
        await page.fill(
            'textarea[placeholder="ここにテキストを入力してください...（例：HelloWorld）"]',
            inputText,
        );

        // 各命名規則のプレビューが表示されているか確認
        await expect(page.locator('span, p').filter({ hasText: /^キャメルケース$/ })).toBeVisible();
        await expect(page.locator('span, p').filter({ hasText: /^helloWorldExample$/ })).toBeVisible();
    });
});