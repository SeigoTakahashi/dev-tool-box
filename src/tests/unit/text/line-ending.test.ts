import { normalizeLineEnding } from "../../../features/text/utils/line-ending";
import { describe, it, expect } from "vitest";

// 改行コード正規化ユーティリティのテスト
describe("normalizeLineEnding", () => {
  describe("LF への変換", () => {
    it("LFはそのまま", () => {
      expect(normalizeLineEnding("a\nb", "lf")).toBe("a\nb");
    });

    it("CRLFをLFに変換する", () => {
      expect(normalizeLineEnding("a\r\nb", "lf")).toBe("a\nb");
    });

    it("CRをLFに変換する", () => {
      expect(normalizeLineEnding("a\rb", "lf")).toBe("a\nb");
    });

    it("混在改行をLFに統一する", () => {
      expect(normalizeLineEnding("a\r\nb\nc\rd", "lf"))
        .toBe("a\nb\nc\nd");
    });
  });

  describe("CRLF への変換", () => {
    it("LFをCRLFに変換する", () => {
      expect(normalizeLineEnding("a\nb", "crlf")).toBe("a\r\nb");
    });

    it("CRをCRLFに変換する", () => {
      expect(normalizeLineEnding("a\rb", "crlf")).toBe("a\r\nb");
    });

    it("混在改行をCRLFに統一する", () => {
      expect(normalizeLineEnding("a\r\nb\nc\rd", "crlf"))
        .toBe("a\r\nb\r\nc\r\nd");
    });
  });

  describe("CR への変換", () => {
    it("LFをCRに変換する", () => {
      expect(normalizeLineEnding("a\nb", "cr")).toBe("a\rb");
    });

    it("CRLFをCRに変換する", () => {
      expect(normalizeLineEnding("a\r\nb", "cr")).toBe("a\rb");
    });
  });

  describe("境界ケース", () => {
    it("空文字は空文字のまま", () => {
      expect(normalizeLineEnding("", "lf")).toBe("");
    });

    it("改行が含まれない場合はそのまま", () => {
      expect(normalizeLineEnding("abc", "crlf")).toBe("abc");
    });

    it("末尾改行も変換される", () => {
      expect(normalizeLineEnding("a\n", "crlf")).toBe("a\r\n");
    });
  });
});