import React from "react";
import { useTheme } from "../context/ThemeContext";

import NavContent from "./NavContent";

type SideNavProps = {
  collapsed: boolean;
  mobileOpen?: boolean;
  onClose?: () => void;
};

// サイドナビゲーションコンポーネント
const SideNav: React.FC<SideNavProps> = ({
  collapsed,
  mobileOpen = false,
  onClose,
}) => {
  const { theme } = useTheme();
  return (
    <>
      {/* デスクトップ用サイドナビ（固定位置） */}
      <div
        className={`hidden lg:flex fixed left-0 top-0 bottom-0 z-1010 ${
          collapsed ? "w-0" : "w-80"
        } ${
          collapsed ? "border-none" : "border-r border-white/6"
        } bg-transparent transition-all duration-200 overflow-hidden`}
      >
        <NavContent collapsed={collapsed} />
      </div>

      {/* モバイル用オフキャンバスサイドナビ */}
      <div
        className={`lg:hidden fixed inset-0 z-1050 transition-opacity duration-200 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* 背景の半透明オーバーレイ */}
        <div
          className="absolute inset-0 bg-black/60"
          onClick={onClose}
          role="presentation"
        />

        {/* スライドインパネル */}
        <div
          className={`absolute inset-y-0 left-0 w-80 transform transition-transform duration-200 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ backgroundColor: theme.palette.background.default }}
        >
          <NavContent collapsed={false} />
        </div>
      </div>
    </>
  );
};

export default SideNav;
