import { DataTable } from "@/libs/ui/table";
import { PageHeader } from "@/modules/common/components";
import type { WaMessageDirection, WaMessageStatus } from "@/models";
import { Box, Group, Select, Stack, TextInput } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { MessageLogDetailModal } from "../../components/MessageLogDetailModal/MessageLogDetailModal";
import { MESSAGE_DIRECTIONS, MESSAGE_STATUSES, PAGE_SIZE } from "../../const/waMessageLogs.const";
import { getWaMessageLogsTableColumns } from "../../const/waMessageLogsTableColumns.const";
import { useWaMessageLogsMaster } from "../../hooks/useWaMessageLogsMaster/useWaMessageLogsMaster";

export const WaMessageLogsMasterContainer = () => {
  const { t } = useTranslation("whatsapp");
  const master = useWaMessageLogsMaster();
  const columns = getWaMessageLogsTableColumns(t, master.numberLabel);

  return (
    <Stack h="100%">
      <PageHeader title={t("common:menu.waMessageLogs")}>
        <Group gap="xs">
          <TextInput
            placeholder={t("messageLogs.searchContact")}
            value={master.contact}
            onChange={(event) => master.setContact(event.currentTarget.value)}
            w={170}
          />
          <Select
            placeholder={t("messageLogs.number")}
            data={master.phoneOptions}
            value={master.phoneNumberId}
            onChange={master.setPhoneNumberId}
            clearable
            w={170}
          />
          <Select
            placeholder={t("messageLogs.direction")}
            data={MESSAGE_DIRECTIONS.map((direction) => ({
              value: direction,
              label: t(`messageLogs.directions.${direction}`),
            }))}
            value={master.direction}
            onChange={(value) => master.setDirection(value as WaMessageDirection | null)}
            clearable
            w={140}
          />
          <Select
            placeholder={t("messageLogs.status")}
            data={MESSAGE_STATUSES.map((status) => ({
              value: status,
              label: t(`conversations.messageStatuses.${status}`),
            }))}
            value={master.status}
            onChange={(value) => master.setStatus(value as WaMessageStatus | null)}
            clearable
            w={140}
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
      <MessageLogDetailModal
        log={master.selected}
        numberLabel={master.numberLabel}
        onClose={() => master.setSelected(null)}
      />
    </Stack>
  );
};
