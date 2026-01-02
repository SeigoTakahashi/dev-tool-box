import { encodeUrl } from "../../../features/web/utils/url-encoder";
import { describe, it, expect } from "vitest";

// URLエンコード関数のユニットテスト
describe("encodeUrl", () => {
  it("英数字をエンコードしない", () => {
    const input = "HelloWorld123";
    const result = encodeUrl(input);
    expect(result).toBe("HelloWorld123");
  });

  it("日本語を正しくエンコードする", () => {
    const input = "こんにちは";
    const result = encodeUrl(input);
    expect(result).toBe("%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF");
  });

  it("スペースを%20にエンコードする", () => {
    const input = "Hello World";
    const result = encodeUrl(input);
    expect(result).toBe("Hello%20World");
  });

  it("URLクエリ文字をエンコードできる", () => {
    const input = "a=1&b=2";
    const result = encodeUrl(input);
    expect(result).toBe("a%3D1%26b%3D2");
  });

  it("既にエンコードされた文字は二重エンコードされる", () => {
    const input = "%20";
    const result = encodeUrl(input);
    expect(result).toBe("%2520");
  });

  it("空文字は空文字のまま", () => {
    const input = "";
    const result = encodeUrl(input);
    expect(result).toBe("");
  });
});
