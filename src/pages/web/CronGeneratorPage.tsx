import BaseTemplate from "../../common/components/BaseTemplate";
import CronGenerator from "../../features/web/components/CronGenerator";

// Cron式ジェネレーターページコンポーネント
const CronGeneratorPage = () => {
  return (
    <BaseTemplate
      title="Cron式ジェネレーター"
      subtitle="Cron式の生成を行います。"
    >
      <CronGenerator />
    </BaseTemplate>
  );
};

export default CronGeneratorPage;
