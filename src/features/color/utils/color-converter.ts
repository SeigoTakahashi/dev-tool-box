import type { RGB, HSL } from "../types";
import { validateHex, validateRgb, validateHsl } from "./color-validator";

// 10進数を2桁の16進数文字列に変換するヘルパー関数
export const decimalToHex = (n: number) => {
  const hex = n.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
};

// HSLからRGBへの変換補助関数
export const hueToRgb = (p: number, q: number, t: number) => {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
};

// HEXカラーコードをRGBに変換する関数
export type HexToRgbResult =
  | {
      ok: true;
      value: RGB;
    }
  | {
      ok: false;
      error: string;
    };
export const hexToRgb = (hex: string): HexToRgbResult => {
  const validation = validateHex(hex);
  if (!validation.ok) {
    return { ok: false, error: validation.error };
  }
  const sanitizedHex = hex.replace("#", "");
  const bigint = parseInt(sanitizedHex, 16);
  return {
    ok: true,
    value: {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    },
  };
};

// RGBをHSLに変換する関数
export type RgbToHslResult =
  | {
      ok: true;
      value: HSL;
    }
  | {
      ok: false;
      error: string;
    };
// RGBをHSLに変換する関数
export const rgbToHsl = (rgb: RGB): RgbToHslResult => {
  const validation = validateRgb(`${rgb.r},${rgb.g},${rgb.b}`);
  if (!validation.ok) {
    return { ok: false, error: validation.error };
  }

  let { r, g, b } = validation.value;
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    // 彩度の計算式を修正
    s = l > 0.5 ? d / (2 - (max + min)) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    ok: true,
    value: {
      // Math.round を追加して整数値に丸める
      h: Math.round(((h * 360) % 360 + 360) % 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    },
  };
};

// HSLをRGBに変換する関数
export type HslToRgbResult =
  | {
      ok: true;
      value: RGB;
    }
  | {
      ok: false;
      error: string;
    };

export const hslToRgb = (hsl: HSL): HslToRgbResult => {
  const validation = validateHsl(`${hsl.h},${hsl.s}%,${hsl.l}%`);
  if (!validation.ok) {
    return { ok: false, error: validation.error };
  }

  let { h, s, l } = validation.value;
  h /= 360;
  s /= 100;
  l /= 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // 彩度ゼロの場合はグレースケール
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }

  return {
    ok: true,
    value: {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    },
  };
};

// RGBをHEXカラーコードに変換する関数
export type RgbToHexResult =
  | {
      ok: true;
      value: string;
    }
  | {
      ok: false;
      error: string;
    };

export const rgbToHex = (rgb: RGB): RgbToHexResult => {
  const validation = validateRgb(`${rgb.r},${rgb.g},${rgb.b}`);
  if (!validation.ok) {
    return { ok: false, error: validation.error };
  }

  const rHex = decimalToHex(validation.value.r);
  const gHex = decimalToHex(validation.value.g);
  const bHex = decimalToHex(validation.value.b);

  return {
    ok: true,
    value: `#${rHex}${gHex}${bHex}`,
  };
};

// HSLをHEXカラーコードに変換する関数
export type HslToHexResult =
  | {
      ok: true;
      value: string;
    }
  | {
      ok: false;
      error: string;
    };

export const hslToHex = (hsl: HSL): HslToHexResult => {
  const rgbResult = hslToRgb(hsl);
  if (!rgbResult.ok) {
    return { ok: false, error: rgbResult.error };
  }

  const hslResult = rgbToHex(rgbResult.value);
  if (!hslResult.ok) {
    return { ok: false, error: hslResult.error };
  }

  return {
    ok: true,
    value: hslResult.value,
  };
};

// HEXカラーコードをHSLに変換する関数
export type HexToHslResult =
  | {
      ok: true;
      value: HSL;
    }
  | {
      ok: false;
      error: string;
    };

export const hexToHsl = (hex: string): HexToHslResult => {
  const rgbResult = hexToRgb(hex);
  if (!rgbResult.ok) {
    return { ok: false, error: rgbResult.error };
  }

  const hslResult = rgbToHsl(rgbResult.value);
  if (!hslResult.ok) {
    return { ok: false, error: hslResult.error };
  }

  return {
    ok: true,
    value: hslResult.value,
  };
};