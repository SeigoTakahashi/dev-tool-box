import BaseTemplate from "../../common/components/BaseTemplate";
import RandomGenerator from "../../features/utility/components/RandomGenerator";

// ランダム生成ページコンポーネント
const RandomGeneratorPage = () => {
  return (
    <BaseTemplate
      title="ランダム生成"
      subtitle="ランダムな値を生成します。"
    >
      <RandomGenerator />
    </BaseTemplate>
  );
};

export default RandomGeneratorPage;
