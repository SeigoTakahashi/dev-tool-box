import { validateCsv } from "./csv-validator";

export type CsvToJsonResult =
  | { ok: true; value: string }
  | { ok: false; error: string };

// CSV文字列をJSON文字列に変換するユーティリティ関数
export const csvToJson = (input: string): CsvToJsonResult => {
  try {
    const validation = validateCsv(input);
    if (!validation.ok) {
      return validation;
    }

    const { lines, headers } = validation;

    const rows = lines.slice(1).map((line) => {
      const values = line.split(",");
      const record: Record<string, string> = {};
      headers.forEach((header, i) => {
        record[header] = values[i].trim();
      });
      return record;
    });

    return {
      ok: true,
      value: JSON.stringify(rows, null, 2),
    };
  } catch (e) {
    console.error(e);
    return {
      ok: false,
      error: "CSVの解析に失敗しました。",
    };
  }
};
