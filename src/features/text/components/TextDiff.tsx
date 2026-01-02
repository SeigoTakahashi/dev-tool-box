import { useState } from "react";
import { Box, TextField, Button, Grid, Paper } from "@mui/material";
import { useTheme } from "../../../common/context/ThemeContext";
import { createTwoFilesPatch } from "diff";
import { html } from "diff2html";
import "diff2html/bundles/css/diff2html.min.css";

// テキスト差分比較コンポーネント
const TextDiff = () => {
  const { mode } = useTheme();

  const [text1, setText1] = useState(
    "The quick brown fox jumps over the lazy dog."
  );
  const [text2, setText2] = useState(
    "The quick brown fox jumped over a lazy dog."
  );
  const [diffHtml, setDiffHtml] = useState<string>("");

  const handleCompare = () => {
    // unified diff を生成
    const unifiedDiff = createTwoFilesPatch(
      "テキスト1",
      "テキスト2",
      text1,
      text2,
      "",
      ""
    );

    // diff2html で HTML に変換
    const diffHtml = html(unifiedDiff, {
      drawFileList: false,
      matching: "lines",
      outputFormat: "side-by-side",
      colorScheme: mode === "dark" ? "dark" : "light",
    } as Parameters<typeof html>[1]);

    setDiffHtml(diffHtml);
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* 入力エリア */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            multiline
            rows={8}
            placeholder="テキスト1を入力"
            value={text1}
            onChange={(e) => setText1(e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            multiline
            rows={8}
            placeholder="テキスト2を入力"
            value={text2}
            onChange={(e) => setText2(e.target.value)}
          />
        </Grid>
      </Grid>

      {/* 比較ボタン */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Button variant="contained" onClick={handleCompare}>
          比較する
        </Button>
      </Box>

      {/* 結果表示 */}
      {diffHtml && (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Paper sx={{ p: 2, minHeight: 300 }}>
              <div
                className="diff-container"
                dangerouslySetInnerHTML={{ __html: diffHtml }}
              />
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default TextDiff;
