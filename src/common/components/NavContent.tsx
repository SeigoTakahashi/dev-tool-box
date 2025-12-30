import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

import NavItem from "./NavItem";
import { TOOL_CATEGORIES } from "../data/toolCategories.tsx";
import { useTheme } from "../context/ThemeContext";

type NavContentProps = {
  collapsed: boolean; // サイドナビゲーションが折りたたまれているかどうか
};

// ナビゲーションコンテンツコンポーネント
const NavContent: React.FC<NavContentProps> = ({ collapsed }) => {
  // テーマコンテキストから現在のモードを取得
  const { mode } = useTheme();

  // ルーティング用ナビゲート関数
  const navigate = useNavigate();

  // アコーディオンの展開状態を管理
  // キー: カテゴリID、値: 展開中かどうか
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({
    text: true, // デフォルトで最初のカテゴリは展開状態
  });

  // カテゴリの展開状態を切り替える関数
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  // ロゴクリック時にホームへ遷移
  const handleTitleClick = () => {
    navigate("/");
  };

  return (
    <aside
      className={`flex flex-col ${
        collapsed ? "w-0" : "w-80"
      } h-screen p-3 overflow-y-auto`}
    >
      {/* ロゴ部分 */}
      <div
        className="flex items-center gap-3 mb-4 px-1"
        onClick={handleTitleClick}
        style={{ cursor: "pointer" }}
      >
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
          <img src="/dev-icon.svg" alt="Dev Tool Box" className="w-8 h-8" />
        </div>
        {/* 非折り畳み時のみアプリ情報を表示 */}
        {!collapsed && (
          <div>
            <div className="text-sm font-semibold">Dev Tool Box</div>
            <div className="text-xs">Handy dev utilities</div>
          </div>
        )}
      </div>

      <Divider className="my-2" />

      {/* ナビゲーション項目リスト（アコーディオン形式） */}
      <nav className="flex-1">
        <List className="p-0 pr-1 whitespace-normal">
          {TOOL_CATEGORIES.map((category) => (
            <div key={category.id}>
              {/* カテゴリヘッダー（折りたたみボタン） */}
              <NavItem
                label={collapsed ? "" : category.label}
                icon={category.icon}
                collapsible={!collapsed}
                expanded={expandedCategories[category.id]}
                onToggleExpand={() => toggleCategory(category.id)}
              />

              {/* カテゴリが展開中かつ非折り畳み時のみ、ツール項目を表示 */}
              {expandedCategories[category.id] && !collapsed && (
                <div>
                  {category.tools.map((tool) => (
                    <NavItem
                      key={tool.id}
                      label={tool.label}
                      icon={tool.icon}
                      level={1}
                      path={tool.path}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </List>
      </nav>

      <Divider className="my-2" />

      {/* フッター情報 */}
      <div className="text-xs px-1">
        <div className="mb-1">{mode === "dark" ? "Dark" : "Light"} Mode</div>
      </div>
    </aside>
  );
};

export default NavContent;
