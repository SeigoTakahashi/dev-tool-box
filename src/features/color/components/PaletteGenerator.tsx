import { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Grid,
  Tooltip,
  Alert,
} from "@mui/material";
import { generatePalette } from "../utils/palette-generator";
import { PALETTE_LABELS } from "../const";
import type { PalettesType } from "../types";

// 初期パレット生成関数
const initializePalettes = (): PalettesType => {
  const result = generatePalette("#FFFF00");
  if (result.ok) {
    return result.palettes;
  }
  return {
    monochromatic: [],
    analogous: [],
    complementary: [],
    triadic: [],
    tetradic: [],
  };
};

// カラーパレット生成コンポーネント
const PaletteGenerator = () => {
  const [baseColor, setBaseColor] = useState("#FFFF00");
  const [palettes, setPalettes] = useState<PalettesType>(initializePalettes());
  const [error, setError] = useState<string | null>(null);

  // ベースカラー変更時にパレット生成
  const handleGeneratePalette = (color: string) => {
    setBaseColor(color);
    const result = generatePalette(color);
    if (result.ok) {
      setPalettes(result.palettes);
      setError(null);
    } else {
      setPalettes({
        monochromatic: [],
        analogous: [],
        complementary: [],
        triadic: [],
        tetradic: [],
      });
      setError(result.error);
    }
  };

  return (
    <Paper sx={{ p: { xs: 2, sm: 2.5, md: 3 }, minHeight: "400px" }}>
      <Grid container spacing={{ xs: 1.5, sm: 2, md: 2 }}>
        <Grid
          size={{ xs: 12 }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {/* ベースカラー（HEX）入力 */}
          <Box
            sx={{
              width: "100%",
              maxWidth: "400px",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                mb: 1,
                color: "text.secondary",
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
            >
              ベースカラー
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <TextField
                placeholder="#FFFF00"
                variant="outlined"
                size="small"
                value={baseColor}
                inputProps={{
                  readOnly: true,
                  style: { textAlign: "center", fontFamily: "monospace" },
                }}
                sx={{ mr: 2 }}
              />
              <Tooltip title="カラーピッカーで色を選択">
                <input
                  type="color"
                  value={baseColor}
                  onChange={(e) => handleGeneratePalette(e.target.value)}
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
            {error && (
              <Alert
                severity="error"
                sx={{
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  mt: 1,
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                {error}
              </Alert>
            )}
          </Box>
        </Grid>

        {/* 生成されたカラーパレット表示エリア */}
        {Object.entries(palettes).map(
          ([key, palette]: [string, string[]], index: number) => (
            <Grid
              size={{ xs: 12 }}
              key={index}
              sx={{ mb: { xs: 2, sm: 3, md: 4 } }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: { xs: 1.5, sm: 2 },
                  fontWeight: 600,
                  textAlign: "center",
                  fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                }}
              >
                {PALETTE_LABELS[key]}
              </Typography>
              {/* パレットの色ブロック */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: { xs: 0.75, sm: 1, md: 1.5 },
                }}
              >
                {palette.map((color: string, colorIndex: number) => (
                  <Tooltip
                    title={`${color}（クリックしたらベースカラーに設定）`}
                    key={colorIndex}
                    placement="top"
                  >
                    <Box
                      onClick={() => handleGeneratePalette(color)}
                      sx={{
                        width: { xs: 70, sm: 100, md: 150 },
                        height: { xs: 70, sm: 100, md: 150 },
                        backgroundColor: color,
                        borderRadius: "4px",
                        transition: "transform 0.2s",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "center",
                        padding: "4px",
                        fontSize: {
                          xs: "0.65rem",
                          sm: "0.75rem",
                          md: "0.85rem",
                        },
                        color: "#666",
                        overflow: "hidden",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    ></Box>
                  </Tooltip>
                ))}
              </Box>
            </Grid>
          )
        )}
      </Grid>
    </Paper>
  );
};

export default PaletteGenerator;
