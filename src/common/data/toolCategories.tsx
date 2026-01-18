import type { ReactNode } from "react";

import TextFieldsIcon from "@mui/icons-material/TextFields";
import DescriptionIcon from "@mui/icons-material/Description";
import LanguageIcon from "@mui/icons-material/Language";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import ImageIcon from "@mui/icons-material/Image";
import HomeIcon from "@mui/icons-material/Home";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import CodeIcon from "@mui/icons-material/Code";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StorageIcon from "@mui/icons-material/Storage";
import HttpIcon from "@mui/icons-material/Http";
import ScheduleIcon from "@mui/icons-material/Schedule";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import PaletteIcon from "@mui/icons-material/Palette";
import GradientIcon from "@mui/icons-material/Gradient";
import CompressIcon from "@mui/icons-material/Compress";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import SwapCallsIcon from "@mui/icons-material/SwapCalls";
import GppGoodIcon from "@mui/icons-material/GppGood";

export type Tool = {
  id: string;
  label: string;
  icon: ReactNode;
  path?: string;
};

export type ToolCategory = {
  id: string;
  label: string;
  icon: ReactNode;
  tools: Tool[];
};

// ツールカテゴリとそのツール一覧の定義
export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: "text",
    label: "Text",
    icon: <TextFieldsIcon />,
    tools: [
      {
        id: "text-counter",
        label: "テキストカウンター",
        icon: <CodeIcon />,
        path: "/text/counter",
      },
      {
        id: "line-ending",
        label: "改行コード変換",
        icon: <ContentCopyIcon />,
        path: "/text/line-ending",
      },
      {
        id: "case-converter",
        label: "命名規則変換",
        icon: <AutoFixHighIcon />,
        path: "/text/case-converter",
      },
      {
        id: "text-diff",
        label: "テキスト比較",
        icon: <CompareArrowsIcon />,
        path: "/text/text-diff",
      },
      {
        id: "markdown-preview",
        label: "Markdownプレビュー",
        icon: <VisibilityIcon />,
        path: "/text/markdown-preview",
      },
    ],
  },
  {
    id: "json",
    label: "JSON",
    icon: <DescriptionIcon />,
    tools: [
      {
        id: "json-formatter",
        label: "JSONフォーマッタ",
        icon: <CodeIcon />,
        path: "/json/formatter",
      },
      {
        id: "json-validator",
        label: "JSONバリデータ",
        icon: <CheckCircleIcon />,
        path: "/json/validator",
      },
      {
        id: "json-to-csv",
        label: "JSON → CSV 変換",
        icon: <StorageIcon />,
        path: "/json/json-to-csv",
      },
      {
        id: "csv-to-json",
        label: "CSV → JSON 変換",
        icon: <StorageIcon />,
        path: "/json/csv-to-json",
      },
    ],
  },
  {
    id: "web",
    label: "Web",
    icon: <LanguageIcon />,
    tools: [
      {
        id: "url-encoder",
        label: "URLエンコード・デコード",
        icon: <HttpIcon />,
        path: "/web/url-encoder",
      },
      {
        id: "base64-encoder",
        label: "Base64エンコード・デコード",
        icon: <ContentCopyIcon />,
        path: "/web/base64-encoder",
      },
      {
        id: "regex-tester",
        label: "正規表現テスター",
        icon: <CodeIcon />,
        path: "/web/regex-tester",
      },
      {
        id: "cron-generator",
        label: "Cron式ジェネレーター",
        icon: <ScheduleIcon />,
        path: "/web/cron-generator",
      },
      {
        id: "hash-generator",
        label: "ハッシュ生成器",
        icon: <FingerprintIcon />,
        path: "/web/hash-generator",
      },
    ],
  },
  {
    id: "color",
    label: "Color",
    icon: <ColorLensIcon />,
    tools: [
      {
        id: "color-converter",
        label: "カラーコード変換",
        icon: <PaletteIcon />,
        path: "/color/color-converter",
      },
      {
        id: "palette-generator",
        label: "カラーパレット生成",
        icon: <ColorLensIcon />,
        path: "/color/palette-generator",
      },
      {
        id: "gradient-preview",
        label: "グラデーションプレビュー",
        icon: <GradientIcon />,
        path: "/color/gradient-preview",
      },
    ],
  },
  {
    id: "image",
    label: "Image",
    icon: <ImageIcon />,
    tools: [
      {
        id: "image-compressor",
        label: "画像圧縮",
        icon: <CompressIcon />,
        path: "/image/image-compressor",
      },
      {
        id: "favicon-generator",
        label: "Favicon生成",
        icon: <ImageIcon />,
        path: "/image/favicon-generator",
      },
      {
        id: "background-remover",
        label: "背景除去",
        icon: <ImageSearchIcon />,
        path: "/image/background-remover",
      },
    ],
  },
  {
    id: "utility",
    label: "Utility",
    icon: <HomeIcon />,
    tools: [
      { id: "qr-code", label: "QRコード生成", icon: <QrCode2Icon /> },
      { id: "unit-converter", label: "単位変換", icon: <SwapCallsIcon /> },
      { id: "random-generator", label: "ランダム生成", icon: <TouchAppIcon /> },
      {
        id: "password-checker",
        label: "パスワード強度チェッカー",
        icon: <GppGoodIcon />,
      },
    ],
  },
];
