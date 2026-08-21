import type { MailClientApplication } from "@/models";

export const MOCK_MAIL_CLIENT_APPLICATIONS: MailClientApplication[] = [
  {
    id: "a1b2c3d4-e5f6-4a1b-8c2d-3e4f5a6b7c8d",
    name: "Nexora API",
    active: true,
    createdAt: "2026-01-10T12:00:00Z",
    updatedAt: "2026-01-10T12:00:00Z",
  },
  {
    id: "f9e8d7c6-b5a4-4c3d-9e8f-1a2b3c4d5e6f",
    name: "Laryon API",
    active: true,
    createdAt: "2026-02-05T09:30:00Z",
    updatedAt: "2026-02-05T09:30:00Z",
  },
  {
    id: "11111111-1111-1111-1111-111111111111",
    name: "darmoz-auth",
    active: false,
    createdAt: "2026-03-01T08:00:00Z",
    updatedAt: "2026-06-15T16:45:00Z",
  },
];
