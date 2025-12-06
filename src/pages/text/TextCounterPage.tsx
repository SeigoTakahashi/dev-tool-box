import BaseTemplate from "../../common/components/BaseTemplate";
const TextCounterPage = () => {
  return (
    <BaseTemplate
      title="テキストカウンター"
      subtitle="テキストの文字数、バイト数、単語数をカウントします。"
    >
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Text Counter</h1>
        {/* テキストカウンターのコンテンツをここに追加 */}
      </div>
    </BaseTemplate>
  );
};

export default TextCounterPage;
