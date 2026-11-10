import { DataTable } from "@/libs/ui/table";
import { PageHeader, PlusButton } from "@/modules/common/components";
import { Box, Stack, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { CreateWaBotModal } from "../../components/CreateWaBotModal/CreateWaBotModal";
import { getWaBotsTableColumns } from "../../const/waBotsTableColumns.const";
import { useWaBotsMaster } from "../../hooks/useWaBotsMaster/useWaBotsMaster";

export const WaBotsMasterContainer = () => {
  const { t } = useTranslation("whatsapp");
  const master = useWaBotsMaster();

  const columns = getWaBotsTableColumns(t, {
    applicationName: master.applicationName,
    onOpen: master.openBot,
    onDelete: master.remove,
  });

  return (
    <Stack h="100%">
      <PageHeader title={t("common:menu.waBots")}>
        <PlusButton label={t("bots.add")} onClick={master.openCreate} />
      </PageHeader>
      <Text size="sm" c="dimmed" px="xs">
        {t("bots.pageHelp")}
      </Text>
      <Box flex={1} mih={0}>
        <DataTable
          records={master.bots}
          columns={columns}
          fetching={master.isLoading}
          onRowClick={({ record }) => master.openBot(record)}
        />
      </Box>
      <CreateWaBotModal
        opened={master.createOpen}
        form={master.createForm}
        isLoading={master.isCreating}
        onSubmit={master.create}
        onClose={master.closeCreate}
      />
    </Stack>
  );
};
