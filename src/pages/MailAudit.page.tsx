import { PageHeader } from "@/modules/common/components";
import { MailAuditMasterTableContainer } from "@/modules/mailAudit/containers";
import { Box, Stack } from "@mantine/core";
import { useTranslation } from "react-i18next";

export const MailAudit = () => {
  const { t } = useTranslation("common");

  return (
    <Stack h="100%">
      <PageHeader title={t("menu.mailAudit", "Audit")} />
      <Box flex={1} mih={0}>
        <MailAuditMasterTableContainer />
      </Box>
    </Stack>
  );
};
