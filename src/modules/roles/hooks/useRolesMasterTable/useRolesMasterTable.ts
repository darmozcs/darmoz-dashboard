import { useDeleteRoleMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import type { Role } from "@/models";
import { notifications } from "@mantine/notifications";
import { useTranslation } from "react-i18next";

export const useRolesMasterTable = () => {
  const { t } = useTranslation("roles");
  const deleteRoleMutation = useDeleteRoleMutation();

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
