import { hexToHsl, hslToHex } from "./color-converter";
import { validateHex } from "./color-validator";
import type { HSL, PalettesType } from "../types";

// 単色カラーパレットを生成する関数
export const generateMonochromatic = (
  hsl: HSL,
  numberOfColors: number = 5
): string[] => {
  const colors: string[] = [];
  for (let i = 0; i < numberOfColors; i++) {
    const lightness = 20 + i * 15;
    const result = hslToHex({ h: hsl.h, s: hsl.s, l: lightness });
    if (result.ok) colors.push(result.value);
  }
  return colors;
};

// 類似色パレットを生成する関数
export const generateAnalogous = (
  hsl: HSL,
  numberOfColors: number = 5
): string[] => {
  const colors: string[] = [];
  for (let i = 0; i < numberOfColors; i++) {
    const hue = (hsl.h + i * 30 + 360) % 360;
    const result = hslToHex({ h: hue, s: hsl.s, l: hsl.l });
    if (result.ok) colors.push(result.value);
  }
  return colors;
};

// 補色パレットを生成する関数
export const generateComplementary = (hsl: HSL): string[] => {
  const colors: string[] = [];
  // 元の色
  const result1 = hslToHex({ h: hsl.h, s: hsl.s, l: hsl.l });
  if (result1.ok) colors.push(result1.value);
  // 補色
  const result2 = hslToHex({
    h: (hsl.h + 180) % 360,
    s: hsl.s,
    l: hsl.l,
  });
  if (result2.ok) colors.push(result2.value);
  return colors;
};

// 三角配色パレットを生成する関数
export const generateTriadic = (
  hsl: HSL,
  numberOfColors: number = 5
): string[] => {
  const colors: string[] = [];
  for (let i = 0; i < numberOfColors; i++) {
    const hue = (hsl.h + i * 120) % 360;
    const result = hslToHex({ h: hue, s: hsl.s, l: hsl.l });
    if (result.ok) colors.push(result.value);
  }
  return colors;
};

// 四角配色パレットを生成する関数
export const generateTetradic = (hsl: HSL, numberOfColors: number = 5): string[] => {
  const colors: string[] = [];
  for (let i = 0; i < numberOfColors; i++) {
    const hue = (hsl.h + i * 90) % 360;
    const result = hslToHex({ h: hue, s: hsl.s, l: hsl.l });
    if (result.ok) colors.push(result.value);
  }
  return colors;
};

export type PaletteColorResult =
  | {
      ok: true;
      palettes: PalettesType;
    }
  | {
      ok: false;
      error: string;
    };

// カラーパレットを生成する関数
export const generatePalette = (
  baseColor: string,
  numberOfColors: number = 5
): PaletteColorResult => {
  const validation = validateHex(baseColor);
  if (!validation.ok) {
    return { ok: false, error: validation.error };
  }

  const hslResult = hexToHsl(baseColor);
  if (!hslResult.ok) {
    return { ok: false, error: hslResult.error };
  }

  const baseHsl = hslResult.value;

  return {
    ok: true,
    palettes: {
      monochromatic: generateMonochromatic(baseHsl, numberOfColors),
      analogous: generateAnalogous(baseHsl, numberOfColors),
      complementary: generateComplementary(baseHsl),
      triadic: generateTriadic(baseHsl, numberOfColors),
      tetradic: generateTetradic(baseHsl, numberOfColors),
    },
  };
};
