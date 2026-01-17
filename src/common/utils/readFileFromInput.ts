type ReadMode = "text" | "dataURL" | "arrayBuffer" | "file";

// ファイル入力からファイルを読み取るユーティリティ関数
export const readFileFromInput = <T extends string | ArrayBuffer | File>(
  event: React.ChangeEvent<HTMLInputElement>,
  mode: ReadMode = "text"
): Promise<T> => {
  return new Promise((resolve, reject) => {
    const file = event.target.files?.[0];

    if (!file) {
      reject(new Error("ファイルが選択されていません"));
      return;
    }

    // "file" モードの場合は、FileReaderを通さずそのまま返す
    if (mode === "file") {
      resolve(file as unknown as T);
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target?.result;
      if (content === null || content === undefined) {
        reject(new Error("ファイルの読み込み結果が空です"));
        return;
      }
      resolve(content as T);
    };

    reader.onerror = () => {
      reject(new Error("ファイルの読み込みに失敗しました"));
    };

    // 指定されたモードに応じて読み込み方法を切り替え
    switch (mode) {
      case "dataURL":
        reader.readAsDataURL(file);
        break;
      case "arrayBuffer":
        reader.readAsArrayBuffer(file);
        break;
      case "text":
      default:
        reader.readAsText(file);
        break;
    }
  });
};