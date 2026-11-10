import type { WaMessageLog } from "@/models";
import { Badge, Group, Paper, Text } from "@mantine/core";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { DATE_FORMAT, MESSAGE_STATUS_COLORS } from "../../const/waConversations.const";

interface MessageBubbleProps {
  message: WaMessageLog;
}

type Payload = Record<string, Record<string, unknown> | undefined>;

// Saca un texto legible del payload de Meta (entrante o saliente).
const textOf = (message: WaMessageLog): string => {
  const payload = (message.payload ?? {}) as Payload;
  const interactive = payload.interactive as Payload | undefined;
  const reply = interactive?.button_reply ?? interactive?.list_reply;
  const candidates = [
    payload.text?.body,
    interactive?.body?.text,
    reply?.title,
    payload.image?.caption,
    payload.document?.caption,
  ];
  const text = candidates.find((value) => typeof value === "string" && value);
  return typeof text === "string" ? text : `[${message.type}]`;
};

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const { t } = useTranslation("whatsapp");
  const outgoing = message.direction === "OUT";

  return (
    <Group justify={outgoing ? "flex-end" : "flex-start"}>
      <Paper
        p="xs"
        radius="md"
        maw="80%"
        bg={outgoing ? "var(--mantine-color-green-0)" : "var(--mantine-color-gray-0)"}
        withBorder
      >
        <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>
          {textOf(message)}
        </Text>
        <Group gap={6} justify="flex-end" mt={4}>
          <Text size="xs" c="dimmed">
            {dayjs(message.createdAt).format(DATE_FORMAT)}
          </Text>
          <Badge size="xs" variant="light" color={MESSAGE_STATUS_COLORS[message.status]}>
            {t(`conversations.messageStatuses.${message.status}`)}
          </Badge>
        </Group>
        {message.error && (
          <Text size="xs" c="red" mt={4}>
            {message.error}
          </Text>
        )}
      </Paper>
    </Group>
  );
};
