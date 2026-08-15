export interface AuditLog {
  id: string;
  action: string;
  result: string;
  occurredAt: string;
  applicationId: string;
  applicationName: string;
  userEmail: string;
  failureReason: string | null;
  origin: string;
  host: string;
  userAgent: string;
  referer: string;
}
