import { useSendWaTestMessageMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import type { WaPhoneNumber } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  testMessageSchema,
  type TestMessageFormData,
} from "../../schemas/testMessage.schema";

export const useTestMessageForm = (
  phone: WaPhoneNumber | null,
  onSent: () => void,
) => {
  const { t } = useTranslation("whatsapp");
  const sendMutation = useSendWaTestMessageMutation();

  const form = useForm<TestMessageFormData>({
    resolver: yupResolver(testMessageSchema),
    defaultValues: { to: "", text: t("connect.test.defaultText") },
  });

  const handleSubmit = (data: TestMessageFormData) => {
    if (!phone) return;
    sendMutation.mutate(
      { id: phone.id, payload: data },
      {
        onSuccess: () => {
          notifications.show({
            color: "green",
            title: t("notifications.success"),
            message: t("connect.test.sent"),
          });
          onSent();
        },
        onError: (error: unknown) =>
          notifications.show({
            color: "red",
            title: t("notifications.error"),
            message: extractErrorMessage(error, t("notifications.actionFailed")),
          }),
      },
    );
  };

  return { form, onSubmit: handleSubmit, isLoading: sendMutation.isPending };
};
