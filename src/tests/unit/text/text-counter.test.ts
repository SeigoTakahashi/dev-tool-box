import {
  charCounter,
  charCounterNoSpace,
  charCounterWithoutNewlines,
  lineCounter,
  utf8ByteCounter,
  utf16ByteCounter,
} from "../../../features/text/utils/text-counter";
import { describe, it, expect } from "vitest";

// 文字数カウントユーティリティのテスト
describe("charCounter", () => {
  it("空文字は0", () => {
    expect(charCounter("")).toBe(0);
  });

  it("日本語を正しくカウントする", () => {
    expect(charCounter("あいう")).toBe(3);
  });

  it("改行も1文字として数える", () => {
    expect(charCounter("a\nb")).toBe(3);
  });

  it("絵文字は2文字としてカウントされる（仕様）", () => {
    expect(charCounter("😀")).toBe(2);
  });
});

// 改行除く文字数カウントユーティリティのテスト
describe("charCounterWithoutNewlines", () => {
  it("改行を除外する", () => {
    expect(charCounterWithoutNewlines("a\nb")).toBe(2);
  });

  it("CRLFにも対応する", () => {
    expect(charCounterWithoutNewlines("a\r\nb")).toBe(2);
  });
});

// 改行・空白除く文字数カウントユーティリティのテスト
describe("charCounterNoSpace", () => {
  it("空白・改行を除外する", () => {
    expect(charCounterNoSpace(" a \n b ")).toBe(2);
  });

  it("タブ・全角空白も除外する", () => {
    expect(charCounterNoSpace("a\tb　c")).toBe(3);
  });
});

// 行数カウントユーティリティのテスト
describe("lineCounter", () => {
  it("空文字は0行", () => {
    expect(lineCounter("")).toBe(0);
  });

  it("1行のみ", () => {
    expect(lineCounter("abc")).toBe(1);
  });

  it("改行区切りで行数を数える", () => {
    expect(lineCounter("a\nb\nc")).toBe(3);
  });

  it("末尾改行も1行として数える（仕様）", () => {
    expect(lineCounter("a\n")).toBe(2);
  });
});

// UTF-8バイト数カウントユーティリティのテスト
describe("utf8ByteCounter", () => {
  it("ASCIIは1バイト", () => {
    expect(utf8ByteCounter("a")).toBe(1);
  });

  it("日本語は3バイト", () => {
    expect(utf8ByteCounter("あ")).toBe(3);
  });

  it("絵文字は4バイト", () => {
    expect(utf8ByteCounter("😀")).toBe(4);
  });
});

// UTF-16バイト数カウントユーティリティのテスト
describe("utf16ByteCounter", () => {
  it("ASCIIは2バイト", () => {
    expect(utf16ByteCounter("a")).toBe(2);
  });

  it("日本語は2バイト", () => {
    expect(utf16ByteCounter("あ")).toBe(2);
  });

  it("絵文字は4バイト（サロゲートペア）", () => {
    expect(utf16ByteCounter("😀")).toBe(4);
  });
});
