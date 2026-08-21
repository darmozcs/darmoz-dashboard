import { useApplicationsQuery } from "@/DAL";
import { DataTable } from "@/libs/ui/table";
import type { Aplication } from "@/models";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { EditApplicationLimitModal } from "../../components/EditApplicationLimitModal/EditApplicationLimitModal";
import { getApplicationsTableColumns } from "../../const/applicationsTableColumns.const";

export const ApplicationsMasterTableContainer = () => {
  const { t } = useTranslation("applications");
  const [selectedApplication, setSelectedApplication] =
    useState<Aplication | null>(null);

  const { data, isLoading } = useApplicationsQuery();
  const applications = data?.data ?? [];

  const columns = getApplicationsTableColumns(t, setSelectedApplication);

  return (
    <>
      <DataTable
        records={applications}
        columns={columns}
        fetching={isLoading}
      />
      <EditApplicationLimitModal
        application={selectedApplication}
        onClose={() => setSelectedApplication(null)}
      />
    </>
  );
};
