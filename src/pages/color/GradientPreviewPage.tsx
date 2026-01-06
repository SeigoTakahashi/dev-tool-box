import BaseTemplate from "../../common/components/BaseTemplate";
import GradientPreview from "../../features/color/components/GradientPreview";

// グラデーションプレビューページコンポーネント
const GradientPreviewPage = () => {
  return (
    <BaseTemplate
      title="グラデーションプレビュー"
      subtitle="グラデーションのプレビュー表示ツールです。"
    >
      <GradientPreview />
    </BaseTemplate>
  );
};

export default GradientPreviewPage;
