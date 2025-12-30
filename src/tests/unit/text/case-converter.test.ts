import {
  tokenize,
  toCamelCase,
  toPascalCase,
  toSnakeCase,
  toKebabCase,
  toConstantCase,
  toDotCase,
  toPathCase,
} from "../../../features/text/utils/case-converter";
import { describe, it, expect } from "vitest";

// トークン化ユーティリティのテスト
describe("tokenize", () => {
  it("空文字は空配列", () => {
    expect(tokenize("")).toEqual([]);
  });

  it("スネークケースを分解する", () => {
    expect(tokenize("user_name")).toEqual(["user", "name"]);
  });

  it("ケバブケースを分解する", () => {
    expect(tokenize("user-name")).toEqual(["user", "name"]);
  });

  it("ドット区切りを分解する", () => {
    expect(tokenize("user.profile.name")).toEqual(["user", "profile", "name"]);
  });

  it("camelCaseを分解する", () => {
    expect(tokenize("userName")).toEqual(["user", "name"]);
  });

  it("PascalCaseを分解する", () => {
    expect(tokenize("UserName")).toEqual(["user", "name"]);
  });

  it("略語を含むPascalCaseを分解する", () => {
    expect(tokenize("APIResponse")).toEqual(["api", "response"]);
  });

  it("数字を含む名前を分解する", () => {
    expect(tokenize("user2FA")).toEqual(["user2", "fa"]);
  });

  it("混在ケースを正しく分解する", () => {
    expect(tokenize("user-API_Response.v2")).toEqual([
      "user",
      "api",
      "response",
      "v2",
    ]);
  });
});

// キャメルケース変換ユーティリティのテスト
describe("toCamelCase", () => {
  it("snake_case → camelCase", () => {
    expect(toCamelCase("user_name")).toBe("userName");
  });

  it("PascalCase → camelCase", () => {
    expect(toCamelCase("UserName")).toBe("userName");
  });

  it("略語を含む入力", () => {
    expect(toCamelCase("APIResponse")).toBe("apiResponse");
  });

  it("空文字は空文字", () => {
    expect(toCamelCase("")).toBe("");
  });
});

// パスカルケース変換ユーティリティのテスト
describe("toPascalCase", () => {
  it("camelCase → PascalCase", () => {
    expect(toPascalCase("userName")).toBe("UserName");
  });

  it("snake_case → PascalCase", () => {
    expect(toPascalCase("user_name")).toBe("UserName");
  });

  it("略語を含む入力", () => {
    expect(toPascalCase("APIResponse")).toBe("ApiResponse");
  });
});

// その他のケース変換ユーティリティのテスト
describe("other case converters", () => {
  it("snake_case", () => {
    expect(toSnakeCase("userName")).toBe("user_name");
  });

  it("kebab-case", () => {
    expect(toKebabCase("userName")).toBe("user-name");
  });

  it("CONSTANT_CASE", () => {
    expect(toConstantCase("userName")).toBe("USER_NAME");
  });

  it("dot.case", () => {
    expect(toDotCase("userName")).toBe("user.name");
  });

  it("path/case", () => {
    expect(toPathCase("userName")).toBe("user/name");
  });
});
