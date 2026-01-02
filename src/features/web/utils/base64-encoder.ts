export type Base64Result =
  | { ok: true; value: string }
  | { ok: false; error: string };

// Base64エンコードユーティリティ関数
export const encodeBase64 = (input: string): Base64Result => {
  try {
    // UTF-8 → Base64
    const utf8 = encodeURIComponent(input)
      .replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      );

    const encoded = btoa(utf8);
    return { ok: true, value: encoded };
  } catch {
    return {
      ok: false,
      error: "Base64エンコードに失敗しました。",
    };
  }
};
