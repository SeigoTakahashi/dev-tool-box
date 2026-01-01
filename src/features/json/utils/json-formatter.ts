export type FormatJsonResult =
  | { ok: true; value: string }
  | { ok: false; error: string };

// JSON文字列を整形するユーティリティ関数
export const formatJsonSafe = (
  input: string,
  space = 2
): FormatJsonResult => {
  try {
    const parsed = JSON.parse(input);
    const formatted = JSON.stringify(parsed, null, space);
    return { ok: true, value: formatted };
  } catch (e) {
    console.error(e);
    return {
      ok: false,
      error: "無効なJSON形式です。",
    };
  }
};
