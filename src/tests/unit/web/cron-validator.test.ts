import { describe, it, expect } from "vitest";
import { validateCustomCron } from "../../../features/web/utils/cron-generator";

// Cron式バリデーション関数のユニットテスト
describe("validateCustomCron", () => {
  it("有効なCron式の場合はtrueを返す", () => {
    const cron = "0 0 * * *";

    const result = validateCustomCron(cron);

    expect(result).toBe(true);
  });

  it("無効なCron式の場合はfalseを返す", () => {
    const cron = "invalid cron";

    const result = validateCustomCron(cron);

    expect(result).toBe(false);
  });

  it("空文字の場合はfalseを返す", () => {
    const cron = "";

    const result = validateCustomCron(cron);

    expect(result).toBe(false);
  });
});