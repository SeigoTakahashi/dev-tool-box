import BaseTemplate from "../../common/components/BaseTemplate";
import HashGenerator from "../../features/web/components/HashGenerator";

// ハッシュジェネレーター ページコンポーネント
const HashGeneratorPage = () => {
  return (
    <BaseTemplate
      title="ハッシュ生成器"
      subtitle="ハッシュ値の生成を行います。"
    >
      <HashGenerator />
    </BaseTemplate>
  );
};

export default HashGeneratorPage;
