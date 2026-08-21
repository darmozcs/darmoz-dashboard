import * as yup from "yup";

export const editApplicationLimitSchema = yup.object({
  unverifiedLoginLimit: yup
    .number()
    .min(0, "Must be 0 or greater")
    .integer("Must be a whole number")
    .required("Limit is required"),
});

export type EditApplicationLimitFormData = yup.InferType<
  typeof editApplicationLimitSchema
>;
