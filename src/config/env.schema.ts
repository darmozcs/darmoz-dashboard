import * as yup from "yup";

const envSchema = yup.object({
  VITE_ENABLE_MOCKS: yup.string().oneOf(["true", "false"]).default("false"),
  VITE_API_BASE_URL: yup.string().default(""),
  VITE_TOKEN_REFRESH_INTERVAL_MS: yup
    .number()
    .default(300000)
    .min(60000, "Minimum refresh interval is 60 seconds"),
});

const rawEnv = {
  VITE_ENABLE_MOCKS: import.meta.env.VITE_ENABLE_MOCKS ?? "false",
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  VITE_TOKEN_REFRESH_INTERVAL_MS: Number(
    import.meta.env.VITE_TOKEN_REFRESH_INTERVAL_MS ?? "300000",
  ),
};

const validated = envSchema.validateSync(rawEnv, { stripUnknown: true });

export const config = {
  ...validated,
  VITE_ENABLE_MOCKS: validated.VITE_ENABLE_MOCKS === "true",
};
