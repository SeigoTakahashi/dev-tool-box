import BaseTemplate from "../../common/components/BaseTemplate";
import TextDiff from "../../features/text/components/TextDiff";

// テキスト差分比較ページコンポーネント
const TextDiffPage = () => {
  return (
    <BaseTemplate
      title="テキスト比較"
      subtitle="2つのテキストの差分を比較します。"
    >
      <TextDiff />
    </BaseTemplate>
  );
};

export default TextDiffPage;
