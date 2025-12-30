import BaseTemplate from "../../common/components/BaseTemplate";
import MarkdownPreview from "../../features/text/components/MarkdownPreview";

// Markdownプレビューページコンポーネント
const MarkdownPreviewPage = () => {
  return (
    <BaseTemplate
      title="Markdownプレビュー"
      subtitle="Markdown形式のテキストをプレビューします。"
    >
      <MarkdownPreview />
    </BaseTemplate>
  );
};

export default MarkdownPreviewPage;
