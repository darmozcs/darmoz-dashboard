import type { WaMessageLog } from "@/models";
import { Code, Modal, ScrollArea, SimpleGrid, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { DATE_FORMAT } from "../../const/waMessageLogs.const";

interface MessageLogDetailModalProps {
  log: WaMessageLog | null;
  numberLabel: (id: string | null) => string;
  onClose: () => void;
}

const Field = ({ label, value }: { label: string; value: string | null }) => (
  <Stack gap={0}>
    <Text size="xs" c="dimmed">
      {label}
    </Text>
    <Text size="sm" style={{ wordBreak: "break-all" }}>
      {value || "—"}
    </Text>
  </Stack>
);

export const MessageLogDetailModal = ({ log, numberLabel, onClose }: MessageLogDetailModalProps) => {
  const { t } = useTranslation("whatsapp");

  return (
    <Modal opened={log !== null} onClose={onClose} title={t("messageLogs.detail")} size="lg">
      {log && (
        <Stack>
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <Field label={t("messageLogs.date")} value={dayjs(log.createdAt).format(DATE_FORMAT)} />
            <Field label={t("messageLogs.direction")} value={t(`messageLogs.directions.${log.direction}`)} />
            <Field label={t("messageLogs.number")} value={numberLabel(log.phoneNumberId)} />
            <Field label={t("messageLogs.contact")} value={log.contactWaId} />
            <Field label={t("messageLogs.type")} value={log.type} />
            <Field label={t("messageLogs.status")} value={t(`conversations.messageStatuses.${log.status}`)} />
            <Field label={t("messageLogs.waMessageId")} value={log.waMessageId} />
            <Field label={t("messageLogs.conversation")} value={log.conversationId} />
          </SimpleGrid>
          {log.error && <Field label={t("messageLogs.error")} value={log.error} />}
          <Stack gap={4}>
            <Text size="xs" c="dimmed">
              {t("messageLogs.payload")}
            </Text>
            <ScrollArea.Autosize mah={360}>
              <Code block>{JSON.stringify(log.payload ?? {}, null, 2)}</Code>
            </ScrollArea.Autosize>
          </Stack>
        </Stack>
      )}
    </Modal>
  );
};
