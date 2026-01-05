import type { RGB, HSL } from "../types";

export type HexValidateResult =
  | { ok: true; value: string } // 正規化済み (#rrggbb)
  | { ok: false; error: string };

// HEXカラーコードのバリデーション関数
export const validateHex = (input: string): HexValidateResult => {
  const hex = input.trim().replace(/^#/, "");

  // 3桁 or 6桁のみ許可
  if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(hex)) {
    return { ok: false, error: "HEXカラー形式が不正です" };
  }

  // 3桁 → 6桁へ正規化
  const normalized =
    hex.length === 3
      ? hex
          .split("")
          .map((c) => c + c)
          .join("")
      : hex;

  return {
    ok: true,
    value: `#${normalized.toLowerCase()}`,
  };
};


export type RgbValidateResult =
  | { ok: true; value: RGB }
  | { ok: false; error: string };

// RGBカラーコードのバリデーション関数 
export const validateRgb = (input: string): RgbValidateResult => {
  const text = input.trim();

  const match = text.match(
    /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$|^(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})$/
  );

  if (!match) {
    return { ok: false, error: "RGB形式が不正です" };
  }

  const nums = match.slice(1).filter(Boolean).map(Number);
  const [r, g, b] = nums;

  if ([r, g, b].some((v) => v < 0 || v > 255)) {
    return { ok: false, error: "RGBは0〜255の範囲で指定してください" };
  }

  return { ok: true, value: { r, g, b } };
};


export type HslValidateResult =
  | { ok: true; value: HSL }
  | { ok: false; error: string };

// HSLカラーコードのバリデーション関数
export const validateHsl = (input: string): HslValidateResult => {
  const text = input.trim();

  const match = text.match(
    /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$|^(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%$/
  );

  if (!match) {
    return { ok: false, error: "HSL形式が不正です" };
  }

  const nums = match.slice(1).filter(Boolean).map(Number);
  const [h, s, l] = nums;

  if (h < 0 || h > 360) {
    return { ok: false, error: "色相(H)は0〜360で指定してください" };
  }
  if (s < 0 || s > 100 || l < 0 || l > 100) {
    return { ok: false, error: "彩度・明度は0〜100%で指定してください" };
  }

  return { ok: true, value: { h, s, l } };
};

