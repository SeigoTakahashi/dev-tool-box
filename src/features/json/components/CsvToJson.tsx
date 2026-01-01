import { useState, useRef, useMemo } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Alert,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import { downloadFile } from "../../../common/utils/downloadFile";
import { readFileFromInput } from "../../../common/utils/readFileFromInput";
import { validateCsv } from "../utils/csv-validator";
import { csvToJson } from "../utils/csv-to-json";

// CSVからJSONへの変換コンポーネント
const CsvToJson = () => {
  const [inputText, setInputText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // CSVの検証結果
  const validation = useMemo(() => {
    return inputText ? validateCsv(inputText) : null;
  }, [inputText]);

  // CSVをJSONに変換
  const jsonResult = useMemo(() => {
    if (!validation?.ok) return null;
    return csvToJson(inputText);
  }, [inputText, validation]);

  // JSONデータを取得
  const jsonData = jsonResult?.ok ? jsonResult.value : null;

  // ファイル選択ハンドラ
  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const content = await readFileFromInput(event);
    setInputText(content);
  };

  return (
    <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
      <Stack spacing={3} sx={{ width: "100%", maxWidth: 900 }}>
        {/* JSONファイル読み込みボタン */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => fileInputRef.current?.click()}
          >
            <AddIcon sx={{ mr: 1 }} />
            CSVファイルを選択
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
        </Box>

        <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
          もしくは
        </Typography>

        {/* 入力エリア */}
        <Box sx={{ textAlign: "center" }}>
          <TextField
            fullWidth
            multiline
            rows={6}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="ここに変換したいCSVを入力してください"
            variant="outlined"
          />
        </Box>

        {/* CSV検証エラー表示エリア */}
        {validation && !validation.ok && (
          <Box sx={{ display: "flex", justifyContent: "center", pb: 3 }}>
            <Alert severity="error">{validation.error}</Alert>
          </Box>
        )}

        {/* JSON変換エラー表示エリア */}
        {jsonResult?.ok === false && jsonResult.error && (
          <Box sx={{ display: "flex", justifyContent: "center", pb: 3 }}>
            <Alert severity="error">{jsonResult.error}</Alert>
          </Box>
        )}

        {/* JSON表示エリア */}
        {jsonResult?.ok && (
          <Box sx={{ textAlign: "center" }}>
            <TextField
              fullWidth
              multiline
              rows={8}
              value={jsonResult.value}
              placeholder="変換結果のJSONがここに表示されます"
              variant="outlined"
              sx={{ mb: 2 }}
              inputProps={{ readOnly: true }}
            />
            <Button
              variant="contained"
              size="large"
              color="success"
              startIcon={<DownloadIcon />}
              onClick={() =>
                downloadFile(jsonData, "data.json", "application/json")
              }
            >
              JSONをダウンロード
            </Button>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default CsvToJson;
