import BaseTemplate from "../../common/components/BaseTemplate";
import FaviconGenerator from "../../features/image/components/FaviconGenerator";

// Favicon生成ページコンポーネント
const FaviconGeneratorPage = () => {
  return (
    <BaseTemplate
      title="Favicon生成"
      subtitle="Faviconを生成します。"
    >
      <FaviconGenerator />
    </BaseTemplate>
  );
};

export default FaviconGeneratorPage;
