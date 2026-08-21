import type { AuditAction } from "@/models";

export const AUDIT_ACTIONS: AuditAction[] = [
  "LOGIN",
  "LOGOUT",
  "REGISTER",
  "REFRESH",
  "VERIFY",
  "DISABLE",
  "REQUEST_EMAIL_VERIFICATION",
  "CONFIRM_EMAIL_VERIFICATION",
];
