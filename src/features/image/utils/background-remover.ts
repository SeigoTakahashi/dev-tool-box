import { removeBackground as imglyRemoveBackground } from "@imgly/background-removal";

export type RemoveBackgroundResult =
  | { ok: true; value: string }
  | { ok: false; error: string };

// 画像の背景を除去するユーティリティ関数
export const removeBackground = async (
  image_src: ArrayBuffer,
  mimeType: string = "image/png"
): Promise<RemoveBackgroundResult> => {
  let imageUrl: string | null = null;

  try {
    // ArrayBufferをBlobに変換（MIMEタイプを指定）
    const inputBlob = new Blob([image_src], { type: mimeType });
    
    // BlobからObject URLを作成
    imageUrl = URL.createObjectURL(inputBlob);
    
    // imglyRemoveBackgroundに画像URLを渡す
    const resultBlob = await imglyRemoveBackground(imageUrl);
    
    // 結果のBlobからURLを作成
    const url = URL.createObjectURL(resultBlob);
    return { ok: true, value: url };
  } catch (error) {
    console.error("背景除去に失敗しました:", error);
    return { ok: false, error: "背景除去に失敗しました。" };
  } finally {
    // 入力用URLをメモリから削除
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }
  }
};