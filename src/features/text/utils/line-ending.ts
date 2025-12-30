import type { LineEndingType } from "../../types";

// 改行コード正規化ユーティリティ
export const normalizeLineEnding = (text: string, to: LineEndingType): string => {
  // 一旦LFに統一
  const normalized = text.replace(/\r\n|\r|\n/g, "\n");

  switch (to) {
    // CRLFに変換
    case "crlf":
      return normalized.replace(/\n/g, "\r\n");
    // CRに変換
    case "cr":
      return normalized.replace(/\n/g, "\r");
    // LFのまま返す
    case "lf":
    default:
      return normalized;
  }
};
