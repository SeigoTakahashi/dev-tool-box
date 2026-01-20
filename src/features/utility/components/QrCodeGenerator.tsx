import { useState } from "react";
import { Box, Stack, TextField, Button } from "@mui/material";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import { QRCodeCanvas } from "qrcode.react";

// QRコード生成コンポーネント
const QrCodeGenerator = () => {
  const [url, setUrl] = useState("");
  const [showQrCode, setShowQrCode] = useState(false);
  return (
    <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
      <Stack spacing={3} sx={{ width: "100%", maxWidth: 900 }}>
        {/* URL入力フィールド */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TextField
            label="URL"
            variant="outlined"
            fullWidth
            placeholder="QRコードに変換したいURLを入力してください"
            focused
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Box>
        {/* QRコード生成ボタン */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            size="large"
            disabled={!url.trim()}
            onClick={() => setShowQrCode(true)}
          >
            <QrCode2Icon sx={{ mr: 1 }} />
            QRコードを生成
          </Button>
        </Box>
        {/* QRコード表示エリア */}
        {showQrCode && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <QRCodeCanvas
              value={url}
              size={256}
              bgColor="#ffffff"
              fgColor="#000000"
              level="L"
              includeMargin={true}
              imageSettings={{
                src: "/dev-icon.svg",
                x: undefined,
                y: undefined,
                height: 24,
                width: 24,
                excavate: true,
              }}
            />
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default QrCodeGenerator;
