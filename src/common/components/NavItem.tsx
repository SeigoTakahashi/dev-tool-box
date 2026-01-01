import React from "react";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

type NavItemProps = {
  label: string;
  icon: ReactNode;
  active?: boolean;
  collapsible?: boolean; // 折りたたみ可能かどうか
  expanded?: boolean; // 折りたたみが展開中かどうか
  onToggleExpand?: () => void; // 折りたたみ展開切替時のコールバック
  level?: number; // ネストレベル（インデント調整用）
  path?: string; // ナビゲーション先のパス
};

// ナビゲーション項目コンポーネント
const NavItem: React.FC<NavItemProps> = ({
  label,
  icon,
  active,
  collapsible,
  expanded,
  onToggleExpand,
  level = 0,
  path,
}) => {
  // ルーティング用ナビゲート関数
  const navigate = useNavigate();

  // ネストレベルに応じたインデント調整
  const paddingLeft = level > 0 ? `pl-${4 + level * 2}` : "pl-0";

  // クリック時の挙動を定義
  const handleClick = () => {
    // 折りたたみ可能な場合は展開状態を切り替え
    if (collapsible) {
      onToggleExpand?.();
    } else if (path) {
      navigate(path);
    }
  };

  return (
    // ナビゲーション項目のボタン
    <ListItemButton
      onClick={handleClick}
      className={`rounded-md my-1 ${paddingLeft} transition-colors ${
        active
          ? "bg-white/10 text-white font-semibold"
          : "text-gray-300 hover:bg-white/5"
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
