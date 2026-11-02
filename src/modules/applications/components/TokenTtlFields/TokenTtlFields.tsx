import { NumberInput } from "@mantine/core";
import {
  Controller,
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

interface TokenTtlFormValues extends FieldValues {
  accessTokenTtlMinutes: number | null;
  refreshedAccessTokenTtlMinutes: number | null;
}

interface TokenTtlFieldsProps<T extends TokenTtlFormValues> {
  control: Control<T>;
  errors: FieldErrors<T>;
}

// Duración del token del login y del token de cada refresh, en minutos.
// Vacío = valor por defecto de darmoz-auth.
export const TokenTtlFields = <T extends TokenTtlFormValues>({
  control,
  errors,
}: TokenTtlFieldsProps<T>) => {
  const { t } = useTranslation("applications");

  const fields = [
    {
      name: "accessTokenTtlMinutes",
      label: t("master.accessTokenTtl", "Token duration after login (min)"),
    },
    {
      name: "refreshedAccessTokenTtlMinutes",
      label: t("master.refreshedAccessTokenTtl", "Token duration after refresh (min)"),
    },
  ] as const;

  return (
    <>
      {fields.map(({ name, label }) => (
        <Controller
          key={name}
          name={name as Path<T>}
          control={control}
          render={({ field }) => (
            <NumberInput
              label={label}
              description={t("master.tokenTtlHelp", "Empty = default (12 min)")}
              min={1}
              max={1440}
              allowDecimal={false}
              allowNegative={false}
              name={field.name}
              ref={field.ref}
              onBlur={field.onBlur}
              value={(field.value as number | null) ?? ""}
              onChange={(value) => field.onChange(value === "" ? null : value)}
              error={errors[name]?.message as string | undefined}
            />
          )}
        />
      ))}
    </>
  );
};
