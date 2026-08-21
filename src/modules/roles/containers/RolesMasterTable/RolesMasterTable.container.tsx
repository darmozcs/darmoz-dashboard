import { useDeleteRoleMutation, useRolesQuery } from "@/DAL";
import { DataTable } from "@/libs/ui/table";
import type { Role } from "@/models";
import { notifications } from "@mantine/notifications";
import { useTranslation } from "react-i18next";
import { getRolesTableColumns } from "../../const/rolesTableColumns.const";

export const RolesMasterTableContainer = () => {
  const { t } = useTranslation("roles");
  const { data, isLoading } = useRolesQuery();
  const deleteRoleMutation = useDeleteRoleMutation();
  const roles = data?.data ?? [];

  const handleDelete = (role: Role) => {
    deleteRoleMutation.mutate(role.id, {
      onSuccess: () => {
        notifications.show({
          color: "green",
          title: "Success",
          message: t("deleteSuccess", "Role deleted"),
        });
      },
      onError: (error: unknown) => {
        const message =
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || "Delete failed";
        notifications.show({
          color: "red",
          title: "Error",
          message,
        });
      },
    });
  };

  const columns = getRolesTableColumns(t, handleDelete);

  return <DataTable records={roles} columns={columns} fetching={isLoading} />;
};
