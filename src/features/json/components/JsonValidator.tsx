import { useState } from "react";
import { Box, Button, Stack, TextField, Alert } from "@mui/material";
import { validateJson } from "../utils/json-validator";

// JSONバリデータコンポーネント
const JsonValidator = () => {
  const [inputText, setInputText] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  // 検証処理
  const handleValidate = () => {
    const result = validateJson(inputText);
    setIsValid(result.ok);
  };

  return (
    <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
      <Stack spacing={2} sx={{ width: "100%", maxWidth: 900 }}>
        {/* 入力エリア */}
        <Box sx={{ textAlign: "center" }}>
          <TextField
            fullWidth
            multiline
            rows={6}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="ここに検証したいJSONを入力してください"
            variant="outlined"
          />
        </Box>

        {/* 整形ボタン */}
        <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleValidate}
            disabled={!inputText.trim()}
          >
            検証する
          </Button>
        </Box>

        {/* 出力エリア */}
        {isValid !== null && (
          <Box sx={{ display: "flex", justifyContent: "center", pb: 3 }}>
              <Alert severity={isValid ? "success" : "error"}>{isValid ? "有効なJSONです。" : "無効なJSONです。"}</Alert>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default JsonValidator;
