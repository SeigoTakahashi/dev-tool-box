import BaseTemplate from "../../common/components/BaseTemplate";
import QrCodeGenerator from "../../features/utility/components/QrCodeGenerator";

// QRコード生成ページコンポーネント
const QrCodeGeneratorPage = () => {
  return (
    <BaseTemplate
      title="QRコード生成"
      subtitle="QRコードを生成します。"
    >
      <QrCodeGenerator />
    </BaseTemplate>
  );
};

export default QrCodeGeneratorPage;
