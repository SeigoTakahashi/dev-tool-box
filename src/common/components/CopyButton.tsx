import { useState } from "react";
import { Button } from "@mui/material";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Button
      variant="outlined"
      startIcon={<ContentCopyIcon />}
      onClick={() => {
        handleCopy(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      disabled={!text || copied}
    >
      {copied ? "コピーしました" : "コピー"}
    </Button>
  );
};

export default CopyButton;
