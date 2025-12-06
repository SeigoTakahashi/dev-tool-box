import React from "react";
import type { ReactNode } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

type NavItemProps = {
  /** ナビゲーション項目のラベル */
  label: string;
  /** ナビゲーション項目のアイコン */
  icon: ReactNode;
  /** 現在のアイテムがアクティブか */
  active?: boolean;
  /** 折りたたみ可能か（子要素を持つかどうか） */
  collapsible?: boolean;
  /** 展開状態（collapsible が true の場合に使用） */
  expanded?: boolean;
  /** 展開状態の変更時のコールバック */
  onToggleExpand?: () => void;
  /** ネストレベル（インデント用） */
  level?: number;
};

/**
 * NavItem コンポーネント
 * サイドナビゲーションの1つの項目を表現します
 * カテゴリとして使用する場合はアコーディオン機能が有効になります
 */
const NavItem: React.FC<NavItemProps> = ({
  label,
  icon,
  active,
  collapsible,
  expanded,
  onToggleExpand,
  level = 0,
}) => {
  // ネストレベルに応じたインデント調整
  const paddingLeft = level > 0 ? `pl-${4 + level * 2}` : "pl-0";

  return (
    // ナビゲーション項目のボタン
    <ListItemButton
      onClick={collapsible ? onToggleExpand : undefined}
      className={`rounded-md my-1 ${paddingLeft} ${
        active ? "bg-white/6" : "hover:bg-white/3"
      }`}
      sx={{ pl: level > 0 ? `${1 + level * 1.5}rem` : undefined }}
    >
      {/* アイコン部分 */}
      <ListItemIcon className="min-w-10 text-gray-300">{icon}</ListItemIcon>

      {/* ラベル部分 */}
      <ListItemText
        primary={label}
        primaryTypographyProps={{ fontSize: level > 0 ? 13 : 14 }}
      />
      {/* 折りたたみアイコン部分 */}
      {collapsible && (
        <div className="text-gray-400 ml-auto">
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </div>
      )}
    </ListItemButton>
  );
};

export default NavItem;
