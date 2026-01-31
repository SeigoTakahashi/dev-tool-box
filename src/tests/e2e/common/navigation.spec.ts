import { test, expect } from "@playwright/test";

test.describe("ナビゲーションの確認", () => {
  test("各ページへ遷移できること", async ({ page }) => {
    // 代表的なページ一覧
    const pages = [
      { name: "テキストカウンター", path: "/text/counter", parent: "Text" },
      { name: "JSONフォーマッタ", path: "/json/formatter", parent: "JSON" },
      {
        name: "URLエンコード・デコード",
        path: "/web/url-encoder",
        parent: "Web",
      },
      {
        name: "カラーコード変換",
        path: "/color/color-converter",
        parent: "Color",
      },
      { name: "画像圧縮", path: "/image/image-compressor", parent: "Image" },
      {
        name: "QRコード生成",
        path: "/utility/qr-code-generator",
        parent: "Utility",
      },
    ];

    for (const pageInfo of pages) {
      // ホームページに移動
      await page.goto("/");

      // ナビゲーショントグルンをクリックしてメニューを開く
      await page.getByRole("button", { name: pageInfo.parent }).click();

      // ナビゲーションリンクをクリック
      await page.getByRole("button", { name: pageInfo.name }).click();

      // 正しいページに遷移したことを確認
      await expect(page).toHaveURL(pageInfo.path);

      // ページの主要な要素が表示されていることを確認（簡易チェック）
      await expect(page.locator("h1, h2").first()).toBeVisible();
    }
  });

  test("存在しないページにアクセスした場合、404ページが表示されること", async ({
    page,
  }) => {
    // 存在しないURLに移動
    await page.goto("/non-existent-page");

    // 404ページの主要な要素が表示されていることを確認
    await expect(page.getByText("ページが見つかりませんでした")).toBeVisible();
  });
});
