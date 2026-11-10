import * as yup from "yup";

export const createWaAccountSchema = yup.object({
  name: yup.string().trim().required("whatsapp:validation.required"),
  appId: yup.string().trim().default(""),
  appSecret: yup.string().trim().required("whatsapp:validation.required"),
  accessToken: yup.string().trim().required("whatsapp:validation.required"),
  wabaId: yup.string().trim().required("whatsapp:validation.required"),
  graphApiVersion: yup.string().trim().default(""),
  active: yup.boolean().default(true).required(),
});

export type CreateWaAccountFormData = yup.InferType<
  typeof createWaAccountSchema
>;

// En la edición los secretos vacíos significan "no cambiar".
export const editWaAccountSchema = createWaAccountSchema.shape({
  appSecret: yup.string().trim().default(""),
  accessToken: yup.string().trim().default(""),
});

export type EditWaAccountFormData = yup.InferType<typeof editWaAccountSchema>;
