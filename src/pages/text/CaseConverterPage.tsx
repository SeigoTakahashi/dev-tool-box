import BaseTemplate from "../../common/components/BaseTemplate";
import CaseConverter from "../../features/text/components/CaseConverter";

// 改行コード変換ページコンポーネント
const CaseConverterPage = () => {
  return (
    <BaseTemplate
      title="命名規則変換"
      subtitle="テキストの命名規則（キャメルケース、スネークケースなど）を変換します。"
    >
      <CaseConverter />
    </BaseTemplate>
  );
};

export default CaseConverterPage;
