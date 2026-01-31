import { test, expect } from "@playwright/test";

test.describe("テキストカウンターページ", () => {
  // 各テストの前にページへ移動
  test.beforeEach(async ({ page }) => {
    await page.goto("/text/counter");
  });

  test("主要な入力フォームとカウント結果が表示されていること", async ({
    page,
  }) => {
    // 入力エリアが表示されているか
    await expect(
      page.locator(
        'textarea[placeholder="ここにテキストを入力してください..."]',
      ),
    ).toBeVisible();

    // カウント結果エリアが表示されているか
    await expect(
      page.locator("span, p").filter({ hasText: /^文字数$/ }),
    ).toBeVisible();
    await expect(
      page.locator("span, p").filter({ hasText: /^行数$/ }),
    ).toBeVisible();
  });

  test("テキストを入力すると、文字数と行数のカウント結果が表示されること", async ({
    page,
  }) => {
    const inputText = "Hello World! This is a test.";

    // テキストを入力エリアに入力
    await page.fill(
      'textarea[placeholder="ここにテキストを入力してください..."]',
      inputText,
    );

    // 文字数と行数のカウント結果が表示されているか確認
    const charCountCard = page.locator("div.MuiPaper-root", {
      hasText: "文字数",
    });
    await expect(charCountCard).toBeVisible();
    await expect(charCountCard).toHaveText("文字数28文字");

    const lineCountCard = page.locator("div.MuiPaper-root", {
      hasText: "行数",
    });
    await expect(lineCountCard).toBeVisible();
    await expect(lineCountCard).toHaveText("行数1行");
  });
});
