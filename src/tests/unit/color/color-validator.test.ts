import { describe, it, expect } from "vitest";
import { validateHex, validateRgb, validateHsl } from "../../../features/color/utils/color-validator";

// HEXカラーコードのバリデーション関数のテスト
describe("validateHex", () => {
  it("有効な6桁HEXコードを正規化する", () => {
    const result = validateHex("#1a2b3c");

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toBe("#1a2b3c");
    }
  });

  it("有効な3桁HEXコードを6桁に正規化する", () => {
    const result = validateHex("abc");

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toBe("#aabbcc");
    }
  });

  it("不正なHEXコードはエラーになる", () => {
    const result = validateHex("1234");

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(typeof result.error).toBe("string");
      expect(result.error.length).toBeGreaterThan(0);
    }
  });
});

// RGBカラーコードのバリデーション関数のテスト
describe("validateRgb", () => {
  it("有効なRGB関数形式をパースする", () => {
    const result = validateRgb("rgb(255, 0, 128)");

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toEqual({ r: 255, g: 0, b: 128 });
    }
  });

  it("有効なカンマ区切り形式をパースする", () => {
    const result = validateRgb("34, 67, 200");

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toEqual({ r: 34, g: 67, b: 200 });
    }
  });

  it("不正なRGB形式はエラーになる", () => {
    const result = validateRgb("rgb(300, -5, 100)");

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(typeof result.error).toBe("string");
      expect(result.error.length).toBeGreaterThan(0);
    }
  });
});

// HSLカラーコードのバリデーション関数のテスト
describe("validateHsl", () => {
  it("有効なHSL関数形式をパースする", () => {
    const result = validateHsl("hsl(240, 100%, 50%)");

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toEqual({ h: 240, s: 100, l: 50 });
    }
  });

  it("有効なカンマ区切り形式をパースする", () => {
    const result = validateHsl("120, 60%, 70%");

    expect(result.ok).toBe(true);       
    if (result.ok) {
      expect(result.value).toEqual({ h: 120, s: 60, l: 70 });
    }
  });

  it("不正なHSL形式はエラーになる", () => {
    const result = validateHsl("hsl(400, 50%, 50%)");

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(typeof result.error).toBe("string");
      expect(result.error.length).toBeGreaterThan(0);
    }
  });
});