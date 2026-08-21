import type { DataTableColumn } from "@/libs/ui/table";
import type { AuditAction, AuditLog } from "@/models";
import { Badge } from "@mantine/core";
import type { TFunction } from "i18next";
import { ActionFilterContainer, AuditApplicationFilterContainer, AuditEmailFilterContainer } from "../containers";

interface AuditTableFilters {
  action: AuditAction | null;
  applicationId: string | null;
  email: string;
}

export const getAuditTableColumns = (
  t: TFunction,
  filters: AuditTableFilters,
): DataTableColumn<AuditLog>[] =>
  [
    {
      accessor: "occurredAt",
      title: t("master.occurredAt", "Time"),
      width: 180,
    },
    {
      accessor: "action",
      title: t("master.action", "Action"),
      width: 160,
      filter: <ActionFilterContainer />,
      filtering: filters.action !== null,
    },
    {
      accessor: "result",
      title: t("master.result", "Result"),
      width: 240,
      render: (log) => (
        <Badge color={log.result === "SUCCESS" ? "green" : "red"}>
          {log.result}
          {log.failureReason ? ` — ${log.failureReason}` : ""}
        </Badge>
      ),
    },
    {
      accessor: "applicationName",
      title: t("master.application", "Application"),
      width: 160,
      filter: <AuditApplicationFilterContainer />,
      filtering: filters.applicationId !== null,
    },
    {
      accessor: "userEmail",
      title: t("master.email", "Email"),
      width: 220,
      filter: <AuditEmailFilterContainer />,
      filtering: filters.email !== "",
    },
    {
      accessor: "origin",
      title: t("master.origin", "Origin"),
      width: 160,
    },
    {
      accessor: "host",
      title: t("master.host", "Host"),
      width: 140,
    },
    {
      accessor: "userAgent",
      title: t("master.userAgent", "User agent"),
    },
    {
      accessor: "referer",
      title: t("master.referer", "Referer"),
      width: 160,
    },
  ] as const;
