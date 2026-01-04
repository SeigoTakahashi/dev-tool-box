import { describe, it, expect } from "vitest";
import { testRegex } from "../../../features/web/utils/regex-tester";

// 正規表現テスター関数のユニットテスト
describe("testRegex", () => {
  it("マッチする場合はtrueを返す", () => {
    const pattern = "abc";
    const targetText = "abc abc";
    const flags = { g: true, i: false, s: false, m: false };

    const result = testRegex(pattern, targetText, { ...flags });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.matches).toEqual([
        { match: "abc", index: 0 },
        { match: "abc", index: 4 },
      ]);
    }
  });

  it("patternが空文字の場合は空のマッチを返す", () => {
    const pattern = "";
    const targetText = "abc";
    const flags = { g: true, i: false, s: false, m: false };

    const result = testRegex(pattern, targetText, { ...flags });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.matches).toEqual([]);
    }
  });

  it("targetTextが空文字の場合は空のマッチを返す", () => {
    const pattern = "abc";
    const targetText = "";
    const flags = { g: true, i: false, s: false, m: false };

    const result = testRegex(pattern, targetText, { ...flags });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.matches).toEqual([]);
    }
  });

  it("無効な正規表現の場合はエラーを返す", () => {
    const pattern = "[abc";
    const targetText = "abc";
    const flags = { g: true, i: false, s: false, m: false };

    const result = testRegex(pattern, targetText, { ...flags });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(typeof result.error).toBe("string");
      expect(result.error.length).toBeGreaterThan(0);
    }
  });

  it("g フラグがある場合は全件マッチする", () => {
    const result = testRegex("a", "aba", { g: true });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.matches.length).toBe(2);
    }
  });

  it("g フラグがない場合は最初の1件のみ", () => {
    const result = testRegex("a", "aba", { g: false });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.matches.length).toBe(1);
      expect(result.matches[0].index).toBe(0);
    }
  });

  it("i フラグで大文字小文字を無視する", () => {
    const result = testRegex("a", "A", { g: false, i: true });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.matches[0].match).toBe("A");
    }
  });

  it("s フラグでドットが改行にマッチする", () => {
    const result = testRegex(".", "\n", { g: false, s: true });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.matches[0].match).toBe("\n");
    }
  });

  it("m フラグで^と$が各行にマッチする", () => {
    const result = testRegex("^abc$", "xyz\nabc\ndef", { g: false, m: true });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.matches[0].match).toBe("abc");
      expect(result.matches[0].index).toBe(4);
    }
  });
});
