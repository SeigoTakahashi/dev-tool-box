import BaseTemplate from "../../common/components/BaseTemplate";
import RegexTester from "../../features/web/components/RegexTester";

// 正規表現テスター ページコンポーネント
const RegexTesterPage = () => {
  return (
    <BaseTemplate
      title="正規表現テスター"
      subtitle="正規表現のテストを行います。"
    >
      <RegexTester />
    </BaseTemplate>
  );
};

export default RegexTesterPage;
