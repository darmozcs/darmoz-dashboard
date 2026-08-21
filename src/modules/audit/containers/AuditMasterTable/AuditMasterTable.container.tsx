import { useAuditLogQuery } from "@/DAL";
import { DataTable } from "@/libs/ui/table";
import { useAuditFiltersStore } from "@/store";
import { useTranslation } from "react-i18next";
import { getAuditTableColumns } from "../../const/auditTableColumns.const";

const PAGE_SIZE = 20;

export const AuditMasterTableContainer = () => {
  const { t } = useTranslation("audit");
  const { action, applicationId, email, from, to, page, setPage } =
    useAuditFiltersStore();

  const { data, isLoading } = useAuditLogQuery({
    action: action ?? undefined,
    applicationId: applicationId ?? undefined,
    email: email || undefined,
    from: from ?? undefined,
    to: to ?? undefined,
    page: page - 1,
    size: PAGE_SIZE,
  });

  const logs = data?.data?.content ?? [];
  const totalElements = data?.data?.totalElements ?? 0;

  const columns = getAuditTableColumns(t, { action, applicationId, email });

  return (
    <DataTable
      records={logs}
      columns={columns}
      totalRecords={totalElements}
      page={page}
      onPageChange={setPage}
      recordsPerPage={PAGE_SIZE}
      fetching={isLoading}
    />
  );
};
