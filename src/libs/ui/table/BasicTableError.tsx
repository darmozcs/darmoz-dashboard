import { Paper, Text } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

export const BasicTableError = () => {
  const { t } = useTranslation("common");

  return (
    <Paper withBorder className="p-3 text-center">
      <div className="flex flex-col items-center gap-2">
        <IconAlertCircle size={48} className="text-red-600" />
        <Text fw={700} c="red">
          {t("table.error.title")}
        </Text>
        <Text c="dimmed">{t("table.error.description")}</Text>
      </div>
    </Paper>
  );
};
