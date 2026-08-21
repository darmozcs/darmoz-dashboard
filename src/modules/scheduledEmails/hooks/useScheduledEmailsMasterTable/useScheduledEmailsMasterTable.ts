import { useCancelScheduledEmailMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import type { ScheduledEmail } from "@/models";
import { notifications } from "@mantine/notifications";
import { useTranslation } from "react-i18next";

export const useScheduledEmailsMasterTable = () => {
  const { t } = useTranslation("scheduledEmails");
  const cancelMutation = useCancelScheduledEmailMutation();

  const handleCancel = (scheduledEmail: ScheduledEmail) => {
    cancelMutation.mutate(scheduledEmail.id, {
      onSuccess: () => {
        notifications.show({
          color: "green",
          title: "Success",
          message: t("cancelSuccess", "Scheduled email cancelled"),
        });
      },
      onError: (error: unknown) => {
        notifications.show({
          color: "red",
          title: "Error",
          message: extractErrorMessage(error, "Cancel failed"),
        });
      },
    });
  };

  return { handleCancel };
};
