import { describe, it, expect } from "vitest";
import { generateCron } from "../../../features/web/utils/cron-generator";
import type { GenerateCronParams } from "../../../features/web/types";

// Cron式生成関数のユニットテスト
describe("generateCron", () => {
  it("毎分のCron式を生成できる", () => {
    const params = {
      frequency: "every-minute",
      hour: 0,
      minute: 0,
      dayOfWeek: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: true,
      },
      dayOfMonth: 1,
      customCron: "",
    } as GenerateCronParams;
    const result = generateCron(params);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.cron).toBe("* * * * *");
    }
  });
  it("毎時のCron式を生成できる", () => {
    const params = {
      frequency: "hourly",
      hour: 0,
      minute: 15,
      dayOfWeek: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: true,
      },
      dayOfMonth: 1,
      customCron: "",
    } as GenerateCronParams;
    const result = generateCron(params);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.cron).toBe("15 * * * *");
    }
  });

  it("無効な分でエラーを返す", () => {
    const params = {
      frequency: "hourly",
      hour: 0,
      minute: 75,
      dayOfWeek: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: true,
      },
      dayOfMonth: 1,
      customCron: "",
    } as GenerateCronParams;
    const result = generateCron(params);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(typeof result.error).toBe("string");
      expect(result.error.length).toBeGreaterThan(0);
    }
  });

  it("毎日のCron式を生成できる", () => {
    const params = {
      frequency: "daily",
      hour: 6,
      minute: 30,
      dayOfWeek: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: true,
      },
      dayOfMonth: 1,
      customCron: "",
    } as GenerateCronParams;
    const result = generateCron(params);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.cron).toBe("30 6 * * *");
    }
  });

  it("毎週のCron式を生成できる", () => {
    const params = {
      frequency: "weekly",
      hour: 9,
      minute: 0,
      dayOfWeek: {
        monday: true,
        tuesday: false,
        wednesday: true,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      dayOfMonth: 1,
      customCron: "",
    } as GenerateCronParams;
    const result = generateCron(params);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.cron).toBe("0 9 * * 1,3");
    }
  });

  it("無効な曜日設定でエラーを返す", () => {
    const params = {
      frequency: "weekly",
      hour: 9,
      minute: 0,
      dayOfWeek: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      dayOfMonth: 1,
      customCron: "",
    } as GenerateCronParams;
    const result = generateCron(params);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(typeof result.error).toBe("string");
      expect(result.error.length).toBeGreaterThan(0);
    }
  });

  it("毎月のCron式を生成できる", () => {
    const params = {
      frequency: "monthly",
      hour: 12,
      minute: 45,
      dayOfWeek: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      dayOfMonth: 15,
      customCron: "",
    } as GenerateCronParams;
    const result = generateCron(params);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.cron).toBe("45 12 15 * *");
    }
  });

  it("無効な日付でエラーを返す", () => {
    const params = {
      frequency: "monthly",
      hour: 12,
      minute: 45,
      dayOfWeek: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      dayOfMonth: 32,
      customCron: "",
    } as GenerateCronParams;
    const result = generateCron(params);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(typeof result.error).toBe("string");
      expect(result.error.length).toBeGreaterThan(0);
    }
  });

  it("カスタムCron式を受け付ける", () => {
    const params = {
      frequency: "custom",
      hour: 0,
      minute: 0,
      dayOfWeek: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      dayOfMonth: 1,
      customCron: "0 0 * * 0",
    } as GenerateCronParams;
    const result = generateCron(params);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.cron).toBe("0 0 * * 0");
    }
  });

  it("無効なカスタムCron式でエラーを返す", () => {
    const params = {
      frequency: "custom",
      hour: 0,
      minute: 0,
      dayOfWeek: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      dayOfMonth: 1,
      customCron: "invalid cron",
    } as GenerateCronParams;
    const result = generateCron(params);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(typeof result.error).toBe("string");
      expect(result.error.length).toBeGreaterThan(0);
    }
  });
});
