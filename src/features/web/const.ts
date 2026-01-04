export const FLAG_DESCRIPTIONS = {
  g: "グローバル：すべてのマッチを探す（デフォルトは最初のマッチのみ）",
  i: "大文字小文字区別しない：Aとaなどのマッチを区別しない",
  s: "ドット全文字：.が改行文字を含むすべての文字にマッチ",
  m: "複数行：^と$が各行の開始と終了にマッチ",
};

export const REGEX_PATTERNS = [
  { pattern: ".", description: "任意の1文字（改行を除く）" },
  { pattern: "\\d", description: "数字[0-9]" },
  { pattern: "\\D", description: "数字以外[^0-9]" },
  { pattern: "\\w", description: "単語文字[a-zA-Z0-9_]" },
  { pattern: "\\W", description: "単語文字以外[^a-zA-Z0-9_]" },
  { pattern: "\\s", description: "空白文字（スペース、タブ、改行など）" },
  { pattern: "\\S", description: "空白文字以外" },
  { pattern: "^", description: "行の開始" },
  { pattern: "$", description: "行の終了" },
  { pattern: "*", description: "0回以上の繰り返し" },
  { pattern: "+", description: "1回以上の繰り返し" },
  { pattern: "?", description: "0回または1回" },
  { pattern: "{n}", description: "正確にn回" },
  { pattern: "{n,m}", description: "n回以上m回以下" },
  { pattern: "[abc]", description: "a、b、cのいずれか" },
  { pattern: "[^abc]", description: "a、b、c以外" },
  { pattern: "[a-z]", description: "a～zの範囲" },
  { pattern: "(abc)", description: "グループ化" },
  { pattern: "a|b", description: "aまたはb" },
];

export const DAY_LABELS = {
  monday: "月",
  tuesday: "火",
  wednesday: "水",
  thursday: "木",
  friday: "金",
  saturday: "土",
  sunday: "日",
};

export const DAY_TO_CRON: Record<string, number> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};
