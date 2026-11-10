import type { WaConversation, WaMessageLog } from "@/models";
import { Button, Code, Divider, Drawer, Loader, Stack, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { MessageBubble } from "./MessageBubble";

interface ConversationDrawerProps {
  conversation: WaConversation | null;
  messages: WaMessageLog[];
  isLoading: boolean;
  onReset: (conversation: WaConversation) => void;
  onClose: () => void;
}

export const ConversationDrawer = ({
  conversation,
  messages,
  isLoading,
  onReset,
  onClose,
}: ConversationDrawerProps) => {
  const { t } = useTranslation("whatsapp");

  return (
    <Drawer
      opened={conversation !== null}
      onClose={onClose}
      position="right"
      size="lg"
      title={`${conversation?.contactName ?? ""} · ${conversation?.contactWaId ?? ""}`}
    >
      <Stack>
        {isLoading ? (
          <Loader />
        ) : messages.length === 0 ? (
          <Text size="sm" c="dimmed">{t("conversations.noMessages")}</Text>
        ) : (
          messages.map((message) => <MessageBubble key={message.id} message={message} />)
        )}
        <Divider label={t("conversations.variables")} />
        <Code block>{JSON.stringify(conversation?.variables ?? {}, null, 2)}</Code>
        {conversation && (
          <Button variant="light" color="orange" onClick={() => onReset(conversation)}>
            {t("conversations.reset")}
          </Button>
        )}
      </Stack>
    </Drawer>
  );
};
