import {
  AuditFiltersContainer,
  AuditMasterTableContainer,
} from "@/modules/audit/containers";
import { PageHeader } from "@/modules/common/components";
import { Box, Flex, Stack } from "@mantine/core";
import { useTranslation } from "react-i18next";

export const Audit = () => {
  const { t } = useTranslation("common");

  return (
    <Stack h="100%">
      <PageHeader title={t("menu.audit", "Audit")} />
      <Flex justify="flex-end">
        <AuditFiltersContainer />
      </Flex>
      <Box flex={1} mih={0}>
        <AuditMasterTableContainer />
      </Box>
    </Stack>
  );
};
