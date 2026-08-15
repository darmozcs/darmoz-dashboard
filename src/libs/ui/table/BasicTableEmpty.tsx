import { Badge, Text } from "@mantine/core";
import { IconInboxOff } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

export const BasicTableEmpty = () => {
  const { t } = useTranslation("common");

  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-2 p-3">
      <Badge variant="light" leftSection={<IconInboxOff size={14} />}>
        {t("table.empty.title")}
      </Badge>
      <Text c="dimmed">{t("table.empty.description")}</Text>
    </div>
  );
};
