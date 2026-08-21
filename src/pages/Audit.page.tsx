import { PageHeader } from "@/modules/common/components";
import {
  AuditFiltersContainer,
  AuditMasterTableContainer,
} from "@/modules/audit/containers";
import { Box, Stack } from "@mantine/core";
import { useTranslation } from "react-i18next";

export const Audit = () => {
  const { t } = useTranslation("common");

  return (
    <Stack h="100%">
      <PageHeader title={t("menu.audit", "Audit")} />
      <AuditFiltersContainer />
      <Box flex={1} mih={0}>
        <AuditMasterTableContainer />
      </Box>
    </Stack>
  );
};
