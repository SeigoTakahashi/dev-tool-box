import BaseTemplate from "../../common/components/BaseTemplate";
import PasswordChecker from "../../features/utility/components/PasswordChecker";

// パスワード強度チェッカーページコンポーネント
const PasswordCheckerPage = () => {
  return (
    <BaseTemplate
      title="パスワード強度チェッカー"
      subtitle="パスワードの強度を評価します。"
    >
      <PasswordChecker />
    </BaseTemplate>
  );
};

export default PasswordCheckerPage;
