// 入力文字列を単語配列に分解する
export const tokenize = (input: string): string[] => {
  if (!input) return [];

  return input
    // 区切り文字を空白に統一
    .replace(/[-_.\s/]+/g, " ")
    // camelCase: fooBar -> foo Bar
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    // Pascal + 略語: APIResponse -> API Response
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .trim()
    .split(/\s+/)
    .map(word => word.toLowerCase());
};

// キャメルケース変換ユーティリティ（例：fooBar）
export const toCamelCase = (input: string): string => {
  const tokens = tokenize(input);
  if (tokens.length === 0) return "";

  return tokens
    .map((token, index) =>
      index === 0
        ? token
        : token.charAt(0).toUpperCase() + token.slice(1)
    )
    .join("");
};

// パスカルケース変換ユーティリティ（例：FooBar）
export const toPascalCase = (input: string): string => {
  const tokens = tokenize(input);

  return tokens
    .map(token => token.charAt(0).toUpperCase() + token.slice(1))
    .join("");
};

// スネークケース変換ユーティリティ（例：foo_bar）
export const toSnakeCase = (input: string): string => {
  const tokens = tokenize(input);
  return tokens.join("_");
};

// ケバブケース変換ユーティリティ（例：foo-bar）
export const toKebabCase = (input: string): string => {
  const tokens = tokenize(input);
  return tokens.join("-");
};

// コンスタントケース変換ユーティリティ（例：FOO_BAR）
export const toConstantCase = (input: string): string => {
  const tokens = tokenize(input);
  return tokens.join("_").toUpperCase();
};

// ドットケース変換ユーティリティ（例：foo.bar）
export const toDotCase = (input: string): string => {
  const tokens = tokenize(input);
  return tokens.join(".");
};

// パスケース変換ユーティリティ（例：foo/bar）
export const toPathCase = (input: string): string => {
  const tokens = tokenize(input);
  return tokens.join("/");
};

