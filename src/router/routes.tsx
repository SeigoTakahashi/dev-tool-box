import type { ReactNode } from "react";
import HomePage from "../pages/HomePage";
import TextCounterPage from "../pages/text/TextCounterPage";
import LineEndingPage from "../pages/text/LineEndingPage";
import CaseConverterPage from "../pages/text/CaseConverterPage";
import TextDiffPage from "../pages/text/TextDiffPage";
import MarkdownPreviewPage from "../pages/text/MarkdownPreviewPage";
import JsonFormatterPage from "../pages/json/JsonFormatterPage";
import JsonValidatorPage from "../pages/json/JsonValidatorPage";
import JsonToCsvPage from "../pages/json/JsonToCsvPage";
import CsvToJsonPage from "../pages/json/CsvToJsonPage";
import UrlEncoderPage from "../pages/web/UrlEncoderPage";
import Base64EncoderPage from "../pages/web/Base64EncoderPage";
import RegexTesterPage from "../pages/web/RegexTesterPage";
import CronGeneratorPage from "../pages/web/CronGeneratorPage";
import HashGeneratorPage from "../pages/web/HashGeneratorPage";
import ColorConverterPage from "../pages/color/ColorConverterPage";
import PaletteGeneratorPage from "../pages/color/PaletteGeneratorPage";
import GradientPreviewPage from "../pages/color/GradientPreviewPage";
import ImageCompressorPage from "../pages/image/ImageCompressorPage";

// ルート定義の型
export type RouteConfig = {
  path: string;
  element: ReactNode;
  children?: RouteConfig[];
};

// テキストツール関連のルート定義
export const TEXT_ROUTES: RouteConfig[] = [
  {
    path: "/text/counter",
    element: <TextCounterPage />,
  },
  {
    path: "/text/line-ending",
    element: <LineEndingPage />,
  },
  {
    path: "/text/case-converter",
    element: <CaseConverterPage />,
  },
  {
    path: "/text/text-diff",
    element: <TextDiffPage />,
  },
  {
    path: "/text/markdown-preview",
    element: <MarkdownPreviewPage />,
  },
];

// JSONツール関連のルート定義
export const JSON_ROUTES: RouteConfig[] = [
  {
    path: "/json/formatter",
    element: <JsonFormatterPage />,
  },
  {
    path: "/json/validator",
    element: <JsonValidatorPage />,
  },
  {
    path: "/json/json-to-csv",
    element: <JsonToCsvPage />,
  },
  {
    path: "/json/csv-to-json",
    element: <CsvToJsonPage />,
  }
];

// Webツール関連のルート定義
export const WEB_ROUTES: RouteConfig[] = [
  {
    path: "/web/url-encoder",
    element: <UrlEncoderPage />,
  },
  {
    path: "/web/base64-encoder",
    element: <Base64EncoderPage />,
  },
  {
    path: "/web/regex-tester",
    element: <RegexTesterPage />,
  },
  {
    path: "/web/cron-generator",
    element: <CronGeneratorPage />,
  },
  {
    path: "/web/hash-generator",
    element: <HashGeneratorPage />,
  }
];

// Colorツール関連のルート定義
export const COLOR_ROUTES: RouteConfig[] = [
  {
    path: "/color/color-converter",
    element: <ColorConverterPage />,
  },
  {
    path: "/color/palette-generator",
    element: <PaletteGeneratorPage />,
  },
  {
    path: "/color/gradient-preview",
    element: <GradientPreviewPage />,
  }
];

// Imageツール関連のルート定義
export const IMAGE_ROUTES: RouteConfig[] = [
  {
    path: "/image/image-compressor",
    element: <ImageCompressorPage />,
  },
];

// 全ルート定義
export const ALL_ROUTES: RouteConfig[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  ...TEXT_ROUTES,
  ...JSON_ROUTES,
  ...WEB_ROUTES,
  ...COLOR_ROUTES,
  ...IMAGE_ROUTES,
];
