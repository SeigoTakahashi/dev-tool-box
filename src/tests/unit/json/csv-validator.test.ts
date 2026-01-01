import { describe, it, expect } from "vitest";
import { validateCsv } from "../../../features/json/utils/csv-validator";

// CSVバリデータ関数のユニットテスト
describe("validateCsv", () => {
  it("正しいCSVを検証できる", () => {
    const input = 'name,age\nAlice,30\nBob,25';

    const result = validateCsv(input);

    expect(result.ok).toBe(true);
  });

  it("不正なCSVの場合はエラーを返す", () => {
    const input = 'name,age\nAlice,30\nBob';

    const result = validateCsv(input);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(typeof result.error).toBe("string");
      expect(result.error.length).toBeGreaterThan(0);
    }
  });

  it("空文字はエラーになる", () => {
    const input = "";

    const result = validateCsv(input);

    expect(result.ok).toBe(false);
  });

  it("ヘッダー名が空の場合はエラーになる", () => {
    const input = 'name,,age\nAlice,30\nBob,25';

    const result = validateCsv(input);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(typeof result.error).toBe("string");
      expect(result.error.length).toBeGreaterThan(0);
    }
  });
});