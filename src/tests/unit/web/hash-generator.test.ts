import { describe, it, expect, vi } from "vitest";
import { generateHash } from "../../../features/web/utils/hash-generator";

// ハッシュ生成関数のユニットテスト
describe("generateHash", () => {
  it("SHA-1アルゴリズムでハッシュを生成できる", async () => {
    const input = "hello world";
    const algorithm = "SHA-1";

    const result = await generateHash(input, algorithm);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.length).toBe(40);
    }
  });
  it("空文字列のハッシュを生成できる", async () => {
    const input = "";
    const algorithm = "SHA-256";

    const result = await generateHash(input, algorithm);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.length).toBe(64);
    }
  });

  it("digestが例外を投げた場合はok:falseを返す", async () => {
    vi.spyOn(crypto.subtle, "digest").mockRejectedValueOnce(new Error("boom"));

    const result = await generateHash("test", "SHA-256");

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("ハッシュ生成に失敗しました。");
    }
  });
});
