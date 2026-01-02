import BaseTemplate from "../../common/components/BaseTemplate";
import UrlEncoder from "../../features/web/components/UrlEncoder";

// URLエンコード・デコードページコンポーネント
const UrlEncoderPage = () => {
  return (
    <BaseTemplate
      title="URLエンコード・デコード"
      subtitle="URLのエンコードとデコードを行います。"
    >
      <UrlEncoder />
    </BaseTemplate>
  );
};

export default UrlEncoderPage;
