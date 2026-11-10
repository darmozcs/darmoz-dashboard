import { confirmDelete } from "@/libs/ui/confirm/confirmDelete";
import type { DataTableColumn } from "@/libs/ui/table";
import type { WaFlowSummary } from "@/models";
import { ActionIcon, Badge, Group, Tooltip } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import dayjs from "dayjs";
import type { TFunction } from "i18next";

interface WaFlowsTableActions {
  entryFlowId: string | null;
  onOpen: (flow: WaFlowSummary) => void;
  onDelete: (flow: WaFlowSummary) => void;
}

export const getWaFlowsTableColumns = (
  t: TFunction,
  actions: WaFlowsTableActions,
): DataTableColumn<WaFlowSummary>[] => [
  {
    accessor: "name",
    title: t("flows.name"),
    width: 260,
    render: (flow) => (
      <Group gap="xs">
        {flow.name}
        {flow.id === actions.entryFlowId && (
          <Badge size="xs" variant="light">
            {t("flows.entry")}
          </Badge>
        )}
      </Group>
    ),
  },
  {
    accessor: "publishedVersion",
    title: t("flows.version"),
    width: 200,
    render: (flow) =>
      flow.publishedVersion ? (
        <Group gap="xs">
          {`v${flow.publishedVersion} · ${dayjs(flow.publishedAt).format("DD/MM HH:mm")}`}
          {flow.hasUnpublishedChanges && (
            <Badge size="xs" color="yellow" variant="light">
              {t("flows.unpublishedChanges")}
            </Badge>
          )}
        </Group>
      ) : (
        <Badge color="gray" variant="light">
          {t("flows.notPublished")}
        </Badge>
      ),
  },
  {
    accessor: "actions",
    title: "",
    width: 100,
    render: (flow) => (
      <Group gap="xs" wrap="nowrap">
        <Tooltip label={t("flows.edit")}>
          <ActionIcon variant="subtle" onClick={() => actions.onOpen(flow)}>
            <IconEdit size={18} />
          </ActionIcon>
        </Tooltip>
        <ActionIcon
          variant="subtle"
          color="red"
          onClick={() =>
            confirmDelete({
              title: t("flows.deleteTitle"),
              message: t("flows.deleteMessage", { name: flow.name }),
              onConfirm: () => actions.onDelete(flow),
            })
          }
        >
          <IconTrash size={18} />
        </ActionIcon>
      </Group>
    ),
  },
];
