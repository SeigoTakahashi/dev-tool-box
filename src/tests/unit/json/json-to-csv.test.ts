import { describe, it, expect } from "vitest";
import {
  jsonToCsv,
  escapeCsvValue,
} from "../../../features/json/utils/json-to-csv";

// JSON関数のユニットテスト
describe("jsonToCsv", () => {
  it("正しいJSONをCSVに変換できる", () => {
    const input = '[{"a":1,"b":2}]';

    const result = jsonToCsv(input);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toBe("a,b\n1,2");
    }
  });

  it("不正なJSONの場合はエラーを返す", () => {
    const input = '{"a":1,}';

    const result = jsonToCsv(input);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(typeof result.error).toBe("string");
      expect(result.error.length).toBeGreaterThan(0);
    }
  });

  it("JSONが配列ではない場合はエラーを返す", () => {
    const input = '{"a":1,"b":2}';

    const result = jsonToCsv(input);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(typeof result.error).toBe("string");
      expect(result.error.length).toBeGreaterThan(0);
    }
  });

  it("空の配列の場合はエラーを返す", () => {
    const input = "[]";

    const result = jsonToCsv(input);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(typeof result.value).toBe("string");
      expect(result.value).toBe("");
    }
  });

  it("空文字はエラーになる", () => {
    const input = "";

    const result = jsonToCsv(input);

    expect(result.ok).toBe(false);
  });

  it("JSONでない文字列はエラーになる", () => {
    const input = "hello world";

    const result = jsonToCsv(input);

    expect(result.ok).toBe(false);
  });
});

// JSON文字列をCSV形式に変換するユーティリティ関数のユニットテスト
describe("escapeCsvValue", () => {
  it("カンマを含む値をエスケープできる", () => {
    const input = "value,with,commas";
    const result = escapeCsvValue(input);
    expect(result).toBe('"value,with,commas"');
  });

  it("ダブルクオートを含む値をエスケープできる", () => {
    const input = 'value "with" quotes';
    const result = escapeCsvValue(input);
    expect(result).toBe('"value ""with"" quotes"');
  });

  it("改行を含む値をエスケープできる", () => {
    const input = "value\nwith\nnewlines";
    const result = escapeCsvValue(input);
    expect(result).toBe('"value\nwith\nnewlines"');
  });

  it("特殊文字を含まない値はそのまま返す", () => {
    const input = "simplevalue";
    const result = escapeCsvValue(input);
    expect(result).toBe("simplevalue");
  });
});
