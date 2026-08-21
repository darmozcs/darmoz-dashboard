import * as yup from "yup";

export const mailClientApplicationSchema = yup.object({
  name: yup.string().required("Name is required"),
  active: yup.boolean().default(true).required(),
});

export type MailClientApplicationFormData = yup.InferType<
  typeof mailClientApplicationSchema
>;
