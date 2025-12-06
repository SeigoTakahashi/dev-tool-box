import React, { useState } from "react";
import type { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import TopBar from "./TopBar";
import SideNav from "./SideNav";
import Footer from "./Footer";

type BaseTemplateProps = {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
};

// ダークテーマの定義
const dark = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#7c3aed" },
    background: { default: "#070812", paper: "#0f1724" },
  },
  typography: { fontFamily: "Inter, Roboto, Helvetica, Arial, sans-serif" },
});

/*
 * BaseTemplate コンポーネント
 * アプリケーションの基本的なレイアウトを提供します
 * - 左サイドナビゲーション
 * - 上部トップバー
 * - メインコンテンツエリア
 * - 下部フッター
 */
const BaseTemplate: React.FC<BaseTemplateProps> = ({
  title,
  subtitle,
  children,
}) => {
  // サイドナビゲーションの折りたたみ状態
  const [collapsed, setCollapsed] = useState(false);

  // モバイルでのナビゲーション開閉状態
  const [mobileOpen, setMobileOpen] = useState(false);

  // モバイルメニュー開閉ハンドラ
  const handleMenuToggle = () => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
    if (isMobile) {
      setMobileOpen((prev) => !prev);
    } else {
      setCollapsed((prev) => !prev);
    }
  };

  return (
    <ThemeProvider theme={dark}>
      <div className="min-h-screen flex bg-linear-to-b from-[#05060a] via-[#071028] to-[#071428] text-gray-200">
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
                  <p className="mt-1 text-sm text-gray-400">{subtitle}</p>
                )}
              </header>

              {/* コンテンツ */}
              <section className="bg-white/3 rounded-xl p-6 shadow-xl">
                {children ?? (
                  <div className="py-20 text-center text-gray-300">
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
    </ThemeProvider>
  );
};

export default BaseTemplate;
