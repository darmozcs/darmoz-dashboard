export type ScheduledEmailStatus =
  | "PENDING"
  | "PROCESSING"
  | "SENT"
  | "FAILED"
  | "CANCELLED";

export interface ScheduledEmail {
  id: number;
  recipient: string;
  subject: string | null;
  templateCode: string | null;
  variables: Record<string, string>;
  bodyOverride: string | null;
  scheduledAt: string;
  status: ScheduledEmailStatus;
  attempts: number;
  lastError: string | null;
  sentAt: string | null;
  clientId: string;
  createdAt: string;
  updatedAt: string;
}
