import { DataTable } from "@/libs/ui/table";
import { PageHeader, PlusButton } from "@/modules/common/components";
import { Box, Stack, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { WaIntegrationModal } from "../../components/WaIntegrationModal/WaIntegrationModal";
import { WaIntegrationTestModal } from "../../components/WaIntegrationTestModal/WaIntegrationTestModal";
import { getWaIntegrationsTableColumns } from "../../const/waIntegrationsTableColumns.const";
import { useWaIntegrationsMaster } from "../../hooks/useWaIntegrationsMaster/useWaIntegrationsMaster";

export const WaIntegrationsMasterContainer = () => {
  const { t } = useTranslation("whatsapp");
  const master = useWaIntegrationsMaster();

  const columns = getWaIntegrationsTableColumns(t, {
    onTest: master.setTesting,
    onEdit: master.openEdit,
    onDelete: master.handleDelete,
  });

  return (
    <Stack h="100%">
      <PageHeader title={t("common:menu.waIntegrations")}>
        <PlusButton label={t("integrations.add")} onClick={master.openCreate} />
      </PageHeader>
      <Text size="sm" c="dimmed" px="xs">
        {t("integrations.pageHelp")}
      </Text>
      <Box flex={1} mih={0}>
        <DataTable
          records={master.integrations}
          columns={columns}
          fetching={master.isLoading}
        />
      </Box>
      <WaIntegrationModal
        opened={master.formOpen}
        integration={master.editing}
        onClose={master.closeForm}
      />
      <WaIntegrationTestModal
        integration={master.testing}
        onClose={() => master.setTesting(null)}
      />
    </Stack>
  );
};
