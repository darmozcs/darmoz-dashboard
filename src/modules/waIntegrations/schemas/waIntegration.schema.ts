import * as yup from "yup";

export const waIntegrationSchema = yup.object({
  applicationId: yup.string().required("whatsapp:validation.required"),
  baseUrl: yup
    .string()
    .trim()
    .matches(/^https?:\/\/[^ ]+$/, "whatsapp:validation.url")
    .required("whatsapp:validation.required"),
  authHeaderName: yup
    .string()
    .trim()
    .matches(/^[A-Za-z0-9-]*$/, "whatsapp:validation.header")
    .default(""),
  // En la edición: vacío = no cambiar.
  authHeaderValue: yup.string().trim().default(""),
  timeoutMs: yup
    .number()
    .min(500, "whatsapp:validation.timeout")
    .max(60000, "whatsapp:validation.timeout")
    .required("whatsapp:validation.required"),
});

export type WaIntegrationFormData = yup.InferType<typeof waIntegrationSchema>;

export const waIntegrationTestSchema = yup.object({
  method: yup.string().oneOf(["GET", "POST"]).required(),
  path: yup.string().trim().required("whatsapp:validation.required"),
});

export type WaIntegrationTestFormData = yup.InferType<
  typeof waIntegrationTestSchema
>;
