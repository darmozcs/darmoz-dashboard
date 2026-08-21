import { useScheduledEmailsQuery } from "@/DAL";
import { DataTable } from "@/libs/ui/table";
import { useScheduledEmailsFiltersStore } from "@/store";
import { useTranslation } from "react-i18next";
import { EditScheduledEmailModal } from "../../components/EditScheduledEmailModal/EditScheduledEmailModal";
import { getScheduledEmailsTableColumns } from "../../const/scheduledEmailsTableColumns.const";
import { useScheduledEmailsMasterTable } from "../../hooks";

export const ScheduledEmailsMasterTableContainer = () => {
  const { t } = useTranslation("scheduledEmails");
  const { status, selectedScheduledEmail, setSelectedScheduledEmail } =
    useScheduledEmailsFiltersStore();

  const { data, isLoading } = useScheduledEmailsQuery({ status });
  const { handleCancel } = useScheduledEmailsMasterTable();
  const scheduledEmails = data?.data ?? [];

  const columns = getScheduledEmailsTableColumns(
    t,
    { status },
    {
      onEdit: setSelectedScheduledEmail,
      onCancel: handleCancel,
    },
  );

  return (
    <>
      <DataTable
        records={scheduledEmails}
        columns={columns}
        fetching={isLoading}
      />
      <EditScheduledEmailModal
        scheduledEmail={selectedScheduledEmail}
        onClose={() => setSelectedScheduledEmail(null)}
      />
    </>
  );
};
