export type Base64Result =
  | { ok: true; value: string }
  | { ok: false; error: string };


// Base64デコードユーティリティ関数
export const decodeBase64 = (input: string): Base64Result => {
  try {
    // Base64 → UTF-8
    const binary = atob(input);

    const decoded = decodeURIComponent(
      binary
        .split("")
        .map(
          (char) =>
            "%" + char.charCodeAt(0).toString(16).padStart(2, "0")
        )
        .join("")
    );

    return { ok: true, value: decoded };
  } catch {
    return {
      ok: false,
      error: "不正なBase64文字列です。",
    };
  }
};
