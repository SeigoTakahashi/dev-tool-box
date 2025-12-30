import { useState } from "react";
import { Button, IconButton } from "@mui/material";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

type CopyButtonProps = {
  text: string;
  small?: boolean; // trueの場合アイコンだけの小さいボタンにする
};

// コピー用ボタンコンポーネント
const CopyButton = ({ text, small = false }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  // クリック時の挙動を定義
  const handleClick = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // 2秒後に状態をリセット
  };

  const icon = copied ? <CheckIcon /> : <ContentCopyIcon />;
  const isDisabled = !text || copied;

  // 小さいアイコンボタンとして表示する場合は、チェックアイコンに切り替え
  if (small) {
    return (
      <IconButton
        onClick={handleClick}
        disabled={isDisabled}
        size="small"
        sx={{
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      >
        {icon}
      </IconButton>
    );
  }

  // 通常のボタンとして表示
  return (
    <Button
      variant="outlined"
      startIcon={icon}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {copied ? "コピーしました" : "コピー"}
    </Button>
  );
};

export default CopyButton;
