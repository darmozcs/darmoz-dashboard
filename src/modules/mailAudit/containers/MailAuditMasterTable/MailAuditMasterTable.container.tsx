import { useMailAuditLogsQuery, useResendMailAuditLogMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import { DataTable } from "@/libs/ui/table";
import type { MailAuditLog } from "@/models";
import { MailClientApplicationSelect } from "@/modules/common/components";
import { Group, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useDebouncedValue } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getMailAuditTableColumns } from "../../const/mailAuditTableColumns.const";

export const MailAuditMasterTableContainer = () => {
  const { t } = useTranslation("mailAudit");
  const [recipient, setRecipient] = useState("");
  const [debouncedRecipient] = useDebouncedValue(recipient, 300);
  const [clientId, setClientId] = useState<string | null>(null);
  const [accion, setAccion] = useState("");
  const [debouncedAccion] = useDebouncedValue(accion, 300);
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);

  const { data, isLoading } = useMailAuditLogsQuery({
    recipient: debouncedRecipient || undefined,
    clientId: clientId || undefined,
    accion: debouncedAccion || undefined,
    from: from || undefined,
    to: to || undefined,
  });
  const resendMutation = useResendMailAuditLogMutation();
  const logs = data?.data ?? [];

  const handleResend = (log: MailAuditLog) => {
    resendMutation.mutate(log.id, {
      onSuccess: () => {
        notifications.show({
          color: "green",
          title: "Success",
          message: t("resendSuccess", "Email resent"),
        });
      },
      onError: (error: unknown) => {
        notifications.show({
          color: "red",
          title: "Error",
          message: extractErrorMessage(error, "Resend failed"),
        });
      },
    });
  };

  const columns = getMailAuditTableColumns(t, { onResend: handleResend });

  return (
    <>
      <Group wrap="wrap" gap="sm">
        <TextInput
          placeholder={t("filters.recipient", "Search by recipient...")}
          value={recipient}
          onChange={(event) => setRecipient(event.currentTarget.value)}
          w={220}
        />
        <MailClientApplicationSelect
          placeholder={t("filters.application", "Application")}
          value={clientId}
          onChange={setClientId}
          clearable
          w={200}
        />
        <TextInput
          placeholder={t("filters.accion", "Action")}
          value={accion}
          onChange={(event) => setAccion(event.currentTarget.value)}
          w={160}
        />
        <DateTimePicker
          placeholder={t("filters.from", "From")}
          value={from}
          onChange={setFrom}
          clearable
          w={200}
        />
        <DateTimePicker
          placeholder={t("filters.to", "To")}
          value={to}
          onChange={setTo}
          clearable
          w={200}
        />
      </Group>
      <DataTable records={logs} columns={columns} fetching={isLoading} />
    </>
  );
};
