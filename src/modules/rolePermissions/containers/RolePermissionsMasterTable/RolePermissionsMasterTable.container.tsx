import { useDeleteRolePermissionMutation, useRolePermissionsQuery } from "@/DAL";
import { DataTable } from "@/libs/ui/table";
import type { RolePermission } from "@/models";
import { notifications } from "@mantine/notifications";
import { useTranslation } from "react-i18next";
import { getRolePermissionsTableColumns } from "../../const/rolePermissionsTableColumns.const";

export const RolePermissionsMasterTableContainer = () => {
  const { t } = useTranslation("permissions");
  const { data, isLoading } = useRolePermissionsQuery();
  const deleteRolePermissionMutation = useDeleteRolePermissionMutation();
  const rolePermissions = data?.data ?? [];

  const handleDelete = (rolePermission: RolePermission) => {
    deleteRolePermissionMutation.mutate(rolePermission.id, {
      onSuccess: () => {
        notifications.show({
          color: "green",
          title: "Success",
          message: t("deleteSuccess", "Permission deleted"),
        });
      },
      onError: (error: unknown) => {
        const message =
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || "Delete failed";
        notifications.show({ color: "red", title: "Error", message });
      },
    });
  };

  const columns = getRolePermissionsTableColumns(t, handleDelete);

  return (
    <DataTable records={rolePermissions} columns={columns} fetching={isLoading} />
  );
};
