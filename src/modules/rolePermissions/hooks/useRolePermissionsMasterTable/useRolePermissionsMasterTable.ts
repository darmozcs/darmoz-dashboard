import { useDeleteRolePermissionMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import type { RolePermission } from "@/models";
import { notifications } from "@mantine/notifications";
import { useTranslation } from "react-i18next";

export const useRolePermissionsMasterTable = () => {
  const { t } = useTranslation("permissions");
  const deleteRolePermissionMutation = useDeleteRolePermissionMutation();

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
        notifications.show({
          color: "red",
          title: "Error",
          message: extractErrorMessage(error, "Delete failed"),
        });
      },
    });
  };

  return { handleDelete };
};
