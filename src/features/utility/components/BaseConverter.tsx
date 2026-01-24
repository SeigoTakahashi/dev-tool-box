import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Alert,
} from "@mui/material";
import { convertBase } from "../utils/base-converter";

// 基底変換コンポーネント
const BaseConverter = () => {
  const [binary, setBinary] = useState("");
  const [octal, setOctal] = useState("");
  const [decimal, setDecimal] = useState("");
  const [hexadecimal, setHexadecimal] = useState("");

  const [error, setError] = useState<string | null>(null);

  const bases = [
    { label: "2進数", base: 2, value: binary, setValue: setBinary },
    { label: "8進数", base: 8, value: octal, setValue: setOctal },
    { label: "10進数", base: 10, value: decimal, setValue: setDecimal },
    { label: "16進数", base: 16, value: hexadecimal, setValue: setHexadecimal },
  ];

  // 基底変換を実行するハンドラ
  const handleConvert = (value: string, fromBase: number) => {
    const result = convertBase(value, fromBase);
    if (result.ok) {
      setBinary(result.value.binary);
      setOctal(result.value.octal);
      setDecimal(result.value.decimal);
      setHexadecimal(result.value.hexadecimal);
      setError(null);
    } else {
      setError(result.error);
    }
  };

  return (
    <Stack spacing={3} sx={{ p: 2, maxWidth: 500, margin: "0 auto" }}>
      {bases.map(({ label, base, value, setValue }) => (
        // 各基底の入力フィールドと変換ボタン
        <Box
          key={label}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h6" sx={{ minWidth: "80px" }}>
            {label}
          </Typography>

          <TextField
            size="small"
            variant="outlined"
            placeholder={`${label}を入力`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            sx={{ flexGrow: 1 }}
            inputProps={{ style: { textAlign: "right" } }}
          />

          <Button
            variant="contained"
            onClick={() => handleConvert(value, base)}
          >
            変換
          </Button>
        </Box>
      ))}

      {/* エラーメッセージ表示 */}
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
    </Stack>
  );
};

export default BaseConverter;
