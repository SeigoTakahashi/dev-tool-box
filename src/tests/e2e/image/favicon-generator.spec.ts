import { test, expect } from "@playwright/test";

test.describe("Favicon生成ページ", () => {
    // 各テストの前にページへ移動
    test.beforeEach(async ({ page }) => {
        await page.goto("/image/favicon-generator"); 
    });

    test("主要な入力フォームとプレビューが表示されていること", async ({ page }) => {
        // 画像ファイルを選択ボタンがあるか
        await expect(page.getByText("画像ファイルを選択")).toBeVisible();
    });
});
    