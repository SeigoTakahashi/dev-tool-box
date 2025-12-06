/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type ThemeMode = "dark" | "light";

type ThemeContextType = {
  /** 現在のテーマモード */
  mode: ThemeMode;
  /** テーマを切り替える関数 */
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

/**
 * ThemeProvider コンポーネント
 * アプリケーション全体のテーマ状態を管理します
 * - ダークモード/ライトモードの切り替え
 * - localStorage への永続化
 */
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

  const toggleTheme = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * useTheme カスタムフック
 * テーマコンテキストにアクセスします
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
