import { describe, it, expect, vi } from 'vitest';
import { removeBackground } from '../../../features/image/utils/background-remover';
import { removeBackground as imglyRemoveBackground } from "@imgly/background-removal";

// ライブラリをモック化する
vi.mock("@imgly/background-removal", () => ({
  removeBackground: vi.fn(),
}));

describe("removeBackground", () => {
  it("背景除去に成功したとき、ok: true と画像URLを返すこと", async () => {
    const mockInputArrayBuffer = new ArrayBuffer(8);

    // モックの戻り値を設定
    const mockResultBlob = new Blob(["removed image content"], { type: 'image/png' });
    vi.mocked(imglyRemoveBackground).mockResolvedValue(mockResultBlob);

    const result = await removeBackground(mockInputArrayBuffer, "image/png");

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toContain("blob:");
    }
  });

  it("背景除去に失敗したとき、ok: false とエラーメッセージを返すこと", async () => {
    const mockInputArrayBuffer = new ArrayBuffer(8);

    // モックがエラーを投げるように設定
    vi.mocked(imglyRemoveBackground).mockRejectedValue(new Error("Removal failed"));

    const result = await removeBackground(mockInputArrayBuffer, "image/png");

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("背景除去に失敗しました。");
    }
  });
});