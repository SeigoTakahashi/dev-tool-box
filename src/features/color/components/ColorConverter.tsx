import { useState } from "react";
import { Box, Grid, TextField, Stack, Alert } from "@mui/material";
import type { ColorEditMode, RGB, HSL } from "../types";
import {
  hexToRgb,
  hexToHsl,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  hslToHex,
} from "../utils/color-converter";

// カラーコード変換コンポーネント
const ColorConverter = () => {
  const [hex, setHex] = useState<string>("#FF0000");
  const [rgb, setRgb] = useState<RGB>({ r: 255, g: 0, b: 0 });
  const [hsl, setHsl] = useState<HSL>({ h: 0, s: 100, l: 50 });
  const [editMode, setEditMode] = useState<ColorEditMode>("hex");
  const [error, setError] = useState<string | null>(null);

  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  // HEX更新
  const handleHexChange = (newHex: string) => {
    setHex(newHex);
    setError(null);

    const rgbResult = hexToRgb(newHex);
    if (!rgbResult.ok) {
      setError(rgbResult.error);
      return;
    }

    const hslResult = hexToHsl(newHex);
    if (!hslResult.ok) {
      setError(hslResult.error);
      return;
    }

    setRgb(rgbResult.value);
    setHsl(hslResult.value);
  };

  // RGB更新
  const handleRgbChange = (newRgb: RGB) => {
    setRgb(newRgb);
    setError(null);

    const hexResult = rgbToHex(newRgb);
    if (!hexResult.ok) {
      setError(hexResult.error);
      return;
    }

    const hslResult = rgbToHsl(newRgb);
    if (!hslResult.ok) {
      setError(hslResult.error);
      return;
    }

    setHex(hexResult.value);
    setHsl(hslResult.value);
  };

  // HSL更新
  const handleHslChange = (newHsl: HSL) => {
    setHsl(newHsl);
    setError(null);

    const rgbResult = hslToRgb(newHsl);
    if (!rgbResult.ok) {
      setError(rgbResult.error);
      return;
    }

    const hexResult = hslToHex(newHsl);
    if (!hexResult.ok) {
      setError(hexResult.error);
      return;
    }

    setRgb(rgbResult.value);
    setHex(hexResult.value);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {/* 左側: 入力フォーム */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ p: 3, minHeight: "400px" }}>
            {/* HEX入力 */}
            <Box
              onClick={() => setEditMode("hex")}
              sx={{
                mb: 3,
                p: 2,
                borderRadius: 1,
                cursor: "pointer",
                backgroundColor:
                  editMode === "hex" ? "action.hover" : "transparent",
                border: editMode === "hex" ? "2px solid" : "1px solid",
                borderColor: editMode === "hex" ? "primary.main" : "divider",
                transition: "all 0.2s",
              }}
            >
              <TextField
                fullWidth
                value={hex}
                onChange={(e) => handleHexChange(e.target.value)}
                placeholder="#FFFFFF"
                variant="outlined"
                size="small"
                disabled={editMode !== "hex"}
                label="HEX"
              />
            </Box>

            {/* RGB入力 */}
            <Box
              onClick={() => setEditMode("rgb")}
              data-testid="rgb-edit-section"
              sx={{
                mb: 3,
                p: 2,
                borderRadius: 1,
                cursor: "pointer",
                backgroundColor:
                  editMode === "rgb" ? "action.hover" : "transparent",
                border: editMode === "rgb" ? "2px solid" : "1px solid",
                borderColor: editMode === "rgb" ? "primary.main" : "divider",
                transition: "all 0.2s",
              }}
            >
              {editMode === "rgb" ? (
                <Stack direction="row" spacing={1}>
                  <TextField
                    size="small"
                    label="R"
                    type="number"
                    inputProps={{ min: 0, max: 255 }}
                    value={rgb.r}
                    onChange={(e) =>
                      handleRgbChange({
                        ...rgb,
                        r: Math.min(
                          255,
                          Math.max(0, parseInt(e.target.value) || 0)
                        ),
                      })
                    }
                  />
                  <TextField
                    size="small"
                    label="G"
                    type="number"
                    inputProps={{ min: 0, max: 255 }}
                    value={rgb.g}
                    onChange={(e) =>
                      handleRgbChange({
                        ...rgb,
                        g: Math.min(
                          255,
                          Math.max(0, parseInt(e.target.value) || 0)
                        ),
                      })
                    }
                  />
                  <TextField
                    size="small"
                    label="B"
                    type="number"
                    inputProps={{ min: 0, max: 255 }}
                    value={rgb.b}
                    onChange={(e) =>
                      handleRgbChange({
                        ...rgb,
                        b: Math.min(
                          255,
                          Math.max(0, parseInt(e.target.value) || 0)
                        ),
                      })
                    }
                  />
                </Stack>
              ) : (
                <TextField
                  fullWidth
                  value={rgbString}
                  disabled
                  variant="outlined"
                  size="small"
                  label="RGB"
                />
              )}
            </Box>

            {/* HSL入力 */}
            <Box
              onClick={() => setEditMode("hsl")}
              sx={{
                mb: 3,
                p: 2,
                borderRadius: 1,
                cursor: "pointer",
                backgroundColor:
                  editMode === "hsl" ? "action.hover" : "transparent",
                border: editMode === "hsl" ? "2px solid" : "1px solid",
                borderColor: editMode === "hsl" ? "primary.main" : "divider",
                transition: "all 0.2s",
              }}
            >
              {editMode === "hsl" ? (
                <Stack direction="row" spacing={1}>
                  <TextField
                    size="small"
                    label="H"
                    type="number"
                    inputProps={{ min: 0, max: 360 }}
                    value={hsl.h}
                    onChange={(e) =>
                      handleHslChange({
                        ...hsl,
                        h: Math.min(
                          360,
                          Math.max(0, parseInt(e.target.value) || 0)
                        ),
                      })
                    }
                  />
                  <TextField
                    size="small"
                    label="S"
                    type="number"
                    inputProps={{ min: 0, max: 100 }}
                    value={hsl.s}
                    onChange={(e) =>
                      handleHslChange({
                        ...hsl,
                        s: Math.min(
                          100,
                          Math.max(0, parseInt(e.target.value) || 0)
                        ),
                      })
                    }
                  />
                  <TextField
                    size="small"
                    label="L"
                    type="number"
                    inputProps={{ min: 0, max: 100 }}
                    value={hsl.l}
                    onChange={(e) =>
                      handleHslChange({
                        ...hsl,
                        l: Math.min(
                          100,
                          Math.max(0, parseInt(e.target.value) || 0)
                        ),
                      })
                    }
                  />
                </Stack>
              ) : (
                <TextField
                  fullWidth
                  value={hslString}
                  disabled
                  variant="outlined"
                  size="small"
                  label="HSL"
                />
              )}
            </Box>
          </Box>
        </Grid>

        {/* 右側: カラープレビュー */}
        <Grid size={{ xs: 12, md: 6 }}>
          {error ? (
            <Alert severity="error" sx={{ width: "100%" }}>
              {error}
            </Alert>
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "300px",
                borderRadius: 1,
                background: hex,
                border: "2px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              }}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ColorConverter;
