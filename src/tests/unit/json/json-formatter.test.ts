import { describe, it, expect } from "vitest";
import { formatJsonSafe } from "../../../features/json/utils/json-formatter";

// JSONフォーマット関数のユニットテスト
describe("formatJsonSafe", () => {
  it("正しいJSONを整形できる", () => {
    const input = '{"a":1,"b":2}';

    const result = formatJsonSafe(input);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toBe(
        `{
  "a": 1,
  "b": 2
}`
      );
    }
  });

  it("インデント幅を指定できる", () => {
    const input = '{"a":1}';

    const result = formatJsonSafe(input, 4);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toContain('    "a": 1');
    }
  });

  it("不正なJSONの場合はエラーを返す", () => {
    const input = '{"a":1,}';

    const result = formatJsonSafe(input);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(typeof result.error).toBe("string");
      expect(result.error.length).toBeGreaterThan(0);
    }
  });

  it("空文字はエラーになる", () => {
    const input = "";

    const result = formatJsonSafe(input);

    expect(result.ok).toBe(false);
  });

  it("JSONでない文字列はエラーになる", () => {
    const input = "hello world";

    const result = formatJsonSafe(input);

    expect(result.ok).toBe(false);
  });
});
