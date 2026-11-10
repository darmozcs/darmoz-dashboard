export const CONNECT_STEPS = [
  "validate",
  "webhook",
  "numbers",
  "subscribe",
  "test",
] as const;

export type ConnectStep = (typeof CONNECT_STEPS)[number];

export const META_DOCS_URL =
  "https://developers.facebook.com/docs/whatsapp/cloud-api/get-started";

export const TEST_MESSAGE_MAX_LENGTH = 4096;
