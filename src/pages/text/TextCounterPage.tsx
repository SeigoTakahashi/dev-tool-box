import BaseTemplate from "../../common/components/BaseTemplate";
import TextCounter from "../../features/text/components/TextCounter";

// テキストカウンターページコンポーネント
const TextCounterPage = () => {
  return (
    <BaseTemplate
      title="テキストカウンター"
      subtitle="テキストの文字数、バイト数、単語数をカウントします。"
    >
      <TextCounter /> 
    </BaseTemplate>
  );
};

export default TextCounterPage;
