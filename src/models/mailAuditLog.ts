export interface MailAuditLog {
  id: number;
  recipient: string;
  subject: string;
  sentAt: string;
  clientId: string;
  applicationName: string;
  scheduledEmailId: number | null;
  accion: string | null;
  resendable: boolean;
  createdAt: string;
}
