import { useState, useRef, useMemo } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Alert,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import { validateJson } from "../utils/json-validator";
import { jsonToCsv } from "../utils/json-to-csv";

import { useTheme } from "../../../common/context/ThemeContext";

// JSONからCSVへの変換コンポーネント
const JsonToCsv = () => {
  const { theme } = useTheme();
 
  const [inputText, setInputText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isValid = inputText ? validateJson(inputText).ok : null;

  // JSONをCSVに変換
  const csvResult = useMemo(() => {
    if (!isValid) return null;
    console.log(jsonToCsv(inputText));
    return jsonToCsv(inputText);
  }, [inputText, isValid]);

  // CSVデータのテーブル表示用データ作成
  const csvData = csvResult?.ok ? csvResult.value : null;
  const tableData = useMemo(() => {
    if (!csvData) return null;
    const lines = csvData.split("\n");
    if (lines.length === 0) return null;
    const headers = lines[0].split(",");
    const rows = lines.slice(1).map(line => line.split(","));
    return { headers, rows };
  }, [csvData]);

  // ファイル選択ハンドラ
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setInputText(content);
      };
      reader.readAsText(file);
    }
  };

  // CSVダウンロードハンドラ
  const handleDownloadCsv = () => {
    if (!csvData) return;
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      `data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`
    );
    element.setAttribute("download", "data.csv");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
      <Stack spacing={3} sx={{ width: "100%", maxWidth: 900 }}>
        {/* JSONファイル読み込みボタン */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" size="large" onClick={() => fileInputRef.current?.click()}>
            <AddIcon sx={{ mr: 1 }} />
            JSONファイルを選択
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
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
            placeholder="ここに変換したいJSONを入力してください"
            variant="outlined"
          />
        </Box>

        {/* 出力エリア */}
        {isValid !== null && !isValid && (
          <Box sx={{ display: "flex", justifyContent: "center", pb: 3 }}>
            <Alert severity="error">無効なJSONです。</Alert>
          </Box>
        )}

        {/* CSV表示エリア */}
        {csvResult?.ok && tableData && (
          <>

            {/* テーブルプレビュー */}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: theme.palette.background.paper }}>
                    {tableData.headers.map((header, index) => (
                      <TableCell key={index} sx={{ fontWeight: "bold" }}>
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.rows.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <TableCell key={cellIndex}>{cell}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* ダウンロードボタン */}
            <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
              <Button
                variant="contained"
                color="success"
                onClick={handleDownloadCsv}
                size="large"
              >
                <DownloadIcon sx={{ mr: 1 }} />
                CSVをダウンロード
              </Button>
            </Box>
          </>
        )}

        {csvResult?.ok === false && csvResult.error && (
          <Box sx={{ display: "flex", justifyContent: "center", pb: 3 }}>
            <Alert severity="error">{csvResult.error}</Alert>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default JsonToCsv;
