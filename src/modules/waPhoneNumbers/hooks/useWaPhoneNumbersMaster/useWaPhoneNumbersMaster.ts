import {
  useDeleteWaPhoneNumberMutation,
  useUpdateWaPhoneNumberMutation,
  useWaBotsQuery,
  useWaPhoneNumbersQuery,
} from "@/DAL";
import type { UpdateWaPhoneNumberPayload } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import type { WaPhoneNumber } from "@/models";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useWaPhoneNumbersMaster = () => {
  const { t } = useTranslation("whatsapp");
  const [testing, setTesting] = useState<WaPhoneNumber | null>(null);

  const phoneNumbers = useWaPhoneNumbersQuery();
  const bots = useWaBotsQuery();
  const updateMutation = useUpdateWaPhoneNumberMutation();
  const deleteMutation = useDeleteWaPhoneNumberMutation();

  const notifyError = (error: unknown) =>
    notifications.show({
      color: "red",
      title: t("notifications.error"),
      message: extractErrorMessage(error, t("notifications.saveFailed")),
    });

  const update = (phone: WaPhoneNumber, payload: UpdateWaPhoneNumberPayload) =>
    updateMutation.mutate({ id: phone.id, payload }, { onError: notifyError });

  return {
    phoneNumbers: phoneNumbers.data?.data ?? [],
    isLoading: phoneNumbers.isLoading,
    botOptions: (bots.data?.data ?? []).map((bot) => ({
      value: bot.id,
      label: bot.name,
    })),
    assignBot: (phone: WaPhoneNumber, botId: string | null) =>
      update(phone, botId ? { botId } : { unassignBot: true }),
    toggleActive: (phone: WaPhoneNumber) =>
      update(phone, { active: !phone.active }),
    remove: (phone: WaPhoneNumber) =>
      deleteMutation.mutate(phone.id, { onError: notifyError }),
    testing,
    setTesting,
  };
};
