import { validateJson } from "./json-validator";

export type JsonToCsvResult =
  | { ok: true; value: string }
  | { ok: false; error: string };

// JSON文字列をCSV形式に変換するユーティリティ関数
export const escapeCsvValue = (value: string): string => {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
};

// JSON文字列をCSV形式に変換する関数
export const jsonToCsv = (input: string): JsonToCsvResult => {
  try {
    // JSON バリデーション
    const validation = validateJson(input);
    if (!validation.ok) {
      return validation;
    }

    const data = JSON.parse(input);

    if (!Array.isArray(data)) {
      return { ok: false, error: "JSONは配列である必要があります。" };
    }

    if (data.length === 0) {
      return { ok: true, value: "" };
    }

    const headers = Array.from(
      new Set(data.flatMap(obj => Object.keys(obj)))
    );

    const rows = data.map(row =>
      headers
        .map(key =>
          escapeCsvValue(
            row[key] === undefined
              ? ""
              : typeof row[key] === "object"
              ? JSON.stringify(row[key])
              : String(row[key])
          )
        )
        .join(",")
    );

    return {
      ok: true,
      value: [headers.join(","), ...rows].join("\n"),
    };
  } catch (e) {
    console.error(e);
    return {
      ok: false,
      error: "CSVへの変換に失敗しました。",
    };
  }
};
