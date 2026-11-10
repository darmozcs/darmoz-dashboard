import { ApplicationSelect } from "@/modules/common/components";
import {
  NumberInput,
  Select,
  SimpleGrid,
  Switch,
  TextInput,
  Textarea,
} from "@mantine/core";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { WaBotSettingsFormState } from "../../hooks/useWaBotSettingsForm/useWaBotSettingsForm";

interface BotGeneralSectionProps {
  settings: WaBotSettingsFormState;
}

export const BotGeneralSection = ({ settings }: BotGeneralSectionProps) => {
  const { t } = useTranslation("whatsapp");
  const { control, formState } = settings.form;
  const errors = formState.errors;
  const message = (key?: string) => (key ? t(key) : undefined);

  return (
    <>
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextInput
              label={t("bots.name")}
              withAsterisk
              {...field}
              error={message(errors.name?.message)}
            />
          )}
        />
        <Controller
          name="applicationId"
          control={control}
          render={({ field }) => (
            <ApplicationSelect
              label={t("bots.application")}
              withAsterisk
              {...field}
              error={message(errors.applicationId?.message)}
            />
          )}
        />
        <Controller
          name="entryFlowId"
          control={control}
          render={({ field }) => (
            <Select
              label={t("bots.entryFlow")}
              description={t("bots.entryFlowHint")}
              data={settings.flowOptions}
              clearable
              {...field}
            />
          )}
        />
        <Controller
          name="sessionTimeoutMinutes"
          control={control}
          render={({ field }) => (
            <NumberInput
              label={t("bots.sessionTimeout")}
              description={t("bots.sessionTimeoutHint")}
              min={1}
              max={10080}
              {...field}
              error={message(errors.sessionTimeoutMinutes?.message)}
            />
          )}
        />
      </SimpleGrid>
      <Controller
        name="fallbackMessage"
        control={control}
        render={({ field }) => (
          <Textarea
            label={t("bots.fallbackMessage")}
            description={t("bots.fallbackMessageHint")}
            autosize
            minRows={2}
            {...field}
          />
        )}
      />
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
