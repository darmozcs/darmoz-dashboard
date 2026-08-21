import * as yup from "yup";

export const editUserRolesSchema = yup.object({
  roleIds: yup
    .array()
    .of(yup.string().required())
    .min(1, "At least one role is required")
    .required(),
});

export type EditUserRolesFormData = yup.InferType<typeof editUserRolesSchema>;
