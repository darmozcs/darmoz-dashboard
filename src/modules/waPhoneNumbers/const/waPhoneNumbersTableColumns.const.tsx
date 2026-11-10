import { confirmDelete } from "@/libs/ui/confirm/confirmDelete";
import type { DataTableColumn } from "@/libs/ui/table";
import type { WaPhoneNumber } from "@/models";
import { ActionIcon, Group, Select, Switch, Tooltip } from "@mantine/core";
import { IconSend, IconTrash } from "@tabler/icons-react";
import type { TFunction } from "i18next";

interface WaPhoneNumbersTableActions {
  botOptions: { value: string; label: string }[];
  onAssignBot: (phone: WaPhoneNumber, botId: string | null) => void;
  onToggleActive: (phone: WaPhoneNumber) => void;
  onTest: (phone: WaPhoneNumber) => void;
  onDelete: (phone: WaPhoneNumber) => void;
}

export const getWaPhoneNumbersTableColumns = (
  t: TFunction,
  actions: WaPhoneNumbersTableActions,
): DataTableColumn<WaPhoneNumber>[] => [
  { accessor: "displayNumber", title: t("numbers.number"), width: 170 },
  { accessor: "verifiedName", title: t("numbers.verifiedName"), width: 180 },
  { accessor: "accountName", title: t("numbers.account"), width: 180 },
  {
    accessor: "botId",
    title: t("numbers.bot"),
    width: 240,
    render: (phone) => (
      <Select
        size="xs"
        data={actions.botOptions}
        value={phone.botId}
        placeholder={t("numbers.noBot")}
        clearable
        searchable
        onChange={(botId) => actions.onAssignBot(phone, botId)}
      />
    ),
  },
  {
    accessor: "active",
    title: t("common.active"),
    width: 100,
    render: (phone) => (
      <Switch checked={phone.active} onChange={() => actions.onToggleActive(phone)} />
    ),
  },
  {
    accessor: "actions",
    title: "",
    width: 100,
    render: (phone) => (
      <Group gap="xs" wrap="nowrap">
        <Tooltip label={t("numbers.test")}>
          <ActionIcon variant="subtle" onClick={() => actions.onTest(phone)}>
            <IconSend size={18} />
          </ActionIcon>
        </Tooltip>
        <ActionIcon
          variant="subtle"
          color="red"
          onClick={() =>
            confirmDelete({
              title: t("numbers.deleteTitle"),
              message: t("numbers.deleteMessage", {
                name: phone.displayNumber ?? phone.phoneNumberId,
              }),
              onConfirm: () => actions.onDelete(phone),
            })
          }
        >
          <IconTrash size={18} />
        </ActionIcon>
      </Group>
    ),
  },
];
