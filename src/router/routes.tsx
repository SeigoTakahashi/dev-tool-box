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

/**
 * ルート定義の型
 */
export type RouteConfig = {
  path: string;
  element: ReactNode;
  children?: RouteConfig[];
};

/**
 * グループ化されたルート定義
 * カテゴリ別にルートを管理
 */
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

export const WEB_ROUTES: RouteConfig[] = [
  {
    path: "/web/url-encoder",
    element: <UrlEncoderPage />,
  },
  {
    path: "/web/base64-encoder",
    element: <Base64EncoderPage />,
  }
];

/**
 * 全ルート定義
 */
export const ALL_ROUTES: RouteConfig[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  ...TEXT_ROUTES,
  ...JSON_ROUTES,
  ...WEB_ROUTES,
];
