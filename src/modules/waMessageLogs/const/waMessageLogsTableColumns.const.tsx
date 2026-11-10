import type { DataTableColumn } from "@/libs/ui/table";
import type { WaMessageLog } from "@/models";
import { MESSAGE_STATUS_COLORS } from "@/modules/waConversations/const/waConversations.const";
import { Badge, Text } from "@mantine/core";
import dayjs from "dayjs";
import type { TFunction } from "i18next";
import { DATE_FORMAT, DIRECTION_COLORS } from "./waMessageLogs.const";

export const getWaMessageLogsTableColumns = (
  t: TFunction,
  numberLabel: (id: string | null) => string,
): DataTableColumn<WaMessageLog>[] => [
  {
    accessor: "createdAt",
    title: t("messageLogs.date"),
    width: 170,
    render: (log) => dayjs(log.createdAt).format(DATE_FORMAT),
  },
  {
    accessor: "direction",
    title: t("messageLogs.direction"),
    width: 120,
    render: (log) => (
      <Badge color={DIRECTION_COLORS[log.direction]} variant="light">
        {t(`messageLogs.directions.${log.direction}`)}
      </Badge>
    ),
  },
  {
    accessor: "phoneNumberId",
    title: t("messageLogs.number"),
    width: 160,
    render: (log) => numberLabel(log.phoneNumberId),
  },
  { accessor: "contactWaId", title: t("messageLogs.contact"), width: 150 },
  { accessor: "type", title: t("messageLogs.type"), width: 120 },
  {
    accessor: "status",
    title: t("messageLogs.status"),
    width: 130,
    render: (log) => (
      <Badge color={MESSAGE_STATUS_COLORS[log.status]} variant="light">
        {t(`conversations.messageStatuses.${log.status}`)}
      </Badge>
    ),
  },
  {
    accessor: "error",
    title: t("messageLogs.error"),
    render: (log) =>
      log.error ? (
        <Text size="sm" c="red" lineClamp={1}>
          {log.error}
        </Text>
      ) : (
        "—"
      ),
  },
];
