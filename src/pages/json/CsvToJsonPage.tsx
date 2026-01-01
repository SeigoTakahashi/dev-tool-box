import BaseTemplate from "../../common/components/BaseTemplate";
import CsvToJson from "../../features/json/components/CsvToJson";

// CSVからJSONへの変換ページコンポーネント
const CsvToJsonPage = () => {
  return (
    <BaseTemplate
      title="CSV → JSON 変換"
      subtitle="CSVデータをJSON形式に変換します。"
    >
      <CsvToJson />
    </BaseTemplate>
  );
};

export default CsvToJsonPage;
