import { Button, Group, Paper, Stack } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { BotGeneralSection } from "../../components/BotSettings/BotGeneralSection";
import { BusinessHoursSection } from "../../components/BotSettings/BusinessHoursSection";
import { StaticVariablesSection } from "../../components/BotSettings/StaticVariablesSection";
import { useWaBotSettingsForm } from "../../hooks/useWaBotSettingsForm/useWaBotSettingsForm";

interface WaBotSettingsContainerProps {
  botId: string;
}

export const WaBotSettingsContainer = ({ botId }: WaBotSettingsContainerProps) => {
  const { t } = useTranslation("whatsapp");
  const settings = useWaBotSettingsForm(botId);

  return (
    <Paper p="md">
      <form onSubmit={settings.form.handleSubmit(settings.onSubmit)}>
        <Stack>
          <BotGeneralSection settings={settings} />
          <BusinessHoursSection settings={settings} />
          <StaticVariablesSection settings={settings} />
          <Group justify="flex-end">
            <Button type="submit" loading={settings.isLoading}>
              {t("common.save")}
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
};
