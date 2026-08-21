import * as yup from "yup";

export const createRoleSchema = yup.object({
  name: yup
    .string()
    .matches(
      /^[A-Z][A-Z0-9_]*$/,
      "Must start with a letter and use only uppercase letters, numbers and underscores",
    )
    .required("Name is required"),
  description: yup.string().default(""),
  applicationId: yup.string().required("Application is required"),
});

export type CreateRoleFormData = yup.InferType<typeof createRoleSchema>;
