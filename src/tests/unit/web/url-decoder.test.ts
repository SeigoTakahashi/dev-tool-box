import { describe, it, expect } from "vitest";
import { decodeUrl } from "../../../features/web/utils/url-decoder";

// URLデコード関数のユニットテスト
describe("decodeUrl", () => {
  it("英数字をデコードしない", () => {
    const input = "HelloWorld123";
    const result = decodeUrl(input);
    expect(result).toBe("HelloWorld123");
  });

  it("日本語を正しくデコードする", () => {
    const input = "%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF";
    const result = decodeUrl(input);
    expect(result).toBe("こんにちは");
  });

  it("スペースを%20にデコードする", () => {
    const input = "Hello%20World";
    const result = decodeUrl(input);
    expect(result).toBe("Hello World");
  });

  it("URLクエリ文字をデコードできる", () => {
    const input = "a%3D1%26b%3D2";
    const result = decodeUrl(input);
    expect(result).toBe("a=1&b=2");
  });

  it("空文字は空文字のまま", () => {
    const input = "";
    const result = decodeUrl(input);
    expect(result).toBe("");
  });
});