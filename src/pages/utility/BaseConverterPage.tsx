import BaseTemplate from "../../common/components/BaseTemplate";
import BaseConverter from "../../features/utility/components/BaseConverter";

// 基底変換ページコンポーネント
const BaseConverterPage = () => {
  return (
    <BaseTemplate
      title="基底変換"
      subtitle="数値の基底を変換します。"
    >
      <BaseConverter />
    </BaseTemplate>
  );
};

export default BaseConverterPage;
