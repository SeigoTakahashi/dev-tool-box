import { describe, it, expect } from "vitest";
import { validateJson } from "../../../features/json/utils/json-validator";

// JSON関数のユニットテスト
describe("validateJson", () => {
  it("正しいJSONを検証できる", () => {
    const input = '{"a":1,"b":2}';

    const result = validateJson(input);

    expect(result.ok).toBe(true);
  });

  it("不正なJSONの場合はエラーを返す", () => {
    const input = '{"a":1,}';

    const result = validateJson(input);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(typeof result.error).toBe("string");
      expect(result.error.length).toBeGreaterThan(0);
    }
  });

  it("空文字はエラーになる", () => {
    const input = "";

    const result = validateJson(input);

    expect(result.ok).toBe(false);
  });

  it("JSONでない文字列はエラーになる", () => {
    const input = "hello world";

    const result = validateJson(input);

    expect(result.ok).toBe(false);
  });
});
