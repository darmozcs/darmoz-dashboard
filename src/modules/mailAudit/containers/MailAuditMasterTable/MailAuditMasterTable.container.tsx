import { useMailAuditLogsQuery } from "@/DAL";
import { DataTable } from "@/libs/ui/table";
import { useMailAuditFiltersStore } from "@/store";
import { useTranslation } from "react-i18next";
import { getMailAuditTableColumns } from "../../const/mailAuditTableColumns.const";
import { useMailAuditMasterTable } from "../../hooks";

export const MailAuditMasterTableContainer = () => {
  const { t } = useTranslation("mailAudit");
  const { recipient, accion, clientId, from, to, setClientId } =
    useMailAuditFiltersStore();

  const { data, isLoading } = useMailAuditLogsQuery({
    recipient: recipient || undefined,
    clientId: clientId || undefined,
    accion: accion || undefined,
    from: from || undefined,
    to: to || undefined,
  });
  const { handleResend } = useMailAuditMasterTable();
  const logs = data?.data ?? [];

  const columns = getMailAuditTableColumns(
    t,
    { recipient, accion, clientId },
    { onResend: handleResend },
    setClientId,
  );

  return (
    <DataTable records={logs} columns={columns} fetching={isLoading} />
  );
};
