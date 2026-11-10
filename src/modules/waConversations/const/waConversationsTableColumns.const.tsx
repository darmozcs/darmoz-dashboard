import type { DataTableColumn } from "@/libs/ui/table";
import type { WaConversation } from "@/models";
import { ActionIcon, Badge, Group, Tooltip } from "@mantine/core";
import { IconMessages, IconRefresh } from "@tabler/icons-react";
import dayjs from "dayjs";
import type { TFunction } from "i18next";
import { DATE_FORMAT, STATUS_COLORS } from "./waConversations.const";

interface WaConversationsTableActions {
  numberLabel: (id: string) => string;
  onOpen: (conversation: WaConversation) => void;
  onReset: (conversation: WaConversation) => void;
}

export const getWaConversationsTableColumns = (
  t: TFunction,
  actions: WaConversationsTableActions,
): DataTableColumn<WaConversation>[] => [
  { accessor: "contactWaId", title: t("conversations.contact"), width: 160 },
  { accessor: "contactName", title: t("conversations.name"), width: 180 },
  {
    accessor: "phoneNumberId",
    title: t("conversations.number"),
    width: 160,
    render: (conversation) => actions.numberLabel(conversation.phoneNumberId),
  },
  {
    accessor: "status",
    title: t("conversations.status"),
    width: 130,
    render: (conversation) => (
      <Badge color={STATUS_COLORS[conversation.status]} variant="light">
        {t(`conversations.statuses.${conversation.status}`)}
      </Badge>
    ),
  },
  { accessor: "currentNodeId", title: t("conversations.currentNode"), width: 160 },
  {
    accessor: "lastInboundAt",
    title: t("conversations.lastInbound"),
    width: 160,
    render: (conversation) =>
      conversation.lastInboundAt ? dayjs(conversation.lastInboundAt).format(DATE_FORMAT) : "—",
  },
  {
    accessor: "actions",
    title: "",
    width: 100,
    render: (conversation) => (
      <Group gap="xs" wrap="nowrap">
        <Tooltip label={t("conversations.view")}>
          <ActionIcon variant="subtle" onClick={() => actions.onOpen(conversation)}>
            <IconMessages size={18} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label={t("conversations.reset")}>
          <ActionIcon variant="subtle" color="orange" onClick={() => actions.onReset(conversation)}>
            <IconRefresh size={18} />
          </ActionIcon>
        </Tooltip>
      </Group>
    ),
  },
];
