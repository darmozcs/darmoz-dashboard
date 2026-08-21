import { useTranslation } from "react-i18next";
import { PageHeader } from "@/modules/common/components";
import { ApplicationsMasterTableContainer } from "@/modules/applications/containers";
import { Box, Stack } from "@mantine/core";

export const Applications = () => {
  const { t } = useTranslation("common");

  return (
    <Stack h="100%">
      <PageHeader title={t("menu.applications", "Applications")} />
      <Box flex={1} mih={0}>
        <ApplicationsMasterTableContainer />
      </Box>
    </Stack>
  );
};
