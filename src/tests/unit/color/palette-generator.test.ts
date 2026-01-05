import { describe, it, expect } from "vitest";
import { generateMonochromatic, generateAnalogous, generateComplementary, generateTriadic, generateTetradic, generatePalette } from "../../../features/color/utils/palette-generator";

// パレット生成関数のユニットテスト
describe("Palette Generator", () => {
  const baseHsl = { h: 200, s: 50, l: 50 };

  it("単色パレットを生成できる", () => {
    const colors = generateMonochromatic(baseHsl, 5);
    expect(colors.length).toBe(5);
    colors.forEach(color => {
      expect(color).toMatch(/^#([0-9a-fA-F]{6})$/);
    });
  });

  it("類似色パレットを生成できる", () => {
    const colors = generateAnalogous(baseHsl, 5);
    expect(colors.length).toBe(5);
    colors.forEach(color => {
      expect(color).toMatch(/^#([0-9a-fA-F]{6})$/);
    });
  });

  it("補色パレットを生成できる", () => {
    const colors = generateComplementary(baseHsl);
    expect(colors.length).toBe(2);
    colors.forEach(color => {
      expect(color).toMatch(/^#([0-9a-fA-F]{6})$/);
    });
  });

  it("三色配色パレットを生成できる", () => {
    const colors = generateTriadic(baseHsl, 5);
    expect(colors.length).toBe(5);
    colors.forEach(color => {
      expect(color).toMatch(/^#([0-9a-fA-F]{6})$/);
    });
  });

  it("四色配色パレットを生成できる", () => {
    const colors = generateTetradic(baseHsl, 5);
    expect(colors.length).toBe(5);
    colors.forEach(color => {
      expect(color).toMatch(/^#([0-9a-fA-F]{6})$/);
    });
  });

  it("カラーパレットを生成できる", () => {
    const result = generatePalette("#3399ff", 5);
    expect(result.ok).toBe(true);
    if (result.ok) {
      const { palettes } = result;
      expect(palettes.monochromatic.length).toBe(5);
      expect(palettes.analogous.length).toBe(5);
      expect(palettes.complementary.length).toBe(2);
      expect(palettes.triadic.length).toBe(5);
      expect(palettes.tetradic.length).toBe(5);
    }
  });

  it("不正なカラーコードの場合はエラーを返す", () => {
    const result = generatePalette("invalid-color", 5);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(typeof result.error).toBe("string");
      expect(result.error.length).toBeGreaterThan(0);
    }
  });
});
