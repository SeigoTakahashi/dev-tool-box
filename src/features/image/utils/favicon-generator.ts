export type GeneratorFaviconResult =
  | { ok: true; value: File }
  | { ok: false; error: string };

// Favicon生成ユーティリティ関数
export const generateFavicon = async (
  imageData: ArrayBuffer,
  originalFileName: string,
  size: number = 256
): Promise<GeneratorFaviconResult> => {
  let imageUrl: string | null = null;

  try {
    // ArrayBufferからBlobを作成
    const blob = new Blob([imageData]);
    imageUrl = URL.createObjectURL(blob);

    // 画像を読み込む
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error("画像の読み込みがタイムアウトしました"));
      }, 5000);

      img.onload = () => {
        clearTimeout(timer);
        resolve();
      };
      img.onerror = () => {
        clearTimeout(timer);
        reject(new Error("画像の読み込みに失敗しました"));
      };
      img.src = imageUrl!;
    });

    // Canvasを作成してリサイズ
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return { ok: false, error: "Canvas context の取得に失敗しました" };
    }

    // 背景を白で塗りつぶし
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, size, size);

    // 画像をCanvasに描画(アスペクト比を保持してセンタリング)
    const scale = Math.min(size / img.width, size / img.height);
    const x = (size - img.width * scale) / 2;
    const y = (size - img.height * scale) / 2;
    
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

    // Canvasから直接Blobを生成（ico形式として出力）
    const icoBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("ICOの生成に失敗しました"));
          }
        },
        "image/x-icon"
      );
    });

    // BlobからFileを作成
    const fileName = originalFileName.replace(/\.[^/.]+$/, "") + "_favicon.ico";
    const faviconFile = new File([icoBlob], fileName, {
      type: "image/x-icon",
    });

    return { ok: true, value: faviconFile };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "不明なエラーが発生しました",
    };
  } finally {
    // メモリ解放
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }
  }
};