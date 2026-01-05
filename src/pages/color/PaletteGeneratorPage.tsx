import BaseTemplate from "../../common/components/BaseTemplate";
import PaletteGenerator from "../../features/color/components/PaletteGenerator";

// カラーパレット生成コンポーネント
const PaletteGeneratorPage = () => {
  return (
    <BaseTemplate
      title="カラーパレット生成"
      subtitle="カラーパレットを生成するツールです。"
    >
      <PaletteGenerator />
    </BaseTemplate>
  );
};

export default PaletteGeneratorPage;
