import * as yup from "yup";

export const testMessageSchema = yup.object({
  to: yup
    .string()
    .matches(/^[0-9]{8,15}$/, "whatsapp:validation.phone")
    .required("whatsapp:validation.required"),
  text: yup.string().trim().max(4096).required("whatsapp:validation.required"),
});

export type TestMessageFormData = yup.InferType<typeof testMessageSchema>;
