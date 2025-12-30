import { expect } from "vitest";
// @testing-library/jest-dom v6は、環境によってエクスポート形式が異なるため正規化
import matchersModule from "@testing-library/jest-dom/matchers";

const matchers =
  matchersModule && matchersModule.default
    ? matchersModule.default
    : matchersModule;

// ガード: matchersがオブジェクトでなければ拡張をスキップ
if (matchers && typeof matchers === "object") {
  expect.extend(matchers);
}