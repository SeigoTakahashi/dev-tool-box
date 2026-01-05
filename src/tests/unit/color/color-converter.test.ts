import { describe, it, expect } from "vitest";
import {
  hexToRgb,
  hexToHsl,
  rgbToHex,
  rgbToHsl,
  hslToHex,
  hslToRgb,
} from "../../../features/color/utils/color-converter";

// HEX、RGB、HSL間の変換関数のユニットテスト
describe("Color Converter", () => {
  it("HEXからRGBへ変換できる", () => {
    const result = hexToRgb("#1a2b3c");

    if (result.ok) {
      expect(result.value).toEqual({ r: 26, g: 43, b: 60 });
    }
  });

  it("HEXからHSLへ変換できる", () => {
    const result = hexToHsl("#1a2b3c");

    if (result.ok) {
      expect(result.value).toEqual({ h: 210, s: 40, l: 17 });
    }
  });

  it("RGBからHEXへ変換できる", () => {
    const result = rgbToHex({ r: 34, g: 67, b: 200 });

    if (result.ok) {
      expect(result.value).toBe("#2243c8");
    }
  });

  it("RGBからHSLへ変換できる", () => {
    const result = rgbToHsl({ r: 34, g: 67, b: 200 });

    if (result.ok) {
      expect(result.value).toEqual({ h: 228, s: 71, l: 46 });
    }
  });

  it("HSLからHEXへ変換できる", () => {
    const result = hslToHex({ h: 120, s: 50, l: 40 });

    if (result.ok) {
      expect(result.value).toBe("#339933");
    }
  });

  it("HSLからRGBへ変換できる", () => {
    const result = hslToRgb({ h: 120, s: 50, l: 40 });

    if (result.ok) {
      expect(result.value).toEqual({ r: 51, g: 153, b: 51 });
    }
  });
});
