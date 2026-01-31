import { test, expect } from "@playwright/test";

test.describe("URLエンコーダーページ", () => {
    // 各テストの前にページへ移動
    test.beforeEach(async ({ page }) => {
        await page.goto("/web/url-encoder");
    });

    test("主要な入力フォームが表示されていること", async ({ page }) => {
        // 変換モード選択エリアがあるか
        await expect(page.getByLabel("エンコード（例：あ → %E3%81%82）")).toBeVisible();
        await expect(page.getByLabel("デコード（例：%E3%81%82 → あ）")).toBeVisible();

        // 入力と結果表示エリアが表示されているか
        await expect(page.locator("textarea[placeholder='ここに入力してください']")).toBeVisible();
        await expect(page.locator("textarea[placeholder='変換結果がここに表示されます']")).toBeVisible();

        // 変換ボタンが表示されているか
        await expect(page.getByRole("button", { name: "変換する" })).toBeVisible();
    });

    test("URLをエンコード・デコードできること", async ({ page }) => {
        const sampleText = "こんにちは";
        const encodedText = "%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF";

        // エンコードモードを選択
        await page.getByLabel("エンコード（例：あ → %E3%81%82）").check();

        // 入力エリアに値を入力
        await page.fill('textarea[placeholder="ここに入力してください"]', sampleText);

        // 変換ボタンをクリック
        await page.getByRole("button", { name: "変換する" }).click();

        // 結果エリアにエンコード結果が表示されていることを確認
        await expect(page.locator('textarea[placeholder="変換結果がここに表示されます"]')).toHaveValue(encodedText);

        // デコードモードを選択
        await page.getByLabel("デコード（例：%E3%81%82 → あ）").check();

        // 入力エリアにエンコード済みの値を入力
        await page.fill('textarea[placeholder="ここに入力してください"]', encodedText);

        // 変換ボタンをクリック
        await page.getByRole("button", { name: "変換する" }).click();

        // 結果エリアにデコード結果が表示されていることを確認
        await expect(page.locator('textarea[placeholder="変換結果がここに表示されます"]')).toHaveValue(sampleText);
    });
});