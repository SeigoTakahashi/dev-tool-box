import type { HashAlgorithm } from "../types";
export type HashResult =
  | { ok: true; value: string }
  | { ok: false; error: string };

export const generateHash = async (
  input: string,
  algorithm: HashAlgorithm
): Promise<HashResult> => {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    const hashBuffer = await crypto.subtle.digest(algorithm, data);

    const hashHex = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return { ok: true, value: hashHex };
  } catch (e) {
    console.error(e);
    return {
      ok: false,
      error: "ハッシュ生成に失敗しました。",
    };
  }
};
