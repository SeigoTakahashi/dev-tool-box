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
import { generateHash } from "../utils/hash-generator";
import type { HashAlgorithm } from "../types";

// ハッシュジェネレーターコンポーネント
const HashGenerator = () => {
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>("SHA-1");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  // 変換処理
  const handleConvert = async () => {
    const result = await generateHash(inputText, algorithm);
    if (result.ok) {
      setOutputText(result.value);
    } else {
      setOutputText(`エラー: ${result.error}`);
    }
  };

  return (
    <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "100%", maxWidth: 900 }}>
        {/* エンコード/デコード選択エリア */}
        <Box sx={{ p: 2, mb: 2 }} border="0.1px solid" borderRadius={1}>
          <FormControl fullWidth>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              アルゴリズムを選択
            </Typography>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="SHA-1"
              name="radio-buttons-group"
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value as HashAlgorithm)}
            >
              <FormControlLabel
                value="SHA-1"
                control={<Radio />}
                label="SHA-1"
              />
              <FormControlLabel
                value="SHA-256"
                control={<Radio />}
                label="SHA-256"
              />
              <FormControlLabel
                value="SHA-384"
                control={<Radio />}
                label="SHA-384"
              />
              <FormControlLabel
                value="SHA-512"
                control={<Radio />}
                label="SHA-512"
              />
            </RadioGroup>
          </FormControl>
        </Box>

        {/* 入力と結果表示エリア */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
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
              placeholder="生成結果がここに表示されます"
              value={outputText}
              variant="outlined"
              inputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>

        {/* 変換ボタンエリア */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" size="large" onClick={handleConvert}>
            生成する
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HashGenerator;
