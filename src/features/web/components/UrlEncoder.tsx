import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  FormControl,
  Typography,
  Grid,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";

import { encodeUrl } from "../utils/url-encoder";
import { decodeUrl } from "../utils/url-decoder";

// URLエンコード・デコードコンポーネント
const UrlEncoder = () => {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  // 変換処理
  const handleConvert = () => {
    let output = "";
    if (mode === "encode") {
      output = encodeUrl(inputText);
    } else {
      output = decodeUrl(inputText);
    }
    setOutputText(output);
  };

  return (
    <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "100%", maxWidth: 900 }}>
        {/* エンコード/デコード選択エリア */}
        <Box sx={{ p: 3, mb: 3 }} border="0.1px solid" borderRadius={1}>
          <FormControl fullWidth>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              変換モードを選択
            </Typography>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="encode"
              name="radio-buttons-group"
              value={mode}
              onChange={(e) => setMode(e.target.value as "encode" | "decode")}
            >
              <FormControlLabel
                value="encode"
                control={<Radio />}
                label="エンコード（例：あ → %E3%81%82）"
              />
              <FormControlLabel
                value="decode"
                control={<Radio />}
                label="デコード（例：%E3%81%82 → あ）"
              />
            </RadioGroup>
          </FormControl>
        </Box>

        {/* 入力と結果表示エリア */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              multiline
              rows={8}
              placeholder="ここに入力してください"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              multiline
              rows={8}
              placeholder="変換結果がここに表示されます"
              value={outputText}
              variant="outlined"
              inputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>

        {/* 変換ボタンエリア */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" size="large" onClick={handleConvert}>
            変換する
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UrlEncoder;
