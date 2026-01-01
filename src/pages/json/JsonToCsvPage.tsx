import BaseTemplate from "../../common/components/BaseTemplate";
import JsonToCsv from "../../features/json/components/JsonToCsv";

// JSONからCSVへの変換ページコンポーネント
const JsonToCsvPage = () => {
  return (
    <BaseTemplate
      title="JSON → CSV 変換"
      subtitle="JSONデータをCSV形式に変換します。"
    >
      <JsonToCsv />
    </BaseTemplate>
  );
};

export default JsonToCsvPage;
