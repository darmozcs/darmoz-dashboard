import type { WaWeekDay } from "@/models";

export const WEEK_DAYS: WaWeekDay[] = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

export const DEFAULT_TIMEZONE = "America/Montevideo";
export const DEFAULT_OPEN_FROM = "09:00";
export const DEFAULT_OPEN_TO = "18:00";
export const DEFAULT_SESSION_TIMEOUT_MINUTES = 60;
export const WORKING_DAYS: WaWeekDay[] = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
];

export const BOT_DETAIL_TABS = {
  FLOWS: "flows",
  SETTINGS: "settings",
} as const;
