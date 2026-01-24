export type ConvertBaseResult =
  | {
      ok: true;
      value: {
        binary: string;
        octal: string;
        decimal: string;
        hexadecimal: string;
      };
    }
  | { ok: false; error: string };

export const convertBase = (
  value: string,
  fromBase: number,
): ConvertBaseResult => {
  try {
    // 空文字列の場合はすべての基底で空文字列を返す
    if (!value.trim()) {
      return {
        ok: true,
        value: { binary: "", octal: "", decimal: "", hexadecimal: "" },
      };
    }

    // 指定された基底から10進数に変換
    const decimalValue = parseInt(value, fromBase);

    // 数値が無効な場合のエラーハンドリング
    if (isNaN(decimalValue)) {
      return { ok: false, error: "無効な数値です。" };
    }

    // 基底に対して有効な入力かどうかをチェック
    if (!checkValidInput(value, fromBase)) {
      return { ok: false, error: `入力値が${fromBase}進数として無効です。` };
    }

    return {
      ok: true,
      value: {
        binary: decimalValue.toString(2),
        octal: decimalValue.toString(8),
        decimal: decimalValue.toString(10),
        hexadecimal: decimalValue.toString(16).toUpperCase(),
      },
    };
  } catch (e) {
    console.error(e);
    return { ok: false, error: "基底変換に失敗しました。" };
  }
};

// 入力値が指定された基底に対して有効かどうかをチェックする関数
export const checkValidInput = (
  value: string,
  base: number,
): boolean => {
  const regexMap: Record<number, RegExp> = {
    2: /^[0-1]+$/,
    8: /^[0-7]+$/,
    10: /^[0-9]+$/,
    16: /^[0-9a-fA-F]+$/,
  };

  const regex = regexMap[base];
  if (!regex) {
    throw new Error("Unsupported base");
  }

  return regex.test(value);
};
