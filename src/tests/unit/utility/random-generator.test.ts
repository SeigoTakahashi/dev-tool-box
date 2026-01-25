import { describe, it, expect } from "vitest";
import { generateUUID, generateSecurePassword } from "../../../features/utility/utils/random-generator";

// ランダム生成ユーティリティのテスト
describe("generateUUID", () => {
  it("正しい形式のUUIDを生成する", () => {
    const uuid = generateUUID();
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(uuidRegex.test(uuid)).toBe(true);
  });

  it("異なる呼び出しで異なるUUIDを生成する", () => {
    const uuid1 = generateUUID();
    const uuid2 = generateUUID();
    expect(uuid1).not.toBe(uuid2);
  });
});

describe("generateSecurePassword", () => {
  it("指定した長さのパスワードを生成する", () => {
    const length = 16;
    const password = generateSecurePassword(length);
    expect(password.length).toBe(length);
  });

  it("パスワードに各カテゴリの文字が含まれる", () => {
    const password = generateSecurePassword(12);
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*()_+]/.test(password);

    expect(hasLower).toBe(true);
    expect(hasUpper).toBe(true);
    expect(hasNumber).toBe(true);
    expect(hasSymbol).toBe(true);
  });

  it("異なる呼び出しで異なるパスワードを生成する", () => {
    const password1 = generateSecurePassword(12);
    const password2 = generateSecurePassword(12);
    expect(password1).not.toBe(password2);
  });
});