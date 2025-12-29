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


type TopBarProps = {
  /** トップバーのタイトル（表示がない場合はデフォルト "Dev Tool Box"） */
  title?: string;
  /** メニュー開閉時のコールバック関数 */
  onMenuToggle: () => void;
};

/**
 * TopBar コンポーネント
 * アプリケーションのヘッダーバーを提供します
 * - タイトル表示
 * - 検索入力欄
 * - ダークモード切替スイッチ
 * - アプリアイコン
 */
const TopBar: React.FC<TopBarProps> = ({ onMenuToggle }) => {
  // ルーティング用ナビゲート関数
  const navigate = useNavigate();

  // テーマコンテキストから現在のモードと切替関数を取得
  const { mode, toggleTheme } = useTheme();

  // 検索クエリの状態管理
  const [query] = useState("");

  // タイトルクリック時にホームへ遷移
  const handleTitleClick = () => {
    navigate("/");
  };

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ zIndex: 1000 }}>
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

        {/* 検索入力欄（小画面では非表示） */}
        <div
          className={`hidden sm:flex items-center gap-3 px-3 py-1 rounded-md`}
        >
          <SearchIcon
          />
          <InputBase
            placeholder="Search tools..."
            value={query}
            inputProps={{ "aria-label": "search" }}
            className="text-sm"
            sx={{ ml: 1 }}
          />
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
