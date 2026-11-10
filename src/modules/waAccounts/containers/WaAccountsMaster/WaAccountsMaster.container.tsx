import { PageHeader, PlusButton } from "@/modules/common/components";
import { DataTable } from "@/libs/ui/table";
import { Box, Stack, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { ConnectWaAccountWizard } from "../../components/ConnectWaAccountWizard/ConnectWaAccountWizard";
import { CreateWaAccountModal } from "../../components/WaAccountModals/CreateWaAccountModal";
import { EditWaAccountModal } from "../../components/WaAccountModals/EditWaAccountModal";
import { getWaAccountsTableColumns } from "../../const/waAccountsTableColumns.const";
import { useWaAccountsMaster } from "../../hooks/useWaAccountsMaster/useWaAccountsMaster";

export const WaAccountsMasterContainer = () => {
  const { t } = useTranslation("whatsapp");
  const master = useWaAccountsMaster();

  const columns = getWaAccountsTableColumns(t, {
    onConnect: master.setConnecting,
    onEdit: master.setEditing,
    onDelete: master.handleDelete,
  });

  return (
    <Stack h="100%">
      <PageHeader title={t("common:menu.waAccounts")}>
        <PlusButton label={t("accounts.add")} onClick={master.openCreate} />
      </PageHeader>
      <Text size="sm" c="dimmed" px="xs">
        {t("accounts.pageHelp")}
      </Text>
      <Box flex={1} mih={0}>
        <DataTable
          records={master.accounts}
          columns={columns}
          fetching={master.isLoading}
        />
      </Box>
      <CreateWaAccountModal
        opened={master.createOpen}
        onClose={master.closeCreate}
        onCreated={master.onCreated}
      />
      <EditWaAccountModal
        account={master.editing}
        onClose={() => master.setEditing(null)}
      />
      <ConnectWaAccountWizard
        account={master.connecting}
        onClose={() => master.setConnecting(null)}
      />
    </Stack>
  );
};
