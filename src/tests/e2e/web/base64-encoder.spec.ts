import { test, expect } from "@playwright/test";

test.describe("Base64エンコード・デコードページ", () => {
  // 各テストの前にページへ移動
  test.beforeEach(async ({ page }) => {
    await page.goto("/web/base64-encoder");
  });

  test("主要な入力フォームが表示されていること", async ({ page }) => {
    // エンコード/デコード選択エリアが表示されているか
    await expect(page.getByLabel("エンコード（例：あ → 44GC）")).toBeVisible();
    await expect(page.getByLabel("デコード（例：44GC → あ）")).toBeVisible();

    // 入力と結果表示エリアが表示されているか
    await expect(
      page.locator('textarea[placeholder="ここに入力してください"]'),
    ).toBeVisible();
    await expect(
      page.locator('textarea[placeholder="変換結果がここに表示されます"]'),
    ).toBeVisible();

    // 変換ボタンが表示されているか
    await expect(page.getByRole("button", { name: "変換する" })).toBeVisible();
  });

  test("テキストをエンコードすると、Base64に変換結果が表示されること", async ({
    page,
  }) => {
    const inputText = "Hello, World!";

    // エンコードラジオボタンを選択
    await page.getByLabel("エンコード（例：あ → 44GC）").check();

    // 入力エリアにテキストを入力
    await page.fill(
      'textarea[placeholder="ここに入力してください"]',
      inputText,
    );

    // 変換ボタンをクリック
    await page.getByRole("button", { name: "変換する" }).click();

    // 結果エリアにBase64変換結果が表示されているか確認
    await expect(
      page.locator('textarea[placeholder="変換結果がここに表示されます"]'),
    ).toHaveValue("SGVsbG8sIFdvcmxkIQ==");
  });

  test("Base64をデコードすると、元のテキストに変換結果が表示されること", async ({
    page,
  }) => {
    const base64Text = "SGVsbG8sIFdvcmxkIQ==";

    // デコードラジオボタンを選択
    await page.getByLabel("デコード（例：44GC → あ）").check();

    // 入力エリアにBase64テキストを入力
    await page.fill(
      'textarea[placeholder="ここに入力してください"]',
      base64Text,
    );

    // 変換ボタンをクリック
    await page.getByRole("button", { name: "変換する" }).click();

    // 結果エリアにデコード結果が表示されているか確認
    await expect(
      page.locator('textarea[placeholder="変換結果がここに表示されます"]'),
    ).toHaveValue("Hello, World!");
  });
});
