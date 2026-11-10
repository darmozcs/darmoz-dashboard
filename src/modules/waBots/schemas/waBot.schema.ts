import * as yup from "yup";

const TIME = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;
const VARIABLE_NAME = /^[A-Za-z_][A-Za-z0-9_]*$/;

export const createWaBotSchema = yup.object({
  name: yup.string().trim().required("whatsapp:validation.required"),
  applicationId: yup.string().required("whatsapp:validation.required"),
});

export type CreateWaBotFormData = yup.InferType<typeof createWaBotSchema>;

export const waBotSettingsSchema = createWaBotSchema.shape({
  active: yup.boolean().required(),
  entryFlowId: yup.string().nullable().default(null),
  fallbackMessage: yup.string().max(4096).default(""),
  sessionTimeoutMinutes: yup
    .number()
    .min(1, "whatsapp:validation.sessionTimeout")
    .max(10080, "whatsapp:validation.sessionTimeout")
    .required("whatsapp:validation.required"),
  businessHoursEnabled: yup.boolean().required(),
  timezone: yup.string().trim().required("whatsapp:validation.required"),
  days: yup
    .array(
      yup.object({
        day: yup.string().required(),
        enabled: yup.boolean().required(),
        from: yup.string().matches(TIME, "whatsapp:validation.time").required(),
        to: yup.string().matches(TIME, "whatsapp:validation.time").required(),
      }),
    )
    .required(),
  outOfHoursMessage: yup.string().max(4096).default(""),
  variables: yup
    .array(
      yup.object({
        key: yup
          .string()
          .trim()
          .matches(VARIABLE_NAME, "whatsapp:validation.variableName")
          .required("whatsapp:validation.required"),
        value: yup.string().default(""),
      }),
    )
    .required(),
});

export type WaBotSettingsFormData = yup.InferType<typeof waBotSettingsSchema>;
