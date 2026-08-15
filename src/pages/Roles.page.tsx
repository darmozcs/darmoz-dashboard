import { Paper, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";

export const Roles = () => {
  const { t } = useTranslation("common");

  return (
    <Paper p="md">
      <Title order={2}>{t("menu.roles", "Roles")}</Title>
    </Paper>
  );
};
