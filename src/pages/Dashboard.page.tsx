import { Paper, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";

export const Dashboard = () => {
  const { t } = useTranslation("common");

  return (
    <Paper p="md">
      <Title order={2}>{t("dashboard.title", "Dashboard")}</Title>
    </Paper>
  );
};
