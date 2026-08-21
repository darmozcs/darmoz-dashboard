import * as yup from "yup";

export const emailTemplateSchema = yup.object({
  code: yup
    .string()
    .max(100, "Must be at most 100 characters")
    .required("Code is required"),
  name: yup
    .string()
    .max(150, "Must be at most 150 characters")
    .required("Name is required"),
  subject: yup.string().required("Subject is required"),
  bodyHtml: yup.string().required("HTML body is required"),
  bodyText: yup.string().default(""),
  active: yup.boolean().default(true).required(),
});

export type EmailTemplateFormData = yup.InferType<typeof emailTemplateSchema>;
