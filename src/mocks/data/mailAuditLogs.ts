import type { MailAuditLog } from "@/models";

export const MOCK_MAIL_AUDIT_LOGS: MailAuditLog[] = [
  {
    id: 1,
    recipient: "maria.lopez@example.com",
    subject: "Recordatorio",
    sentAt: "2026-08-18T09:00:05Z",
    clientId: "f9e8d7c6-b5a4-4c3d-9e8f-1a2b3c4d5e6f",
    applicationName: "Darmoz App",
    scheduledEmailId: 2,
    accion: "SEND",
    resendable: true,
    createdAt: "2026-08-18T09:00:05Z",
  },
  {
    id: 2,
    recipient: "old.user@example.com",
    subject: "Factura",
    sentAt: "2025-11-02T10:00:00Z",
    clientId: "a1b2c3d4-e5f6-4a1b-8c2d-3e4f5a6b7c8d",
    applicationName: "Darmoz Mail",
    scheduledEmailId: null,
    accion: null,
    resendable: false,
    createdAt: "2025-11-02T10:00:00Z",
  },
];
