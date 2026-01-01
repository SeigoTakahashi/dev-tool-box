import BaseTemplate from "../../common/components/BaseTemplate";
import JsonValidator from "../../features/json/components/JsonValidator";

// JSONバリデータページコンポーネント
const JsonValidatorPage = () => {
  return (
    <BaseTemplate
      title="JSONバリデータ"
      subtitle="JSONデータのバリデーションを行います。"
    >
      <JsonValidator />
    </BaseTemplate>
  );
};

export default JsonValidatorPage;
