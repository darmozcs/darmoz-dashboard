import { confirmDelete } from "@/libs/ui/confirm/confirmDelete";
import type { DataTableColumn } from "@/libs/ui/table";
import type { WaAccount } from "@/models";
import { ActionIcon, Badge, Group, Tooltip } from "@mantine/core";
import { IconPencil, IconPlugConnected, IconTrash } from "@tabler/icons-react";
import dayjs from "dayjs";
import type { TFunction } from "i18next";

interface WaAccountsTableActions {
  onConnect: (account: WaAccount) => void;
  onEdit: (account: WaAccount) => void;
  onDelete: (account: WaAccount) => void;
}

export const getWaAccountsTableColumns = (
  t: TFunction,
  actions: WaAccountsTableActions,
): DataTableColumn<WaAccount>[] => [
  { accessor: "name", title: t("accounts.fields.name"), width: 220 },
  { accessor: "wabaId", title: t("accounts.fields.wabaId"), width: 180 },
  {
    accessor: "accessTokenMasked",
    title: t("accounts.fields.accessToken"),
    width: 150,
  },
  {
    accessor: "lastValidatedAt",
    title: t("accounts.lastValidatedAt"),
    width: 170,
    render: (account) =>
      account.lastValidatedAt ? (
        dayjs(account.lastValidatedAt).format("DD/MM/YYYY HH:mm")
      ) : (
        <Badge color="yellow" variant="light">
          {t("accounts.notValidated")}
        </Badge>
      ),
  },
  {
    accessor: "active",
    title: t("common.active"),
    width: 100,
    render: (account) => (
      <Badge color={account.active ? "green" : "gray"} variant="light">
        {account.active ? t("common:yes") : t("common:no")}
      </Badge>
    ),
  },
  {
    accessor: "actions",
    title: "",
    width: 130,
    render: (account) => (
      <Group gap="xs" wrap="nowrap">
        <Tooltip label={t("accounts.connect")}>
          <ActionIcon variant="subtle" onClick={() => actions.onConnect(account)}>
            <IconPlugConnected size={18} />
          </ActionIcon>
        </Tooltip>
        <ActionIcon variant="subtle" onClick={() => actions.onEdit(account)}>
          <IconPencil size={18} />
        </ActionIcon>
        <ActionIcon
          variant="subtle"
          color="red"
          onClick={() =>
            confirmDelete({
              title: t("accounts.deleteTitle"),
              message: t("accounts.deleteMessage", { name: account.name }),
              onConfirm: () => actions.onDelete(account),
            })
          }
        >
          <IconTrash size={18} />
        </ActionIcon>
      </Group>
    ),
  },
];
