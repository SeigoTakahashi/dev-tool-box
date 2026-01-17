import BaseTemplate from "../../common/components/BaseTemplate";
import ImageCompressor from "../../features/image/components/ImageCompressor";

// 画像圧縮ページコンポーネント
const ImageCompressorPage = () => {
  return (
    <BaseTemplate
      title="画像圧縮"
      subtitle="画像を圧縮します。"
    >
      <ImageCompressor />
    </BaseTemplate>
  );
};

export default ImageCompressorPage;
