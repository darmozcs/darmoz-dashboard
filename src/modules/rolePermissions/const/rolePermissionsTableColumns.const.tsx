import { confirmDelete } from "@/libs/ui/confirm/confirmDelete";
import type { DataTableColumn } from "@/libs/ui/table";
import type { RolePermission } from "@/models";
import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import type { TFunction } from "i18next";

export const getRolePermissionsTableColumns = (
  t: TFunction,
  onDelete: (rolePermission: RolePermission) => void,
): DataTableColumn<RolePermission>[] =>
  [
    {
      accessor: "applicationName",
      title: t("master.application", "Application"),
      width: 180,
    },
    {
      accessor: "role",
      title: t("master.role", "Role"),
      width: 180,
    },
    {
      accessor: "service",
      title: t("master.service", "Service"),
      width: 160,
    },
    {
      accessor: "httpMethod",
      title: t("master.httpMethod", "Method"),
      width: 100,
    },
    {
      accessor: "endpointPattern",
      title: t("master.endpointPattern", "Endpoint pattern"),
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
      render: (rolePermission) => (
        <ActionIcon
          variant="subtle"
          color="red"
          onClick={() =>
            confirmDelete({
              title: t("deleteTitle", "Delete permission"),
              message: t(
                "deleteMessage",
                "Are you sure you want to delete this permission?",
              ),
              onConfirm: () => onDelete(rolePermission),
            })
          }
        >
          <IconTrash size={18} />
        </ActionIcon>
      ),
    },
  ] as const;
