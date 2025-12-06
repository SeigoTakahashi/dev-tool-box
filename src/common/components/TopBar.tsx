import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

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
 * - 通知・設定ボタン
 * - ユーザーアバター
 * - ダークモード切替スイッチ
 */
const TopBar: React.FC<TopBarProps> = ({ onMenuToggle, title }) => {
  const [query] = useState("");

  return (
    <AppBar position="static" color="transparent" elevation={0}>
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
        <div className="flex items-center gap-3">
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            {title || "Dev Tool Box"}
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
        <div className="hidden sm:flex items-center gap-3 bg-white/5 px-3 py-1 rounded-md">
          <SearchIcon className="text-gray-300" />
          <InputBase
            placeholder="Search tools..."
            value={query}
            inputProps={{ "aria-label": "search" }}
            className="text-sm text-gray-200"
            sx={{ ml: 1 }}
          />
        </div>

        {/* ダークモードスイッチとアイコン */}
        <div className="flex items-center gap-3 ml-2">
          <Switch checked={true} color="primary" />
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <img src="/dev-icon.svg" alt="Dev Tool Box" className="w-6 h-6" />
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
