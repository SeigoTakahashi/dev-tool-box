import BaseTemplate from "../../common/components/BaseTemplate";
import ImageCompressor from "../../features/image/components/ImageCompressor";

// ImageCompressorへの変換ページコンポーネント
const ImageCompressorPage = () => {
  return (
    <BaseTemplate
      title="Image Compressor"
      subtitle="画像を圧縮します。"
    >
      <ImageCompressor />
    </BaseTemplate>
  );
};

export default ImageCompressorPage;
