import { Paper, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";

export const Permissions = () => {
  const { t } = useTranslation("common");

  return (
    <Paper p="md">
      <Title order={2}>{t("menu.permissions", "Permissions")}</Title>
    </Paper>
  );
};
