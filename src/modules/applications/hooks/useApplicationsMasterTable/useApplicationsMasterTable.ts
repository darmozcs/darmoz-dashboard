import { useDeleteApplicationMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import type { Aplication } from "@/models";
import { notifications } from "@mantine/notifications";
import { useTranslation } from "react-i18next";

export const useApplicationsMasterTable = () => {
  const { t } = useTranslation("applications");
  const deleteApplicationMutation = useDeleteApplicationMutation();

  const handleDelete = (application: Aplication) => {
    deleteApplicationMutation.mutate(application.id, {
      onSuccess: () => {
        notifications.show({
          color: "green",
          title: "Success",
          message: t("deleteSuccess", "Application deleted"),
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
