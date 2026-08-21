import { useDeleteEmailTemplateMutation, useEmailTemplatesQuery } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import { DataTable } from "@/libs/ui/table";
import type { EmailTemplate } from "@/models";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { EditEmailTemplateModal } from "../../components/EditEmailTemplateModal/EditEmailTemplateModal";
import { getEmailTemplatesTableColumns } from "../../const/emailTemplatesTableColumns.const";

export const EmailTemplatesMasterTableContainer = () => {
  const { t } = useTranslation("emailTemplates");
  const [selectedTemplate, setSelectedTemplate] =
    useState<EmailTemplate | null>(null);

  const { data, isLoading } = useEmailTemplatesQuery();
  const deleteMutation = useDeleteEmailTemplateMutation();
  const templates = data?.data ?? [];

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

  const columns = getEmailTemplatesTableColumns(t, {
    onEdit: setSelectedTemplate,
    onDelete: handleDelete,
  });

  return (
    <>
      <DataTable records={templates} columns={columns} fetching={isLoading} />
      <EditEmailTemplateModal
        template={selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
      />
    </>
  );
};
