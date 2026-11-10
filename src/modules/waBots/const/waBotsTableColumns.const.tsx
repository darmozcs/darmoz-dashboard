import { confirmDelete } from "@/libs/ui/confirm/confirmDelete";
import type { DataTableColumn } from "@/libs/ui/table";
import type { WaBot } from "@/models";
import { ActionIcon, Badge, Group, Tooltip } from "@mantine/core";
import { IconArrowRight, IconTrash } from "@tabler/icons-react";
import type { TFunction } from "i18next";

interface WaBotsTableActions {
  applicationName: (id: string) => string;
  onOpen: (bot: WaBot) => void;
  onDelete: (bot: WaBot) => void;
}

export const getWaBotsTableColumns = (
  t: TFunction,
  actions: WaBotsTableActions,
): DataTableColumn<WaBot>[] => [
  { accessor: "name", title: t("bots.name"), width: 240 },
  {
    accessor: "applicationId",
    title: t("bots.application"),
    width: 200,
    render: (bot) => actions.applicationName(bot.applicationId),
  },
  {
    accessor: "entryFlowId",
    title: t("bots.entryFlow"),
    width: 160,
    render: (bot) =>
      bot.entryFlowId ? (
        <Badge color="green" variant="light">
          {t("bots.ready")}
        </Badge>
      ) : (
        <Badge color="yellow" variant="light">
          {t("bots.noEntryFlow")}
        </Badge>
      ),
  },
  {
    accessor: "active",
    title: t("common.active"),
    width: 100,
    render: (bot) => (
      <Badge color={bot.active ? "green" : "gray"} variant="light">
        {bot.active ? t("common:yes") : t("common:no")}
      </Badge>
    ),
  },
  {
    accessor: "actions",
    title: "",
    width: 100,
    render: (bot) => (
      <Group gap="xs" wrap="nowrap">
        <Tooltip label={t("bots.open")}>
          <ActionIcon variant="subtle" onClick={() => actions.onOpen(bot)}>
            <IconArrowRight size={18} />
          </ActionIcon>
        </Tooltip>
        <ActionIcon
          variant="subtle"
          color="red"
          onClick={() =>
            confirmDelete({
              title: t("bots.deleteTitle"),
              message: t("bots.deleteMessage", { name: bot.name }),
              onConfirm: () => actions.onDelete(bot),
            })
          }
        >
          <IconTrash size={18} />
        </ActionIcon>
      </Group>
    ),
  },
];
