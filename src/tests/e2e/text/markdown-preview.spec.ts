import { test, expect } from "@playwright/test";

test.describe("Markdownプレビューページ", () => {
  // 各テストの前にページへ移動
  test.beforeEach(async ({ page }) => {
    await page.goto("/text/markdown-preview");
  });

  test("主要な入力フォームとプレビューが表示されていること", async ({
    page,
  }) => {
    // トグルボタンが表示されているか
    await expect(page.getByLabel("編集モード")).toBeVisible();

    // 入力エリアが表示されているか
    await expect(
      page.locator('textarea[placeholder="Markdown を入力"]'),
    ).toBeVisible();
  });

  test("表示モードを切り替えると、プレビューの表示・非表示が切り替わること", async ({
    page,
  }) => {
    // トグルボタンを切り替える
    const toggle = page.getByLabel("編集モード");
    await toggle.check();

    // プレビューエリアが表示されているか確認
    const previewArea = page.locator(".markdown-body");
    await expect(previewArea).toBeVisible();
  });

  test("Markdown テキストを入力すると、プレビューに正しくレンダリングされること", async ({
    page,
  }) => {
    const markdownText = `# 見出し1

これは**太字**のテキストです。

- リスト項目1
- リスト項目2
- リスト項目3
`;

    // テキストを入力エリアに入力
    await page.fill('textarea[placeholder="Markdown を入力"]', markdownText);

    // トグルボタンを切り替える
    const toggle = page.getByLabel("編集モード");
    await toggle.check();
    
    // プレビューエリアが表示されているか確認
    const previewArea = page.locator(".markdown-body");
    await expect(previewArea).toBeVisible();

    // プレビュー内容が正しいか確認
    await expect(previewArea.getByRole("heading", { level: 1 })).toHaveText(
      "見出し1",
    );
    await expect(
      previewArea.getByText("これは太字のテキストです。"),
    ).toBeVisible();
    await expect(previewArea.getByText("リスト項目1")).toBeVisible();
    await expect(previewArea.getByText("リスト項目2")).toBeVisible();
    await expect(previewArea.getByText("リスト項目3")).toBeVisible();
  });
});
