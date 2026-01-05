import BaseTemplate from "../../common/components/BaseTemplate";
import ColorConverter from "../../features/color/components/ColorConverter";

// カラーコード変換ページコンポーネント
const ColorConverterPage = () => {
  return (
    <BaseTemplate
      title="カラーコード変換"
      subtitle="色の変換ツールです。"
    >
      <ColorConverter />
    </BaseTemplate>
  );
};

export default ColorConverterPage;
