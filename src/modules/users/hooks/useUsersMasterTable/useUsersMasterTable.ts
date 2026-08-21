import { useDeleteUserMutation, useUpdateUserMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import type { User } from "@/models";
import { notifications } from "@mantine/notifications";
import { useTranslation } from "react-i18next";

export const useUsersMasterTable = () => {
  const { t } = useTranslation("users");
  const updateUserMutation = useUpdateUserMutation();
  const deleteUserMutation = useDeleteUserMutation();

  const handleToggleEnabled = (user: User) => {
    updateUserMutation.mutate(
      { id: user.id, payload: { enabled: !user.enabled } },
      {
        onError: (error: unknown) => {
          notifications.show({
            color: "red",
            title: "Error",
            message: extractErrorMessage(error, "Update failed"),
          });
        },
      },
    );
  };

  const handleDelete = (user: User) => {
    deleteUserMutation.mutate(user.id, {
      onSuccess: () => {
        notifications.show({
          color: "green",
          title: "Success",
          message: t("deleteSuccess", "User deleted"),
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

  return { handleToggleEnabled, handleDelete };
};
