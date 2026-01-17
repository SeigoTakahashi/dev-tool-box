import { describe, it, expect, vi } from 'vitest';
import { compressorImage } from '../../../features/image/utils/image-compressor';
import imageCompression from 'browser-image-compression';

// ライブラリをモック化する
vi.mock('browser-image-compression', () => ({
  default: vi.fn(),
}));

describe('compressorImage', () => {
  it('圧縮に成功したとき、ok: true と File を返すこと', async () => {
    // 擬似的なファイルを作成
    const mockFile = new File(['dummy content'], 'test.png', { type: 'image/png' });
    const mockCompressedBlob = new Blob(['compressed content'], { type: 'image/png' });

    // モックの戻り値を設定
    vi.mocked(imageCompression).mockResolvedValue(mockCompressedBlob as File);

    const result = await compressorImage(mockFile);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toBeInstanceOf(Blob); // もしくは File
    }
  });

  it('圧縮に失敗したとき、ok: false とエラーメッセージを返すこと', async () => {
    const mockFile = new File(['dummy'], 'test.png');

    // モックがエラーを投げるように設定
    vi.mocked(imageCompression).mockRejectedValue(new Error('Compression failed'));

    const result = await compressorImage(mockFile);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("画像の圧縮に失敗しました。");
    }
  });
});