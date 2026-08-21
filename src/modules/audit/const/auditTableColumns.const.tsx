import type { DataTableColumn } from "@/libs/ui/table";
import type { AuditLog } from "@/models";
import { Badge } from "@mantine/core";
import type { TFunction } from "i18next";

export const getAuditTableColumns = (
  t: TFunction,
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
    },
    {
      accessor: "userEmail",
      title: t("master.email", "Email"),
      width: 220,
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
