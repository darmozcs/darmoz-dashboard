import * as yup from "yup";

export const createApplicationSchema = yup.object({
  serviceName: yup.string().required("Service name is required"),
  name: yup.string().required("Name is required"),
  description: yup.string().default(""),
  unverifiedLoginLimit: yup
    .number()
    .min(0, "Must be 0 or greater")
    .integer("Must be a whole number")
    .default(0),
});

export type CreateApplicationFormData = yup.InferType<
  typeof createApplicationSchema
>;
