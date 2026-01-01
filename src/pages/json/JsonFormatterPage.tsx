import BaseTemplate from "../../common/components/BaseTemplate";
import JsonFormatter from "../../features/json/components/JsonFormatter";

// JSONフォーマットページコンポーネント
const JsonFormatterPage = () => {
  return (
    <BaseTemplate
      title="JSONフォーマット"
      subtitle="JSONデータのフォーマットを行います。"
    >
      <JsonFormatter />
    </BaseTemplate>
  );
};

export default JsonFormatterPage;
