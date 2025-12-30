import BaseTemplate from "../../common/components/BaseTemplate";
import LineEnding from "../../features/text/components/LineEnding";

// 改行コード変換ページコンポーネント
const LineEndingPage = () => {
  return (
    <BaseTemplate
      title="改行コード変換"
      subtitle="テキストの改行コード（LF / CRLF / CR）を変換します。"
    >
      <LineEnding />
    </BaseTemplate>
  );
};

export default LineEndingPage;
