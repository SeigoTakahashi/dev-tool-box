// ファイルをテキストとして読み込むユーティリティ関数
export const readFileFromInput = (
  event: React.ChangeEvent<HTMLInputElement>
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const file = event.target.files?.[0];

    if (!file) {
      reject(new Error("ファイルが選択されていません"));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      resolve(content);
    };
    reader.onerror = () => {
      reject(new Error("ファイルの読み込みに失敗しました"));
    };
    reader.readAsText(file);
  });
};
