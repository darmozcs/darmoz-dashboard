import { PageHeader } from "@/modules/common/components";
import {
  MailAuditFiltersContainer,
  MailAuditMasterTableContainer,
} from "@/modules/mailAudit/containers";
import { Box, Flex, Stack } from "@mantine/core";
import { useTranslation } from "react-i18next";

export const MailAudit = () => {
  const { t } = useTranslation("common");

  return (
    <Stack h="100%">
      <PageHeader title={t("menu.mailAudit", "Audit")} />
      <Flex justify="flex-end">
        <MailAuditFiltersContainer />
      </Flex>
      <Box flex={1} mih={0}>
        <MailAuditMasterTableContainer />
      </Box>
    </Stack>
  );
};
