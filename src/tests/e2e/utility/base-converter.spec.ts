import { test, expect } from "@playwright/test";

test.describe("基底変換ページ", () => {
  // 各テストの前にページへ移動
  test.beforeEach(async ({ page }) => {
    await page.goto("/utility/base-converter");
  });

  test("主要な入力フォームが表示されていること", async ({ page }) => {
    // 入力エリアが表示されているか
    await expect(
      page.locator('input[placeholder="2進数を入力"]'),
    ).toBeVisible();
    await expect(
      page.locator('input[placeholder="8進数を入力"]'),
    ).toBeVisible();
    await expect(
      page.locator('input[placeholder="10進数を入力"]'),
    ).toBeVisible();
    await expect(
      page.locator('input[placeholder="16進数を入力"]'),
    ).toBeVisible();

    // 変換ボタンが表示されているか
    await expect(page.getByText("変換").first()).toBeVisible();
    await expect(page.getByText("変換").last()).toBeVisible();
  });

  test("2進数を入力すると、他の基底に変換結果が表示されること", async ({
    page,
  }) => {
    const binaryInput = "11111111";

    // 2進数入力エリアに値を入力
    await page.fill('input[placeholder="2進数を入力"]', binaryInput);

    // 変換ボタンをクリック
    const binaryRow = page
      .locator("div")
      .filter({ hasText: "2進数" })
      .last();
    await binaryRow.getByRole("button", { name: "変換" }).click();

    // 他の基底の入力エリアに変換結果が表示されているか確認
    await expect(page.locator('input[placeholder="8進数を入力"]')).toHaveValue(
      "377",
    );
    await expect(page.locator('input[placeholder="10進数を入力"]')).toHaveValue(
      "255",
    );
    await expect(page.locator('input[placeholder="16進数を入力"]')).toHaveValue(
      "FF",
    );
  });

  test("無効な数値を入力した場合、エラーメッセージが表示されること", async ({
    page,
  }) => {
    const invalidInput = "GHI";

    // 16進数入力エリアに無効な値を入力
    await page.fill('input[placeholder="16進数を入力"]', invalidInput);

    // 変換ボタンをクリック
    const convertButton = page.getByText("変換").last();
    await convertButton.click();

    // エラーメッセージが表示されていることを確認
    const errorMessage = page.locator(".MuiAlert-root");
    await expect(errorMessage).toBeVisible();
  });
});
