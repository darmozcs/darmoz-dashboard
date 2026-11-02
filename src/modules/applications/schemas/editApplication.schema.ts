import * as yup from "yup";
import { tokenTtlFields } from "./tokenTtl.schema";

export const editApplicationSchema = yup.object({
  serviceName: yup.string().required("Service name is required"),
  name: yup.string().required("Name is required"),
  description: yup.string().default(""),
  unverifiedLoginLimit: yup
    .number()
    .min(0, "Must be 0 or greater")
    .integer("Must be a whole number")
    .required("Limit is required"),
  ...tokenTtlFields,
});

export type EditApplicationFormData = yup.InferType<
  typeof editApplicationSchema
>;
