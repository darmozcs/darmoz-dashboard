import { confirmDelete } from "@/libs/ui/confirm/confirmDelete";
import type { DataTableColumn } from "@/libs/ui/table";
import type { WaIntegration } from "@/models";
import { ActionIcon, Group, Text, Tooltip } from "@mantine/core";
import { IconPencil, IconPlayerPlay, IconTrash } from "@tabler/icons-react";
import type { TFunction } from "i18next";

interface WaIntegrationsTableActions {
  onTest: (integration: WaIntegration) => void;
  onEdit: (integration: WaIntegration) => void;
  onDelete: (integration: WaIntegration) => void;
}

export const getWaIntegrationsTableColumns = (
  t: TFunction,
  actions: WaIntegrationsTableActions,
): DataTableColumn<WaIntegration>[] => [
  {
    accessor: "applicationName",
    title: t("integrations.application"),
    width: 200,
  },
  {
    accessor: "baseUrl",
    title: t("integrations.baseUrl"),
    width: 280,
    render: (integration) => (
      <Text size="sm" ff="monospace" truncate>
        {integration.baseUrl}
      </Text>
    ),
  },
  {
    accessor: "authHeaderName",
    title: t("integrations.headerName"),
    width: 150,
  },
  {
    accessor: "authHeaderValueMasked",
    title: t("integrations.headerValue"),
    width: 140,
  },
  {
    accessor: "actions",
    title: "",
    width: 130,
    render: (integration) => (
      <Group gap="xs" wrap="nowrap">
        <Tooltip label={t("integrations.test")}>
          <ActionIcon variant="subtle" onClick={() => actions.onTest(integration)}>
            <IconPlayerPlay size={18} />
          </ActionIcon>
        </Tooltip>
        <ActionIcon variant="subtle" onClick={() => actions.onEdit(integration)}>
          <IconPencil size={18} />
        </ActionIcon>
        <ActionIcon
          variant="subtle"
          color="red"
          onClick={() =>
            confirmDelete({
              title: t("integrations.deleteTitle"),
              message: t("integrations.deleteMessage", {
                name: integration.applicationName,
              }),
              onConfirm: () => actions.onDelete(integration),
            })
          }
        >
          <IconTrash size={18} />
        </ActionIcon>
      </Group>
    ),
  },
];
