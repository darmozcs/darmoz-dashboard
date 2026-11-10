import {
  useResetWaConversationMutation,
  useWaConversationMessagesQuery,
  useWaConversationsQuery,
  useWaPhoneNumbersQuery,
} from "@/DAL";
import { extractErrorMessage } from "@/libs";
import type { WaConversation, WaConversationStatus } from "@/models";
import { useDebouncedValue } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PAGE_SIZE } from "../../const/waConversations.const";

export const useWaConversationsMaster = () => {
  const { t } = useTranslation("whatsapp");
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<WaConversationStatus | null>(null);
  const [contact, setContact] = useState("");
  const [debouncedContact] = useDebouncedValue(contact.trim(), 400);
  const [selected, setSelected] = useState<WaConversation | null>(null);

  const conversations = useWaConversationsQuery({
    page: page - 1,
    size: PAGE_SIZE,
    status: status ?? undefined,
    contact: debouncedContact || undefined,
  });
  const messages = useWaConversationMessagesQuery(selected?.id ?? null);
  const phoneNumbers = useWaPhoneNumbersQuery();
  const resetMutation = useResetWaConversationMutation();

  const numberLabels = new Map(
    (phoneNumbers.data?.data ?? []).map((phone) => [phone.id, phone.displayNumber ?? phone.phoneNumberId]),
  );

  return {
    records: conversations.data?.data.content ?? [],
    totalRecords: conversations.data?.data.totalElements ?? 0,
    isLoading: conversations.isLoading,
    page,
    setPage,
    status,
    setStatus: (value: WaConversationStatus | null) => {
      setStatus(value);
      setPage(1);
    },
    contact,
    setContact: (value: string) => {
      setContact(value.replace(/[^0-9]/g, ""));
      setPage(1);
    },
    numberLabel: (id: string) => numberLabels.get(id) ?? "—",
    selected,
    setSelected,
    messages: messages.data?.data ?? [],
    isLoadingMessages: messages.isLoading,
    reset: (conversation: WaConversation) =>
      resetMutation.mutate(conversation.id, {
        onSuccess: (response) => {
          setSelected((current) => (current?.id === conversation.id ? response.data : current));
          notifications.show({
            color: "green",
            title: t("notifications.success"),
            message: t("conversations.resetDone"),
          });
        },
        onError: (error: unknown) =>
          notifications.show({
            color: "red",
            title: t("notifications.error"),
            message: extractErrorMessage(error, t("notifications.actionFailed")),
          }),
      }),
  };
};

export type WaConversationsMaster = ReturnType<typeof useWaConversationsMaster>;
