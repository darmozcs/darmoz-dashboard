import { setupWorker } from "msw/browser";
import {
  authHandlers,
  emailTemplateHandlers,
  mailAuditHandlers,
  mailClientApplicationHandlers,
  scheduledEmailHandlers,
  userHandlers,
} from "./handlers";

export const worker = setupWorker(
  ...authHandlers,
  ...userHandlers,
  ...mailClientApplicationHandlers,
  ...emailTemplateHandlers,
  ...scheduledEmailHandlers,
  ...mailAuditHandlers,
);
