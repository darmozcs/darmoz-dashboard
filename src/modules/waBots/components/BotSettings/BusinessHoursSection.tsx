import {
  Checkbox,
  Fieldset,
  Group,
  Stack,
  Switch,
  TextInput,
  Textarea,
} from "@mantine/core";
import { Controller, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { WaBotSettingsFormState } from "../../hooks/useWaBotSettingsForm/useWaBotSettingsForm";

interface BusinessHoursSectionProps {
  settings: WaBotSettingsFormState;
}

export const BusinessHoursSection = ({ settings }: BusinessHoursSectionProps) => {
  const { t } = useTranslation("whatsapp");
  const { control } = settings.form;
  const enabled = useWatch({ control, name: "businessHoursEnabled" });
  const days = useWatch({ control, name: "days" });

  return (
    <Fieldset legend={t("bots.businessHours")}>
      <Stack>
        <Controller
          name="businessHoursEnabled"
          control={control}
          render={({ field: { value, onChange, ...field } }) => (
            <Switch
              label={t("bots.businessHoursEnabled")}
              checked={value}
              onChange={(event) => onChange(event.currentTarget.checked)}
              {...field}
            />
          )}
        />
        {enabled && (
          <>
            <Controller
              name="timezone"
              control={control}
              render={({ field }) => (
                <TextInput label={t("bots.timezone")} maw={280} {...field} />
              )}
            />
            {days.map((day, index) => (
              <Group key={day.day} gap="sm" wrap="nowrap">
                <Controller
                  name={`days.${index}.enabled`}
                  control={control}
                  render={({ field: { value, onChange, ...field } }) => (
                    <Checkbox
                      w={110}
                      label={t(`days.${day.day}`)}
                      checked={value}
                      onChange={(event) => onChange(event.currentTarget.checked)}
                      {...field}
                    />
                  )}
                />
                {(["from", "to"] as const).map((bound) => (
                  <Controller
                    key={bound}
                    name={`days.${index}.${bound}`}
                    control={control}
                    render={({ field }) => (
                      <TextInput
                        type="time"
                        w={110}
                        disabled={!day.enabled}
                        aria-label={t(`bots.${bound}`)}
                        {...field}
                      />
                    )}
                  />
                ))}
              </Group>
            ))}
            <Controller
              name="outOfHoursMessage"
              control={control}
              render={({ field }) => (
                <Textarea
                  label={t("bots.outOfHoursMessage")}
                  autosize
                  minRows={2}
                  {...field}
                />
              )}
            />
          </>
        )}
      </Stack>
    </Fieldset>
  );
};
