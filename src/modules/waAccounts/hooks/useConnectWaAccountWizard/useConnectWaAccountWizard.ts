import {
  useRegenerateWaVerifyTokenMutation,
  useSendWaTestMessageMutation,
  useSubscribeWaAccountMutation,
  useSyncWaAccountNumbersMutation,
  useValidateWaAccountMutation,
  useWaAccountWebhookInfoQuery,
  useWaPhoneNumbersQuery,
} from "@/DAL";
import { extractErrorMessage } from "@/libs";
import type { WaAccount } from "@/models";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CONNECT_STEPS } from "../../const/waAccounts.const";

export const useConnectWaAccountWizard = (account: WaAccount | null) => {
  const { t } = useTranslation("whatsapp");
  const accountId = account?.id ?? null;
  const [active, setActive] = useState(0);
  const [subscribed, setSubscribed] = useState(false);

  const validateMutation = useValidateWaAccountMutation();
  const syncMutation = useSyncWaAccountNumbersMutation();
  const subscribeMutation = useSubscribeWaAccountMutation();
  const regenerateMutation = useRegenerateWaVerifyTokenMutation();
  const testMutation = useSendWaTestMessageMutation();
  const webhookInfo = useWaAccountWebhookInfoQuery(accountId);
  const phoneNumbers = useWaPhoneNumbersQuery(
    accountId ? { accountId } : {},
  );

  const notifyError = (error: unknown) =>
    notifications.show({
      color: "red",
      title: t("notifications.error"),
      message: extractErrorMessage(error, t("notifications.actionFailed")),
    });

  const run = <T,>(action: (id: string) => Promise<T>) => {
    if (accountId) action(accountId).catch(notifyError);
  };

  return {
    active,
    steps: CONNECT_STEPS,
    goTo: setActive,
    next: () => setActive((step) => Math.min(step + 1, CONNECT_STEPS.length)),
    back: () => setActive((step) => Math.max(step - 1, 0)),
    reset: () => {
      setActive(0);
      setSubscribed(false);
      validateMutation.reset();
      testMutation.reset();
    },
    validation: validateMutation.data?.data ?? null,
    validate: () => run((id) => validateMutation.mutateAsync(id)),
    isValidating: validateMutation.isPending,
    webhookInfo: webhookInfo.data?.data ?? null,
    regenerateToken: () => run((id) => regenerateMutation.mutateAsync(id)),
    isRegenerating: regenerateMutation.isPending,
    phoneNumbers: phoneNumbers.data?.data ?? [],
    syncNumbers: () => run((id) => syncMutation.mutateAsync(id)),
    isSyncing: syncMutation.isPending,
    subscribed,
    subscribe: () =>
      run(async (id) => {
        await subscribeMutation.mutateAsync(id);
        setSubscribed(true);
      }),
    isSubscribing: subscribeMutation.isPending,
    sendTest: (phoneNumberId: string, to: string, text: string) =>
      testMutation
        .mutateAsync({ id: phoneNumberId, payload: { to, text } })
        .then(() =>
          notifications.show({
            color: "green",
            title: t("notifications.success"),
            message: t("connect.test.sent"),
          }),
        )
        .catch(notifyError),
    isSendingTest: testMutation.isPending,
  };
};

export type ConnectWaAccountWizard = ReturnType<typeof useConnectWaAccountWizard>;
