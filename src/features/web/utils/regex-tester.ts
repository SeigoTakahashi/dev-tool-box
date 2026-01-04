export type RegexTestResult =
  | { ok: true; matches: Array<{ match: string; index: number }> }
  | { ok: false; error: string };

// 正規表現テスト用ユーティリティ関数
export const testRegex = (
  pattern: string,
  targetText: string,
  flags: { [key: string]: boolean }
): RegexTestResult => {
  try {
    if (!pattern || !targetText) {
      return {
        ok: true,
        matches: [],
      };
    }
    const flagString = Object.entries(flags)
      .filter(([, checked]) => checked)
      .map(([flag]) => flag)
      .join("");

    const regex = new RegExp(pattern, flagString);
    const matches: Array<{ match: string; index: number }> = [];
    let match: RegExpExecArray | null;

    // グローバルフラグがある場合はすべてのマッチを取得
    if (flags.g) {
      while ((match = regex.exec(targetText)) !== null) {
        matches.push({ match: match[0], index: match.index });

        // ゼロ幅マッチ対策
        if (match[0] === "") {
          regex.lastIndex++;
        }
      }
    } else {
      match = regex.exec(targetText);
      if (match) {
        matches.push({ match: match[0], index: match.index });
      }
    }

    return { ok: true, matches };
  } catch (e) {
    console.error(e);
    return {
      ok: false,
      error: "無効な正規表現です",
    };
  }
};
