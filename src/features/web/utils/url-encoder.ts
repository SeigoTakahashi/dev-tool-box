// パーセントエンコーディングされたURLを生成するユーティリティ関数
export const encodeUrl = (input: string): string => {
  return encodeURIComponent(input);
};
