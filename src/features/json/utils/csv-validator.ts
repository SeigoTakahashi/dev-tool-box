export type CsvValidationResult =
  | { ok: true; lines: string[]; headers: string[] }
  | { ok: false; error: string };

// CSV文字列を検証するユーティリティ関数
export const validateCsv = (input: string): CsvValidationResult => {
  const lines = input
    .trim()
    .split(/\r?\n/)
    .filter((line) => line.trim() !== "");

  if (lines.length < 2) {
    return {
      ok: false,
      error: "ヘッダーとデータ行を含むCSVを入力してください。",
    };
  }

  const headers = lines[0].split(",").map((h) => h.trim());

  if (headers.some((h) => h === "")) {
    return {
      ok: false,
      error: "ヘッダー名が空です。",
    };
  }

  // データ行の列数検証
  for (let rowIndex = 1; rowIndex < lines.length; rowIndex++) {
    const values = lines[rowIndex].split(",");
    if (values.length !== headers.length) {
      return {
        ok: false,
        error: `行 ${rowIndex + 1} の列数がヘッダーと一致しません。`,
      };
    }
  }

  return {
    ok: true,
    lines,
    headers,
  };
};
