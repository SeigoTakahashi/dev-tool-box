export type ColorEditMode = "hex" | "rgb" | "hsl";

export type RGB = {
  r: number;
  g: number;
  b: number;
};

export type HSL = {
  h: number;
  s: number;
  l: number;
};

export type PalettesType = {
  monochromatic: string[];
  analogous: string[];
  complementary: string[];
  triadic: string[];
  tetradic: string[];
};