import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateFavicon } from '../../../features/image/utils/favicon-generator';

// Favicon生成関数のテスト
describe('generateFavicon', () => {
  beforeEach(() => {
    // Canvasモック
    const mockContext = {
      fillStyle: '',
      fillRect: vi.fn(),
      drawImage: vi.fn(),
    };

    const mockCanvas = {
      width: 0,
      height: 0,
      getContext: vi.fn(() => mockContext),
      toBlob: vi.fn((callback) => {
        callback(new Blob(['fake'], { type: 'image/x-icon' }));
      }),
    };

    vi.spyOn(document, 'createElement').mockReturnValue(mockCanvas as unknown as HTMLCanvasElement);
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock');
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

    // Imageモック
    interface MockImageContext {
      src?: string;
      width: number;
      height: number;
      onload?: () => void;
      onerror?: () => void;
    }

    vi.stubGlobal('Image', vi.fn(function (this: MockImageContext) {
      Object.defineProperty(this, 'src', {
        set: () => setTimeout(() => this.onload?.(), 0),
      });
      this.width = 100;
      this.height = 100;
    }));
  });

  it('正常にfaviconを生成できる', async () => {
    const result = await generateFavicon(new ArrayBuffer(8), 'test.png');

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.name).toBe('test_favicon.ico');
      expect(result.value.type).toBe('image/x-icon');
    }
  });

  it('画像読み込み失敗時はエラーを返す', async () => {
    interface MockImageContext {
      src?: string;
      width?: number;
      height?: number;
      onload?: () => void;
      onerror?: () => void;
    }

    vi.stubGlobal('Image', vi.fn(function (this: MockImageContext) {
      Object.defineProperty(this, 'src', {
        set: () => setTimeout(() => this.onerror?.(), 0),
      });
    }));

    const result = await generateFavicon(new ArrayBuffer(8), 'test.png');

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe('画像の読み込みに失敗しました');
    }
  });
});