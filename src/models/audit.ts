export type AuditAction =
  | "LOGIN"
  | "LOGOUT"
  | "REGISTER"
  | "REFRESH"
  | "VERIFY"
  | "DISABLE"
  | "REQUEST_EMAIL_VERIFICATION"
  | "CONFIRM_EMAIL_VERIFICATION";

export type AuditResult = "SUCCESS" | "FAILURE";

export interface AuditLog {
  id: string;
  action: AuditAction;
  result: AuditResult;
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
