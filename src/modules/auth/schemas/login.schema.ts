import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Email must be a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be at most 100 characters")
    .required("Password is required"),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
