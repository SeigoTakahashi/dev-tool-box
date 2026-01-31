import { test, expect } from "@playwright/test";

test.describe("検索機能の確認", () => {
  test("検索バーが表示され、検索が機能すること", async ({ page }) => {
    // アプリケーションのホームページに移動
    await page.goto("/");

    // 検索バーが表示されていることを確認
    const searchInput = page.locator('input[placeholder="Search tools..."]');
    await expect(searchInput).toBeVisible();

    // 検索バーにキーワードを入力
    const keyword = "cron";
    await searchInput.fill(keyword);

    // 検索結果が表示されることを確認
    const firstResult = page.locator(".tool-card").first();
    await expect(firstResult).toBeVisible();

    // 検索結果がキーワードを含んでいることを確認
    const resultText = await firstResult.textContent();
    expect(resultText?.toLowerCase()).toContain(keyword);

    // 検索結果をクリックして、対応するツールページに遷移することを確認
    await firstResult.click();
    await expect(page).toHaveURL("/web/cron-generator");
  });

  test("検索バーに存在しないキーワードを入力した場合、適切なメッセージが表示されること", async ({
    page,
  }) => {
    // アプリケーションのホームページに移動
    await page.goto("/");

    // 検索バーが表示されていることを確認
    const searchInput = page.locator('input[placeholder="Search tools..."]');
    await expect(searchInput).toBeVisible();

    // 存在しないキーワードを入力
    const nonexistentKeyword = "nonexistenttool";
    await searchInput.fill(nonexistentKeyword);

    // 「該当するツールが見つかりませんでした。」メッセージが表示されることを確認
    const noResultsMessage = page.locator(
      `text=No results for "${nonexistentKeyword}"`,
    );
    await expect(noResultsMessage).toBeVisible();
  });
});
