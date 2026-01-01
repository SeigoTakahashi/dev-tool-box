import { describe, it, expect } from "vitest";
import { csvToJson } from "../../../features/json/utils/csv-to-json";

// CSVからJSONへの変換関数のユニットテスト
describe("csvToJson", () => {
  it("正しいCSVをJSONに変換できる", () => {
    const input = 'name,age\nAlice,30\nBob,25';

    const result = csvToJson(input);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toBe(
        `[
  {
    "name": "Alice",
    "age": "30"
  },
  {
    "name": "Bob",
    "age": "25"
  }
]`
      );
    }
  });

  it("空のCSVは空の配列を返す", () => {
    const input = '';

    const result = csvToJson(input);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(typeof result.error).toBe("string");
      expect(result.error.length).toBeGreaterThan(0);
    }
  });

  it("ヘッダーのみのCSVは空の配列を返す", () => {
    const input = 'name,age';

    const result = csvToJson(input);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(typeof result.error).toBe("string");
      expect(result.error.length).toBeGreaterThan(0);
    }
  });

  it("不正なCSVの場合はエラーを返す", () => {
    const input = 'name,age\nAlice,30\nBob';

    const result = csvToJson(input);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(typeof result.error).toBe("string");
      expect(result.error.length).toBeGreaterThan(0);
    }
  });
});