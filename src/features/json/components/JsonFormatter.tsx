import { useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { formatJsonSafe } from "../utils/json-formatter";

// JSONフォーマットコンポーネント
const JsonFormatter = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const handleFormat = () => {
    const result = formatJsonSafe(inputText, 2);
    if (result.ok) {
      setOutputText(result.value);
    } else {
      setOutputText(`エラー: ${result.error}`);
    }
  };

  return (
    <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
      <Stack spacing={0} sx={{ width: "100%", maxWidth: 900 }}>
        {/* 入力エリア */}
        <Box sx={{ textAlign: "center" }}>
          <TextField
            fullWidth
            multiline
            rows={6}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="ここに整形したいテキストを入力してください"
            variant="outlined"
          />
        </Box>

        {/* 整形ボタン */}
        <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleFormat}
            disabled={!inputText.trim()}
          >
            きれいにする↓↓
          </Button>
        </Box>

        {/* 出力エリア */}
        <Box sx={{ textAlign: "center", pt: 1 }}>
          <TextField
            fullWidth
            multiline
            rows={8}
            value={outputText}
            placeholder="整形結果がここに表示されます"
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </Box>
      </Stack>
    </Box>

  );
};

export default JsonFormatter;