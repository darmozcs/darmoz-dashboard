import { useDeleteMailClientApplicationMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import type { MailClientApplication } from "@/models";
import { notifications } from "@mantine/notifications";
import { useTranslation } from "react-i18next";

export const useMailClientApplicationsMasterTable = () => {
  const { t } = useTranslation("mailApplications");
  const deleteMutation = useDeleteMailClientApplicationMutation();

  const handleDelete = (application: MailClientApplication) => {
    deleteMutation.mutate(application.id, {
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
