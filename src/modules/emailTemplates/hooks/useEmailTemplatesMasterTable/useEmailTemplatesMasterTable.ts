import { useDeleteEmailTemplateMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import type { EmailTemplate } from "@/models";
import { notifications } from "@mantine/notifications";
import { useTranslation } from "react-i18next";

export const useEmailTemplatesMasterTable = () => {
  const { t } = useTranslation("emailTemplates");
  const deleteMutation = useDeleteEmailTemplateMutation();

  const handleDelete = (template: EmailTemplate) => {
    deleteMutation.mutate(template.id, {
      onSuccess: () => {
        notifications.show({
          color: "green",
          title: "Success",
          message: t("deleteSuccess", "Template deleted"),
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
