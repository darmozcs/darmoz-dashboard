import { useApplicationsQuery } from "@/DAL";
import { DataTable } from "@/libs/ui/table";
import { useApplicationsFiltersStore } from "@/store";
import { useTranslation } from "react-i18next";
import { EditApplicationModal } from "../../components/EditApplicationModal/EditApplicationModal";
import { getApplicationsTableColumns } from "../../const/applicationsTableColumns.const";
import { useApplicationsMasterTable } from "../../hooks";

export const ApplicationsMasterTableContainer = () => {
  const { t } = useTranslation("applications");
  const { selectedApplication, setSelectedApplication } =
    useApplicationsFiltersStore();

  const { data, isLoading } = useApplicationsQuery();
  const { handleDelete } = useApplicationsMasterTable();
  const applications = data?.data ?? [];

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
