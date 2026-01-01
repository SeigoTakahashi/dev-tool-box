export type ValidateJsonResult =
  | { ok: true }
  | { ok: false; error: string };

// JSON文字列を検証するユーティリティ関数
export const validateJson = (input: string): ValidateJsonResult => {
  try {
    JSON.parse(input);
    return { ok: true };
  } catch (e) {
    console.error(e);
    return {
      ok: false,
      error: "無効なJSON形式です。",
    };
  }
};
