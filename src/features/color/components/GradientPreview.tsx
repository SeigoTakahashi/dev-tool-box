import { useState } from "react";
import { Grid, Paper, Box, TextField, Tooltip } from "@mui/material";

// グラデーションプレビューコンポーネント
const GradientPreview = () => {
  const [startColor, setStartColor] = useState("#ffffff");
  const [endColor, setEndColor] = useState("#000000");
  const [angle, setAngle] = useState(90);

  const gradiendtStyle = `linear-gradient(${angle}deg, ${startColor}, ${endColor})`;

  return (
    <Paper sx={{ p: { xs: 2, sm: 2.5, md: 3 }, minHeight: "400px" }}>
      <Grid container spacing={{ xs: 1.5, sm: 2, md: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          {/* 開始色の入力 */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              mt: 1,
            }}
          >
            <TextField
              placeholder="#FFFFFF"
              variant="outlined"
              size="small"
              value={startColor}
              label="開始色"
              inputProps={{
                readOnly: true,
                style: { textAlign: "center", fontFamily: "monospace" },
              }}
              sx={{ mr: 2, mb: 2 }}
            />
            <Tooltip title="カラーピッカーで色を選択">
              <input
                type="color"
                value={startColor}
                onChange={(e) => setStartColor(e.target.value)}
                style={{
                  width: "44px",
                  height: "40px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  cursor: "pointer",
                  padding: "2px",
                }}
              />
            </Tooltip>
          </Box>

          {/* 終了色の入力 */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <TextField
              placeholder="#FFFFFF"
              variant="outlined"
              size="small"
              value={endColor}
              label="終了色"
              inputProps={{
                readOnly: true,
                style: { textAlign: "center", fontFamily: "monospace" },
              }}
              sx={{ mr: 2 }}
            />
            <Tooltip title="カラーピッカーで色を選択">
              <input
                type="color"
                value={endColor}
                onChange={(e) => setEndColor(e.target.value)}
                style={{
                  width: "44px",
                  height: "40px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  cursor: "pointer",
                  padding: "2px",
                }}
              />
            </Tooltip>
          </Box>

          {/* 角度の入力 */}
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <TextField
              type="number"
              label="角度 (0-360度)"
              variant="outlined"
              size="small"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              inputProps={{
                min: 0,
                max: 360,
                style: { textAlign: "center", fontFamily: "monospace" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  width: "120px",
                },
              }}
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {/* グラデーションプレビュー表示 */}
          <Box
            sx={{
              width: "100%",
              height: "180px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              background: gradiendtStyle,
            }}
          />

          {/* グラデーションCSSコード表示 */}
          <Tooltip title="CSSコードをコピー">
            <Box sx={{ textAlign: "center", mt: 2 }} onClick={() => {
              const cssCode = `background: ${gradiendtStyle};`;
              navigator.clipboard.writeText(cssCode);
            }}>
              <TextField
                fullWidth
                multiline
                rows={1}
                value={`background: ${gradiendtStyle};`}
                label="CSSコード"
                variant="outlined"
                inputProps={{
                  readOnly: true,
                  style: { fontFamily: "monospace" },
                }}
                sx={{
                  cursor: "pointer",
                  "& .MuiOutlinedInput-root": {
                    cursor: "pointer",
                  },
                }}
              />
            </Box>
          </Tooltip>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default GradientPreview;
