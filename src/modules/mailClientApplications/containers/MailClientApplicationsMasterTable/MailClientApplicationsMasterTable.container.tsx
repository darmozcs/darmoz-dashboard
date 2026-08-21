import {
  useDeleteMailClientApplicationMutation,
  useMailClientApplicationsQuery,
} from "@/DAL";
import { extractErrorMessage } from "@/libs";
import { DataTable } from "@/libs/ui/table";
import type { MailClientApplication } from "@/models";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { EditMailClientApplicationModal } from "../../components/EditMailClientApplicationModal/EditMailClientApplicationModal";
import { getMailClientApplicationsTableColumns } from "../../const/mailClientApplicationsTableColumns.const";

export const MailClientApplicationsMasterTableContainer = () => {
  const { t } = useTranslation("mailApplications");
  const [selectedApplication, setSelectedApplication] =
    useState<MailClientApplication | null>(null);

  const { data, isLoading } = useMailClientApplicationsQuery();
  const deleteMutation = useDeleteMailClientApplicationMutation();
  const applications = data?.data ?? [];

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

  const columns = getMailClientApplicationsTableColumns(t, {
    onEdit: setSelectedApplication,
    onDelete: handleDelete,
  });

  return (
    <>
      <DataTable
        records={applications}
        columns={columns}
        fetching={isLoading}
      />
      <EditMailClientApplicationModal
        application={selectedApplication}
        onClose={() => setSelectedApplication(null)}
      />
    </>
  );
};
