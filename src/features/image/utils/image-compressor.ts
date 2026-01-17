import imageCompression from 'browser-image-compression';

export type CompressorImageResult = 
  | { ok: true; value: File }
  | { ok: false; error: string };


// 画像圧縮ユーティリティ関数
export const compressorImage = async (file: File): Promise<CompressorImageResult> => {
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920
    }

    try {
        const compressedFile = await imageCompression(file, options);
        return { ok: true, value: compressedFile };
    } catch (error) {
        console.error("画像の圧縮に失敗しました:", error);
        return { ok: false, error: "画像の圧縮に失敗しました。" };
    }
}