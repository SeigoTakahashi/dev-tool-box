import React from "react";
import type { ReactNode } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

type NavItemProps = {
  /** ナビゲーション項目のラベル */
  label: string;
  /** ナビゲーション項目のアイコン */
  icon: ReactNode;
  /** 現在のアイテムがアクティブか */
  active?: boolean;
};

/**
 * NavItem コンポーネント
 * サイドナビゲーションの1つの項目を表現します
 * 状態に応じてスタイルが自動的に変わります
 */
const NavItem: React.FC<NavItemProps> = ({ label, icon, active }) => {
  return (
    <ListItemButton
      className={`rounded-md my-1 ${
        active ? "bg-white/6" : "hover:bg-white/3"
      }`}
    >
      <ListItemIcon className="min-w-10 text-gray-300">{icon}</ListItemIcon>
      <ListItemText
        primary={label}
        primaryTypographyProps={{ fontSize: 14 }}
      />
    </ListItemButton>
  );
};

export default NavItem;
