import { PasswordInput, SimpleGrid, Switch, TextInput } from "@mantine/core";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { CreateWaAccountFormData } from "../../schemas/waAccount.schema";

interface WaAccountFieldsProps {
  control: Control<CreateWaAccountFormData>;
  errors: FieldErrors<CreateWaAccountFormData>;
  // En la edición los secretos no se muestran: vacío = no cambiar.
  secretsOptional?: boolean;
}

const TEXT_FIELDS = ["name", "wabaId", "appId", "graphApiVersion"] as const;
const SECRET_FIELDS = ["accessToken", "appSecret"] as const;

export const WaAccountFields = ({
  control,
  errors,
  secretsOptional = false,
}: WaAccountFieldsProps) => {
  const { t } = useTranslation("whatsapp");

  return (
    <>
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        {TEXT_FIELDS.map((name) => (
          <Controller
            key={name}
            name={name}
            control={control}
            render={({ field }) => (
              <TextInput
                label={t(`accounts.fields.${name}`)}
                description={t(`accounts.hints.${name}`)}
                withAsterisk={name === "name" || name === "wabaId"}
                {...field}
                error={errors[name]?.message && t(errors[name].message)}
              />
            )}
          />
        ))}
      </SimpleGrid>
      {SECRET_FIELDS.map((name) => (
        <Controller
          key={name}
          name={name}
          control={control}
          render={({ field }) => (
            <PasswordInput
              label={t(`accounts.fields.${name}`)}
              description={
                secretsOptional
                  ? t("accounts.hints.keepSecret")
                  : t(`accounts.hints.${name}`)
              }
              withAsterisk={!secretsOptional}
              autoComplete="off"
              {...field}
              error={errors[name]?.message && t(errors[name].message)}
            />
          )}
        />
      ))}
      <Controller
        name="active"
        control={control}
        render={({ field: { value, onChange, ...field } }) => (
          <Switch
            label={t("common.active")}
            checked={value}
            onChange={(event) => onChange(event.currentTarget.checked)}
            {...field}
          />
        )}
      />
    </>
  );
};
