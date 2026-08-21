import { useMailClientApplicationsQuery } from "@/DAL";
import { DataTable } from "@/libs/ui/table";
import { useMailClientApplicationsFiltersStore } from "@/store";
import { useTranslation } from "react-i18next";
import { EditMailClientApplicationModal } from "../../components/EditMailClientApplicationModal/EditMailClientApplicationModal";
import { getMailClientApplicationsTableColumns } from "../../const/mailClientApplicationsTableColumns.const";
import { useMailClientApplicationsMasterTable } from "../../hooks";

export const MailClientApplicationsMasterTableContainer = () => {
  const { t } = useTranslation("mailApplications");
  const { selectedApplication, setSelectedApplication } =
    useMailClientApplicationsFiltersStore();

  const { data, isLoading } = useMailClientApplicationsQuery();
  const { handleDelete } = useMailClientApplicationsMasterTable();
  const applications = data?.data ?? [];

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
