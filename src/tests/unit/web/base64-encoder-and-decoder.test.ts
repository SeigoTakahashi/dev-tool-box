import { encodeBase64 } from "../../../features/web/utils/base64-encoder";
import { decodeBase64 } from "../../../features/web/utils/base64-decoder";
import { describe, it, expect } from "vitest";

// Base64エンコード・デコード関数のユニットテスト
describe("Base64Encoder And Decoder", () => {
  it("encode → decode で元に戻る", () => {
    const original = "日本語 + English 123 !?";
    const encoded = encodeBase64(original);

    expect(encoded.ok).toBe(true);

    if (encoded.ok) {
      const decoded = decodeBase64(encoded.value);
      expect(decoded.ok).toBe(true);
      if (decoded.ok) {
        expect(decoded.value).toBe(original);
      }
    }
  });

  it("ASCII文字列はRFC準拠のBase64になる", () => {
    const r = encodeBase64("Hello");
    expect(r.ok && r.value).toBe("SGVsbG8=");
  });

  it("不正なBase64文字列はエラーになる", () => {
    const r = decodeBase64("%%%");
    expect(r.ok).toBe(false);
  });

  it("空文字は空文字のまま", () => {
    const encoded = encodeBase64("");
    const decoded = decodeBase64(encoded.ok ? encoded.value : "");

    expect(decoded.ok && decoded.value).toBe("");
  });
});
