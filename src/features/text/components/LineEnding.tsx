import { useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CopyButton from "../../../common/components/CopyButton";
import ClearButton from "../../../common/components/ClearButton";
import { normalizeLineEnding } from "../utils/line-ending";

import type { LineEndingType } from "../../types";

// 改行コード変換コンポーネント
const LineEnding = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [lineEndingType, setLineEndingType] = useState<LineEndingType>("lf");

  // 改行コード変換処理
  const handleConvert = () => {
    const convertedText = normalizeLineEnding(inputText, lineEndingType);
    setOutputText(convertedText);
  };

  return (
    <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
      <Stack spacing={0} sx={{ width: "100%", maxWidth: 900 }}>
        {/* 入力エリア */}
        <Box sx={{ textAlign: "center", pb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            入力
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="ここに改行コードを変換したいテキストを入力してください"
            variant="outlined"
          />
        </Box>

        {/* 変換設定 */}
        <Box sx={{ textAlign: "center", pb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            出力の改行コード設定
          </Typography>
          <RadioGroup
            value={lineEndingType}
            onChange={(e) =>
              setLineEndingType(e.target.value as LineEndingType)
            }
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <FormControlLabel value="lf" control={<Radio />} label="LF (\n)" />
            <FormControlLabel
              value="crlf"
              control={<Radio />}
              label="CRLF (\r\n)"
            />
            <FormControlLabel value="cr" control={<Radio />} label="CR (\r)" />
          </RadioGroup>
        </Box>

        {/* 変換ボタン */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleConvert}
            disabled={!inputText.trim()}
          >
            変換する
          </Button>
        </Box>

        {/* 出力エリア */}
        <Box sx={{ textAlign: "center", pt: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            出力
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            value={outputText}
            placeholder="変換結果がここに表示されます"
            variant="outlined"
            InputProps={{ readOnly: true }}
            sx={{ mb: 2 }}
          />
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <CopyButton text={outputText} />
            <ClearButton
              handleClear={() => {
                setInputText("");
                setOutputText("");
              }}
              disabled={!inputText && !outputText}
            />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default LineEnding;
