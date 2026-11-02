import * as yup from "yup";

// Duración del access token en minutos. Vacío = la aplicación usa el valor
// por defecto de darmoz-auth (JWT_ACCESS_TOKEN_TTL_SECONDS). El backend lo
// guarda en segundos (60 a 86400).
const tokenTtlMinutes = yup
  .number()
  .transform((value, original) =>
    original === "" || original === null || original === undefined
      ? null
      : value,
  )
  .nullable()
  .integer("Must be a whole number")
  .min(1, "Must be between 1 and 1440 minutes")
  .max(1440, "Must be between 1 and 1440 minutes")
  .default(null);

export const tokenTtlFields = {
  accessTokenTtlMinutes: tokenTtlMinutes,
  refreshedAccessTokenTtlMinutes: tokenTtlMinutes,
};

export const secondsToMinutes = (seconds: number | null | undefined) =>
  seconds ? Math.round(seconds / 60) : null;

export const minutesToSeconds = (minutes: number | null | undefined) =>
  minutes ? minutes * 60 : null;
