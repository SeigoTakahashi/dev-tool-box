// theme/index.ts
import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,

      // ボタン・主要アクション
      primary: {
        main: mode === "light" ? "#1976d2" : "#90caf9",
      },

      // サブアクション
      secondary: {
        main: mode === "light" ? "#9c27b0" : "#ce93d8",
      },

      // 背景
      background: {
        default: mode === "light" ? "#f5f5f5" : "#121212",
        paper: mode === "light" ? "#ffffff" : "#1e1e1e",
      },

      // テキスト
      text: {
        primary: mode === "light" ? "#111" : "#fff",
        secondary: mode === "light" ? "#555" : "#bbb",
      },

      // 枠線
      divider: mode === "light" ? "#e0e0e0" : "#333",
    },
  });
