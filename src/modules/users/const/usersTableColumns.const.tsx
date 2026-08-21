import { confirmDelete } from "@/libs/ui/confirm/confirmDelete";
import type { DataTableColumn } from "@/libs/ui/table";
import type { User } from "@/models";
import { ActionIcon, Group, Switch } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import type { TFunction } from "i18next";
import { EmailFilterContainer } from "../containers";

interface UsersTableActions {
  onToggleEnabled: (user: User) => void;
  onEditRoles: (user: User) => void;
  onDelete: (user: User) => void;
}

export const getUsersTableColumns = (
  t: TFunction,
  search: string,
  actions: UsersTableActions,
): DataTableColumn<User>[] =>
  [
    {
      accessor: "email",
      title: t("master.email", "Email"),
      width: 260,
      filter: <EmailFilterContainer />,
      filtering: search !== "",
    },
    {
      accessor: "enabled",
      title: t("master.status", "Status"),
      width: 90,
      render: (user) => (
        <Switch
          checked={user.enabled}
          onChange={() => actions.onToggleEnabled(user)}
        />
      ),
    },
    {
      accessor: "emailVerified",
      title: t("master.emailVerified", "Email verified"),
      width: 140,
    },
    {
      accessor: "unverifiedLoginCount",
      title: t("master.unverifiedLoginCount", "Unverified logins"),
      width: 140,
    },
    {
      accessor: "applicationName",
      title: t("master.application", "Application"),
      width: 180,
    },
    {
      accessor: "roles",
      title: t("master.roles", "Roles"),
      width: 150,
      render: (user) => user.roles.join(", "),
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
      render: (user) => (
        <Group gap="xs" wrap="nowrap">
          <ActionIcon
            variant="subtle"
            onClick={() => actions.onEditRoles(user)}
          >
            <IconPencil size={18} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="red"
            onClick={() =>
              confirmDelete({
                title: t("deleteTitle", "Delete user"),
                message: t("deleteMessage", {
                  defaultValue: 'Are you sure you want to delete "{{email}}"?',
                  email: user.email,
                }),
                onConfirm: () => actions.onDelete(user),
              })
            }
          >
            <IconTrash size={18} />
          </ActionIcon>
        </Group>
      ),
    },
  ] as const;
