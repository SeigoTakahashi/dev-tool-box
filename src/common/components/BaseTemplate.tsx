import React, { useState, useMemo } from "react";
import type { ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";

import TopBar from "./TopBar";
import SideNav from "./SideNav";
import Footer from "./Footer";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

type BaseTemplateProps = {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
};

/**
 * BaseTemplateContent コンポーネント
 * テーマコンテキストを使用する実際のレイアウト
 */
const BaseTemplateContent: React.FC<BaseTemplateProps> = ({
  title,
  subtitle,
  children,
}) => {
  const { mode } = useTheme();
  
  // サイドナビゲーションの折りたたみ状態
  const [collapsed, setCollapsed] = useState(false);

  // モバイルでのナビゲーション開閉状態
  const [mobileOpen, setMobileOpen] = useState(false);

  // MUI テーマを動的に生成
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          primary: { main: "#7c3aed" },
          background:
            mode === "dark"
              ? { default: "#070812", paper: "#0f1724" }
              : { default: "#f5f5f5", paper: "#ffffff" },
        },
        typography: { fontFamily: "Inter, Roboto, Helvetica, Arial, sans-serif" },
      }),
    [mode]
  );

  // モバイルメニュー開閉ハンドラ
  const handleMenuToggle = () => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
    if (isMobile) {
      setMobileOpen((prev) => !prev);
    } else {
      setCollapsed((prev) => !prev);
    }
  };

  // 背景グラデーション（ダーク/ライトで変更）
  const bgClass =
    mode === "dark"
      ? "bg-gradient-to-b from-[#05060a] via-[#071028] to-[#071428]"
      : "bg-gradient-to-b from-[#f9fafb] via-[#f3f4f6] to-[#e5e7eb]";

  const textClass = mode === "dark" ? "text-gray-200" : "text-gray-800";

  return (
    <MuiThemeProvider theme={theme}>
      <div className={`min-h-screen flex ${bgClass} ${textClass}`}>
        {/* サイドナビゲーション（デスクトップ/モバイル両対応） */}
        <SideNav
          collapsed={collapsed}
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />

        <div className="flex-1 flex flex-col">
          {/* 上部トップバー */}
          <TopBar onMenuToggle={handleMenuToggle} title={title} />

          {/* メインコンテンツ */}
          <main className="flex-1 p-6 lg:p-8">
            <div className="max-w-[1200px] mx-auto">
              {/* タイトルとサブタイトル */}
              <header className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight">
                  {title || "Dev Tool Box"}
                </h1>
                {subtitle && (
                  <p
                    className={`mt-1 text-sm ${
                      mode === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {subtitle}
                  </p>
                )}
              </header>

              {/* コンテンツ */}
              <section
                className={`${
                  mode === "dark" ? "bg-white/3" : "bg-white/80"
                } rounded-xl p-6 shadow-xl`}
              >
                {children ?? (
                  <div
                    className={`py-20 text-center ${
                      mode === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <div className="text-lg font-semibold">
                      Select a tool from the left
                    </div>
                    <div className="mt-2 text-sm">
                      テキストカウンターやJSONツールなど、左のメニューから選べます。
                    </div>
                  </div>
                )}
              </section>
            </div>
          </main>

          {/* 下部フッター */}
          <Footer />
        </div>
      </div>
    </MuiThemeProvider>
  );
};

/**
 * BaseTemplate コンポーネント
 * アプリケーションの基本的なレイアウトを提供します
 * ThemeProvider でラップしてテーマ切り替え機能を提供
 */
const BaseTemplate: React.FC<BaseTemplateProps> = (props) => {
  return (
    <ThemeProvider>
      <BaseTemplateContent {...props} />
    </ThemeProvider>
  );
};

export default BaseTemplate;
