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
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Invalid JSON",
    };
  }
};
