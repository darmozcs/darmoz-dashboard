import { confirmDelete } from "@/libs/ui/confirm/confirmDelete";
import type { DataTableColumn } from "@/libs/ui/table";
import type { Role } from "@/models";
import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import type { TFunction } from "i18next";

export const getRolesTableColumns = (
  t: TFunction,
  onDelete: (role: Role) => void,
): DataTableColumn<Role>[] =>
  [
    {
      accessor: "applicationName",
      title: t("master.application", "Application"),
      width: 200,
    },
    {
      accessor: "name",
      title: t("master.name", "Name"),
      width: 220,
    },
    {
      accessor: "description",
      title: t("master.description", "Description"),
    },
    {
      accessor: "createdAt",
      title: t("master.createdAt", "Created at"),
      width: 180,
    },
    {
      accessor: "actions",
      title: "",
      width: 60,
      render: (role) => (
        <ActionIcon
          variant="subtle"
          color="red"
          onClick={() =>
            confirmDelete({
              title: t("deleteTitle", "Delete role"),
              message: t("deleteMessage", {
                defaultValue: 'Are you sure you want to delete "{{name}}"?',
                name: role.name,
              }),
              onConfirm: () => onDelete(role),
            })
          }
        >
          <IconTrash size={18} />
        </ActionIcon>
      ),
    },
  ] as const;
