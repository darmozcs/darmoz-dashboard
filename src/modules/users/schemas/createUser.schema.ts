import * as yup from "yup";

export const createUserSchema = yup.object({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Must be at least 8 characters")
    .required("Password is required"),
  applicationId: yup.string().required("Application is required"),
  roleIds: yup
    .array()
    .of(yup.string().required())
    .min(1, "At least one role is required")
    .required(),
});

export type CreateUserFormData = yup.InferType<typeof createUserSchema>;
