import { useState } from "react";
import { Box, TextField, Paper, FormControlLabel, Switch } from "@mui/material";
import { useTheme } from "../../../common/context/ThemeContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import "github-markdown-css/github-markdown.css";
import "../../../markdown-style.css"

// Markdownプレビューコンポーネント
const MarkdownPreview = () => {
  const { mode, theme } = useTheme();
  const [markdown, setMarkdown] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  return (
    <Box sx={{ p: 3 }}>
      {/* トグル */}
      <Box sx={{ mb: 3 }}>
        <FormControlLabel
          control={
            <Switch
              checked={isPreview}
              onChange={(e) => setIsPreview(e.target.checked)}
            />
          }
          label={isPreview ? "プレビューモード" : "編集モード"}
        />
      </Box>

      {/* エリア */}
      {isPreview ? (
        // プレビュー表示
        <Paper sx={{ p: 2, minHeight: 400, bgcolor: theme.palette.background.paper, textAlign: "left", color: theme.palette.text.primary }}>
          <div className={`markdown-body ${mode === "dark" ? "markdown-body-dark" : ""}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdown}
            </ReactMarkdown>
          </div>
        </Paper>
      ) : (
        // 編集表示
        <TextField
          fullWidth
          multiline
          rows={16}
          placeholder="Markdown を入力"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          variant="outlined"
        />
      )}
    </Box>
  );
};

export default MarkdownPreview;
