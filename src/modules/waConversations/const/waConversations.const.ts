import type { WaConversationStatus, WaMessageStatus } from "@/models";

export const CONVERSATION_STATUSES: WaConversationStatus[] = [
  "ACTIVE",
  "HANDOFF",
  "CLOSED",
];

export const STATUS_COLORS: Record<WaConversationStatus, string> = {
  ACTIVE: "green",
  HANDOFF: "orange",
  CLOSED: "gray",
};

export const MESSAGE_STATUS_COLORS: Record<WaMessageStatus, string> = {
  RECEIVED: "blue",
  SENT: "gray",
  DELIVERED: "teal",
  READ: "green",
  FAILED: "red",
};

export const PAGE_SIZE = 15;
export const DATE_FORMAT = "DD/MM/YYYY HH:mm";
