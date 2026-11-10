import { DataTable } from "@/libs/ui/table";
import { PageHeader } from "@/modules/common/components";
import type { WaConversationStatus } from "@/models";
import { Box, Group, Select, Stack, TextInput } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { ConversationDrawer } from "../../components/ConversationDrawer/ConversationDrawer";
import { CONVERSATION_STATUSES, PAGE_SIZE } from "../../const/waConversations.const";
import { getWaConversationsTableColumns } from "../../const/waConversationsTableColumns.const";
import { useWaConversationsMaster } from "../../hooks/useWaConversationsMaster/useWaConversationsMaster";

export const WaConversationsMasterContainer = () => {
  const { t } = useTranslation("whatsapp");
  const master = useWaConversationsMaster();

  const columns = getWaConversationsTableColumns(t, {
    numberLabel: master.numberLabel,
    onOpen: master.setSelected,
    onReset: master.reset,
  });

  return (
    <Stack h="100%">
      <PageHeader title={t("common:menu.waConversations")}>
        <Group gap="xs">
          <TextInput
            placeholder={t("conversations.searchContact")}
            value={master.contact}
            onChange={(event) => master.setContact(event.currentTarget.value)}
            w={200}
          />
          <Select
            placeholder={t("conversations.status")}
            data={CONVERSATION_STATUSES.map((status) => ({
              value: status,
              label: t(`conversations.statuses.${status}`),
            }))}
            value={master.status}
            onChange={(value) => master.setStatus(value as WaConversationStatus | null)}
            clearable
            w={160}
          />
        </Group>
      </PageHeader>
      <Box flex={1} mih={0}>
        <DataTable
          records={master.records}
          columns={columns}
          fetching={master.isLoading}
          totalRecords={master.totalRecords}
          recordsPerPage={PAGE_SIZE}
          page={master.page}
          onPageChange={master.setPage}
          onRowClick={({ record }) => master.setSelected(record)}
        />
      </Box>
      <ConversationDrawer
        conversation={master.selected}
        messages={master.messages}
        isLoading={master.isLoadingMessages}
        onReset={master.reset}
        onClose={() => master.setSelected(null)}
      />
    </Stack>
  );
};
