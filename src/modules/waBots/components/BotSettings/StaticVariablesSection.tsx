import {
  ActionIcon,
  Button,
  Fieldset,
  Group,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { WaBotSettingsFormState } from "../../hooks/useWaBotSettingsForm/useWaBotSettingsForm";

interface StaticVariablesSectionProps {
  settings: WaBotSettingsFormState;
}

export const StaticVariablesSection = ({ settings }: StaticVariablesSectionProps) => {
  const { t } = useTranslation("whatsapp");
  const { control, formState } = settings.form;
  const { fields, append, remove } = settings.variables;

  return (
    <Fieldset legend={t("bots.staticVariables")}>
      <Stack>
        <Text size="sm" c="dimmed">
          {t("bots.staticVariablesHint", { example: "{{bot.clave}}" })}
        </Text>
        {fields.map((item, index) => {
          const keyError = formState.errors.variables?.[index]?.key?.message;
          return (
            <Group key={item.id} align="flex-start" wrap="nowrap">
              <Controller
                name={`variables.${index}.key`}
                control={control}
                render={({ field }) => (
                  <TextInput
                    placeholder={t("bots.variableKey")}
                    w={200}
                    {...field}
                    error={keyError ? t(keyError) : undefined}
                  />
                )}
              />
              <Controller
                name={`variables.${index}.value`}
                control={control}
                render={({ field }) => (
                  <TextInput placeholder={t("bots.variableValue")} flex={1} {...field} />
                )}
              />
              <ActionIcon variant="subtle" color="red" mt={6} onClick={() => remove(index)}>
                <IconTrash size={18} />
              </ActionIcon>
            </Group>
          );
        })}
        <Group>
          <Button
            variant="light"
            size="xs"
            leftSection={<IconPlus size={14} />}
            onClick={() => append({ key: "", value: "" })}
          >
            {t("bots.addVariable")}
          </Button>
        </Group>
      </Stack>
    </Fieldset>
  );
};
