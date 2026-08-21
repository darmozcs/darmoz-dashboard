import * as yup from "yup";

export const scheduledEmailSchema = yup.object({
  recipient: yup
    .string()
    .email("Must be a valid email")
    .required("Recipient is required"),
  subject: yup.string().default(""),
  templateCode: yup.string().default(""),
  bodyOverride: yup.string().default(""),
  scheduledAt: yup.string().required("Scheduled date/time is required"),
  clientId: yup.string().required("Application is required"),
  variables: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required(),
        value: yup.string().required(),
      }),
    )
    .default([]),
});

export type ScheduledEmailFormData = yup.InferType<typeof scheduledEmailSchema>;
