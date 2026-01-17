import React, { useState } from "react";
import type { ReactNode } from "react";
import TopBar from "./TopBar";
import SideNav from "./SideNav";
import Footer from "./Footer";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { useTheme } from "../context/ThemeContext";

type BaseTemplateProps = {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
};

// ベーステンプレートコンポーネント
const BaseTemplate: React.FC<BaseTemplateProps> = ({
  title,
  subtitle,
  children,
}) => {
  // テーマコンテキストから現在のモードとテーマを取得
  const { theme } = useTheme();

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
    // MUIテーマプロバイダでラップすることでテーマを全体適用
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div className="min-h-screen flex">
        {/* サイドナビゲーション（デスクトップ/モバイル両対応）*/}
        <div className="hidden lg:block fixed left-0 top-0 bottom-0 z-50">
          <SideNav
            collapsed={collapsed}
            mobileOpen={mobileOpen}
            onClose={() => setMobileOpen(false)}
          />
        </div>

        {/* モバイル用サイドナビゲーション */}
        <div className="lg:hidden">
          <SideNav
            collapsed={collapsed}
            mobileOpen={mobileOpen}
            onClose={() => setMobileOpen(false)}
          />
        </div>

        <div
          className={`flex-1 flex flex-col ${
            !collapsed ? "lg:ml-80" : "lg:ml-0"
          }`}
        >
          {/* 上部トップバー */}
          <div className="sticky top-0 z-40 bg-inherit">
            <TopBar onMenuToggle={handleMenuToggle} />
          </div>

          {/* メインコンテンツ */}
          <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
            <div className="max-w-[1200px] mx-auto">
              {/* タイトルとサブタイトル */}
              {title || subtitle ? (
                <header className="mb-4">
                  <h1 className="text-2xl font-bold" style={{ color: theme.palette.text.primary }}>
                    {title || "Dev Tool Box"}
                  </h1>
                  <p className="mt-1 text-sm" style={{ color: theme.palette.text.secondary }}>
                    {subtitle}
                  </p>
                </header>
              ) : null}

              {/* コンテンツ */}
              <section className="rounded-xl shadow-xl">
                <div className="text-center py-3">
                  {children || "Select a tool from the navigation menu."}
                </div>
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

export default BaseTemplate;
