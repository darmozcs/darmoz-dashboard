import type { EmailTemplate } from "@/models";

export const MOCK_EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 1,
    code: "WELCOME",
    name: "Bienvenida",
    subject: "¡Bienvenido, ${name}!",
    bodyHtml: "<p>Hola ${name}, gracias por registrarte.</p>",
    bodyText: "Hola ${name}, gracias por registrarte.",
    active: true,
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-01-15T10:00:00Z",
  },
  {
    id: 2,
    code: "PASSWORD_RESET",
    name: "Restablecer contraseña",
    subject: "Restablecé tu contraseña",
    bodyHtml: "<p>Hacé click <a href=\"${link}\">acá</a> para restablecer tu contraseña.</p>",
    bodyText: null,
    active: true,
    createdAt: "2026-01-20T11:00:00Z",
    updatedAt: "2026-02-01T14:30:00Z",
  },
  {
    id: 3,
    code: "OLD_INVOICE",
    name: "Factura (deprecado)",
    subject: "Tu factura",
    bodyHtml: "<p>Adjuntamos tu factura.</p>",
    bodyText: null,
    active: false,
    createdAt: "2025-11-01T09:00:00Z",
    updatedAt: "2025-11-01T09:00:00Z",
  },
];
