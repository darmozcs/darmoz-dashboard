import type { WaMessageDirection, WaMessageStatus } from "@/models";

export const MESSAGE_DIRECTIONS: WaMessageDirection[] = ["IN", "OUT"];

export const MESSAGE_STATUSES: WaMessageStatus[] = [
  "RECEIVED",
  "SENT",
  "DELIVERED",
  "READ",
  "FAILED",
];

export const DIRECTION_COLORS: Record<WaMessageDirection, string> = {
  IN: "blue",
  OUT: "grape",
};

export const PAGE_SIZE = 20;
export const DATE_FORMAT = "DD/MM/YYYY HH:mm:ss";
