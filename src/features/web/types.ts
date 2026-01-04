export type Frequency =
  | "every-minute"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "custom";

export type GenerateCronParams = {
  frequency: Frequency;
  hour: number;
  minute: number;
  dayOfWeek: Record<string, boolean>;
  dayOfMonth: number;
  customCron?: string;
};