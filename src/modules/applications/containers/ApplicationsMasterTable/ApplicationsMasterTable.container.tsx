import { useApplicationsQuery, useDeleteApplicationMutation } from "@/DAL";
import { DataTable } from "@/libs/ui/table";
import type { Aplication } from "@/models";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { EditApplicationModal } from "../../components/EditApplicationModal/EditApplicationModal";
import { getApplicationsTableColumns } from "../../const/applicationsTableColumns.const";

export const ApplicationsMasterTableContainer = () => {
  const { t } = useTranslation("applications");
  const [selectedApplication, setSelectedApplication] =
    useState<Aplication | null>(null);

  const { data, isLoading } = useApplicationsQuery();
  const deleteApplicationMutation = useDeleteApplicationMutation();
  const applications = data?.data ?? [];

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
        const message =
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || "Delete failed";
        notifications.show({ color: "red", title: "Error", message });
      },
    });
  };

  const columns = getApplicationsTableColumns(t, {
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
      <EditApplicationModal
        application={selectedApplication}
        onClose={() => setSelectedApplication(null)}
      />
    </>
  );
};
