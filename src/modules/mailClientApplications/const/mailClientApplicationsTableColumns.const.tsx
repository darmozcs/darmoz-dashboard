import { confirmDelete } from "@/libs/ui/confirm/confirmDelete";
import type { DataTableColumn } from "@/libs/ui/table";
import type { MailClientApplication } from "@/models";
import { ActionIcon, Badge, Group } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import type { TFunction } from "i18next";

interface MailClientApplicationsTableActions {
  onEdit: (application: MailClientApplication) => void;
  onDelete: (application: MailClientApplication) => void;
}

export const getMailClientApplicationsTableColumns = (
  t: TFunction,
  actions: MailClientApplicationsTableActions,
): DataTableColumn<MailClientApplication>[] =>
  [
    {
      accessor: "name",
      title: t("master.name", "Name"),
      width: 220,
    },
    {
      accessor: "active",
      title: t("master.active", "Active"),
      width: 120,
      render: (application) => (
        <Badge color={application.active ? "green" : "gray"} variant="light">
          {application.active ? t("common:yes", "Yes") : t("common:no", "No")}
        </Badge>
      ),
    },
    {
      accessor: "createdAt",
      title: t("master.createdAt", "Created at"),
      width: 180,
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
