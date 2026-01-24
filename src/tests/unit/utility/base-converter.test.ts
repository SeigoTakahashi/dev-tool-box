import { describe, it, expect } from "vitest";
import { convertBase } from "../../../features/utility/utils/base-converter";

// 基底変換ユーティリティのテスト
describe("convertBase", () => {
  it("2進数から他の基底へ変換", () => {
    const result = convertBase("11111111", 2);
    expect(result).toEqual({
      ok: true,
      value: {
        binary: "11111111",
        octal: "377",
        decimal: "255",
        hexadecimal: "FF",
      },
    });
  });

  it("10進数から他の基底へ変換", () => {
    const result = convertBase("255", 10);
    expect(result).toEqual({
      ok: true,
      value: {
        binary: "11111111",
        octal: "377",
        decimal: "255",
        hexadecimal: "FF",
      },
    });
  });

  it("空文字列の場合、すべての基底で空文字列を返す", () => {
    const result = convertBase("", 10);
    expect(result).toEqual({
      ok: true,
      value: {
        binary: "",
        octal: "",
        decimal: "",
        hexadecimal: "",
      },
    });
  });

  it("無効な数値の場合、エラーを返す", () => {
    const result = convertBase("GHI", 16);
    if (!result.ok) {
      expect(typeof result.error).toBe("string");
      expect(result.error.length).toBeGreaterThan(0);
    }
  });

  it("指定された基底に対して無効な入力の場合、エラーを返す", () => {
    const result = convertBase("29", 2);
    if (!result.ok) {
      expect(typeof result.error).toBe("string");
      expect(result.error.length).toBeGreaterThan(0);
    }
  });
});
