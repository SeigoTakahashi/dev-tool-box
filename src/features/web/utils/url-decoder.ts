// パーセントエンコーディングされたURLをデコードするユーティリティ関数
export const decodeUrl = (input: string): string => {
  return decodeURIComponent(input);
};
