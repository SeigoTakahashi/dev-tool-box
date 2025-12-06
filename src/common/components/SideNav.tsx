import React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

import TextFieldsIcon from "@mui/icons-material/TextFields";
import DescriptionIcon from "@mui/icons-material/Description";
import LanguageIcon from "@mui/icons-material/Language";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import ImageIcon from "@mui/icons-material/Image";
import QrCode2Icon from "@mui/icons-material/QrCode2";

import NavItem from "./NavItem";

type SideNavProps = {
  /** ナビゲーションが折りたたまれているか */
  collapsed: boolean;
};

/** ナビゲーション項目の定義 */
const NAV_ITEMS = [
  { key: "text", label: "Text", icon: <TextFieldsIcon /> },
  { key: "json", label: "JSON", icon: <DescriptionIcon /> },
  { key: "web", label: "Web", icon: <LanguageIcon /> },
  { key: "color", label: "Color", icon: <ColorLensIcon /> },
  { key: "image", label: "Image", icon: <ImageIcon /> },
  { key: "utility", label: "Utility", icon: <QrCode2Icon /> },
];

/**
 * SideNav コンポーネント
 * アプリケーションの左サイドナビゲーションを提供します
 * - ロゴとアプリ名（非折り畳み時）
 * - 機能カテゴリのメニュー
 * - テーマ・バージョン情報（フッター部分）
 */
const SideNav: React.FC<SideNavProps> = ({ collapsed }) => {
  return (
    <aside
      className={`flex flex-col ${
        collapsed ? "w-16" : "w-64"
      } h-full p-3`}
    >
      {/* ロゴ部分 */}
      <div className="flex items-center gap-3 mb-4 px-1">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
          <img src="/dev-icon.svg" alt="Dev Tool Box" className="w-8 h-8" />
        </div>
        {/* 非折り畳み時のみアプリ情報を表示 */}
        {!collapsed && (
          <div>
            <div className="text-sm font-semibold">Dev Tool Box</div>
            <div className="text-xs text-gray-400">Handy dev utilities</div>
          </div>
        )}
      </div>

      <Divider className="my-2 border-white/6" />

      {/* ナビゲーション項目リスト */}
      <nav className="flex-1 overflow-auto">
        <List>
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.key}
              label={item.label}
              icon={item.icon}
              active={item.key === "text"}
            />
          ))}
        </List>
      </nav>

      <Divider className="my-2 border-white/6" />

      {/* フッター情報 */}
      <div className="text-xs text-gray-400 px-1">
        <div className="mb-1">Theme • Dark</div>
      </div>
    </aside>
  );
};

export default SideNav;
