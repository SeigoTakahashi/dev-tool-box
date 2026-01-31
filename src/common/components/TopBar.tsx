import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import { useTheme } from "../context/ThemeContext";

import { TOOL_CATEGORIES } from "../data/toolCategories";

type TopBarProps = {
  title?: string;
  onMenuToggle: () => void;
};

// トップバーコンポーネント
const TopBar: React.FC<TopBarProps> = ({ onMenuToggle }) => {
  // ルーティング用ナビゲート関数
  const navigate = useNavigate();

  // テーマコンテキストから現在のモードと切替関数を取得
  const { mode, toggleTheme } = useTheme();

  // 検索クエリの状態管理
  const [query, setQuery] = useState("");

  // タイトルクリック時にホームへ遷移
  const handleTitleClick = () => {
    navigate("/");
  };

  // 検索クエリから機能候補をフィルタリング
  const filteredTools = TOOL_CATEGORIES.flatMap((category) =>
    category.tools.filter((tool) =>
      tool.label.toLowerCase().includes(query.toLowerCase()),
    ),
  );

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        zIndex: 1000,
        backgroundColor: mode === "dark" ? "#121212" : "#f5f5f5",
        borderBottom:
          mode === "dark" ? "1px solid #333333" : "1px solid #e0e0e0",
      }}
    >
      <Toolbar className="px-4 lg:px-6">
        {/* メニュー開閉ボタン */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuToggle}
          size="large"
        >
          <MenuIcon />
        </IconButton>

        {/* タイトル部分 */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={handleTitleClick}
        >
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            Dev Tool Box
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="hidden sm:block"
          >
            — utilities for developers
          </Typography>
        </div>

        <Box className="flex-1" />

        {/* 検索バー */}
        <div
          className={`
    hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all relative w-full max-w-md mx-auto
    ${
      mode === "dark"
        ? "bg-[#1e1e1e] border-gray-700 focus-within:ring-gray-900 focus-within:border-gray-500"
        : "bg-gray-50 border-gray-200 focus-within:bg-white focus-within:ring-gray-100 focus-within:border-gray-400"
    }
  `}
        >
          <SearchIcon
            className={mode === "dark" ? "text-gray-500" : "text-gray-400"}
          />

          <InputBase
            placeholder="Search tools..."
            value={query}
            fullWidth
            onChange={(e) => setQuery(e.target.value)}
            // MUIのsxで文字色を制御
            sx={{
              ml: 1,
              fontSize: "0.875rem",
              color: mode === "dark" ? "#ffffff" : "#000000",
              "& input::placeholder": {
                color: mode === "dark" ? "#888" : "#aaa",
                opacity: 1,
              },
            }}
          />

          {/* 検索結果ドロップダウン */}
          {query && (
            <div
              className={`
        absolute top-[calc(100%+8px)] left-0 right-0 border shadow-2xl rounded-xl py-2 max-h-[300px] overflow-y-auto z-50
        ${
          mode === "dark"
            ? "bg-[#252526] border-gray-700 shadow-black"
            : "bg-white border-gray-100 shadow-gray-200"
        }
      `}
            >
              {filteredTools.length > 0 ? (
                filteredTools.map((tool) => (
                  <div
                    key={tool.id}
                    className={`
              px-4 py-2.5 flex items-center gap-3 cursor-pointer transition-colors tool-card
              ${
                mode === "dark"
                  ? "hover:bg-[#37373d] text-gray-200"
                  : "hover:bg-gray-50 text-gray-700"
              }
            `}
                    onClick={() => {
                      navigate(tool.path || "/");
                      setQuery("");
                    }}
                  >
                    <span
                      className={
                        mode === "dark" ? "text-gray-400" : "text-gray-400"
                      }
                    >
                      {tool.icon}
                    </span>
                    <span className="font-medium text-sm">{tool.label}</span>
                  </div>
                ))
              ) : (
                <div
                  className={`px-4 py-3 text-sm text-center ${mode === "dark" ? "text-gray-500" : "text-gray-400"}`}
                >
                  No results for "<strong>{query}</strong>"
                </div>
              )}
            </div>
          )}
        </div>

        {/* ダークモード切替スイッチとアイコン */}
        <div className="flex items-center gap-3 ml-2">
          <Tooltip title={mode === "dark" ? "Light Mode" : "Dark Mode"}>
            <div className="flex items-center gap-1">
              {mode === "dark" ? (
                <LightModeIcon fontSize="small" className="text-gray-400" />
              ) : (
                <DarkModeIcon fontSize="small" className="text-gray-600" />
              )}
              <Switch
                checked={mode === "dark"}
                onChange={toggleTheme}
                color="primary"
              />
            </div>
          </Tooltip>
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <img src="/dev-icon.svg" alt="Dev Tool Box" className="w-6 h-6" />
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
