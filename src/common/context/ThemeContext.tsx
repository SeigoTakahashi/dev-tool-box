/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import type { Theme } from "@mui/material/styles";
import { getTheme } from "../theme";

type ThemeMode = "dark" | "light";

type ThemeContextType = {
  mode: ThemeMode;
  theme: Theme;
  toggleTheme: () => void;
};

// テーマコンテキストの作成
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

// テーマプロバイダコンポーネント
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    // 初期値を localStorage から取得、デフォルトはダーク
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme-mode");
      return (saved as ThemeMode) || "dark";
    }
    return "dark";
  });

  // テーマ変更時に localStorage に保存
  useEffect(() => {
    localStorage.setItem("theme-mode", mode);
  }, [mode]);

  // mode に応じてテーマを生成
  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ mode, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// カスタムフックでコンテキストを利用
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
