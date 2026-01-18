import BaseTemplate from "../../common/components/BaseTemplate";
import BackgroundRemover from "../../features/image/components/BackgroundRemover";

// 背景除去ページコンポーネント
const BackgroundRemoverPage = () => {
  return (
    <BaseTemplate
      title="背景除去"
      subtitle="画像の背景を除去します。"
    >
      <BackgroundRemover />
    </BaseTemplate>
  );
};

export default BackgroundRemoverPage;
