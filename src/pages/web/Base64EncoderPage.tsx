import BaseTemplate from "../../common/components/BaseTemplate";
import Base64Encoder from "../../features/web/components/Base64Encoder";

// Base64エンコード・デコードページコンポーネント
const Base64EncoderPage = () => {
  return (
    <BaseTemplate
      title="Base64エンコード・デコード"
      subtitle="Base64のエンコードとデコードを行います。"
    >
      <Base64Encoder />
    </BaseTemplate>
  );
};

export default Base64EncoderPage;
