import { DAY_TO_CRON } from "../const";
import type { GenerateCronParams } from "../types";
import cron from 'cron-validate'

export type GenerateCronResult =
  | {
      ok: true;
      value: {
        cron: string;
        description: string;
      };
    }
  | {
      ok: false;
      error: string;
    };

// Cron式を生成するユーティリティ関数
export const generateCron = ({
  frequency,
  hour,
  minute,
  dayOfWeek,
  dayOfMonth,
  customCron,
}: GenerateCronParams): GenerateCronResult => {
  try {
    switch (frequency) {
      // 毎分
      case "every-minute": {
        return {
          ok: true,
          value: {
            cron: "* * * * *",
            description: "毎分実行されます",
          },
        };
      }

      // 毎時
      case "hourly": {
        if (minute < 0 || minute > 59) {
          return { ok: false, error: "分は0〜59で指定してください" };
        }

        return {
          ok: true,
          value: {
            cron: `${minute} * * * *`,
            description: `毎時 ${minute}分に実行されます`,
          },
        };
      }

      // 毎日
      case "daily": {
        return {
          ok: true,
          value: {
            cron: `${minute} ${hour} * * *`,
            description: `毎日 ${hour.toString().padStart(2, "0")}:${minute
              .toString()
              .padStart(2, "0")} に実行されます`,
          },
        };
      }

      // 毎週
      case "weekly": {
        const selectedDays = Object.entries(dayOfWeek)
          .filter(([, checked]) => checked)
          .map(([day]) => DAY_TO_CRON[day]);

        if (selectedDays.length === 0) {
          return { ok: false, error: "曜日を1つ以上選択してください" };
        }

        const cronDays = selectedDays.join(",");

        return {
          ok: true,
          value: {
            cron: `${minute} ${hour} * * ${cronDays}`,
            description: `毎週 指定曜日の ${hour
              .toString()
              .padStart(2, "0")}:${minute
              .toString()
              .padStart(2, "0")} に実行されます`,
          },
        };
      }

      // 毎月
      case "monthly": {
        if (dayOfMonth < 1 || dayOfMonth > 31) {
          return { ok: false, error: "日は1〜31で指定してください" };
        }

        return {
          ok: true,
          value: {
            cron: `${minute} ${hour} ${dayOfMonth} * *`,
            description: `毎月 ${dayOfMonth}日 ${hour
              .toString()
              .padStart(2, "0")}:${minute
              .toString()
              .padStart(2, "0")} に実行されます`,
          },
        };
      }

      // カスタム
      case "custom": {
        if (!customCron) {
          return { ok: false, error: "Cron式を入力してください" };
        }

        if (!validateCustomCron(customCron)) {
          return { ok: false, error: "無効なCron式です" };
        }

        return {
          ok: true,
          value: {
            cron: customCron,
            description: "カスタムCron式が設定されています",
          },
        };
      }

      default:
        return { ok: false, error: "不明な実行頻度です" };
    }
  } catch {
    return { ok: false, error: "Cron式の生成に失敗しました" };
  }
};

// カスタムCron式を検証するユーティリティ関数
export const validateCustomCron = (cronStr: string) => {

  const result = cron(cronStr, { preset: "default" });

  return result.isValid();
};
