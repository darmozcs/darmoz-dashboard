import { confirmDelete } from "@/libs/ui/confirm/confirmDelete";
import type { DataTableColumn } from "@/libs/ui/table";
import type { Aplication } from "@/models";
import { ActionIcon, Group } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import type { TFunction } from "i18next";

const formatTtl = (seconds: number | null, t: TFunction) =>
  seconds == null
    ? t("master.tokenTtlDefault", "Default")
    : `${Math.round(seconds / 60)} min`;

interface ApplicationsTableActions {
  onEdit: (application: Aplication) => void;
  onDelete: (application: Aplication) => void;
}

export const getApplicationsTableColumns = (
  t: TFunction,
  actions: ApplicationsTableActions,
): DataTableColumn<Aplication>[] =>
  [
    {
      accessor: "serviceName",
      title: t("master.serviceName", "Service name"),
      width: 180,
    },
    {
      accessor: "name",
      title: t("master.name", "Name"),
      width: 200,
    },
    {
      accessor: "description",
      title: t("master.description", "Description"),
    },
    {
      accessor: "unverifiedLoginLimit",
      title: t("master.unverifiedLoginLimit", "Unverified login limit"),
      width: 200,
    },
    {
      accessor: "accessTokenTtlSeconds",
      title: t("master.tokenTtl", "Token (login / refresh)"),
      width: 190,
      render: (application) =>
        application.accessTokenTtlSeconds == null &&
        application.refreshedAccessTokenTtlSeconds == null
          ? t("master.tokenTtlDefault", "Default")
          : `${formatTtl(application.accessTokenTtlSeconds, t)} / ${formatTtl(
              application.refreshedAccessTokenTtlSeconds ??
                application.accessTokenTtlSeconds,
              t,
            )}`,
    },
    {
      accessor: "actions",
      title: "",
      width: 90,
      render: (application) => (
        <Group gap="xs" wrap="nowrap">
          <ActionIcon
            variant="subtle"
            onClick={() => actions.onEdit(application)}
          >
            <IconPencil size={18} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="red"
            onClick={() =>
              confirmDelete({
                title: t("deleteTitle", "Delete application"),
                message: t("deleteMessage", {
                  defaultValue: 'Are you sure you want to delete "{{name}}"?',
                  name: application.name,
                }),
                onConfirm: () => actions.onDelete(application),
              })
            }
          >
            <IconTrash size={18} />
          </ActionIcon>
        </Group>
      ),
    },
  ] as const;
