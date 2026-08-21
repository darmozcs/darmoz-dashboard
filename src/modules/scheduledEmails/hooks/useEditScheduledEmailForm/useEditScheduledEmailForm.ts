import { useUpdateScheduledEmailMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import type { ScheduledEmail } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import {
  scheduledEmailSchema,
  type ScheduledEmailFormData,
} from "../../schemas/scheduledEmail.schema";

export const useEditScheduledEmailForm = (
  scheduledEmail: ScheduledEmail | null,
  onSaved: () => void,
) => {
  const updateMutation = useUpdateScheduledEmailMutation();

  const form = useForm<ScheduledEmailFormData>({
    resolver: yupResolver(scheduledEmailSchema),
    values: {
      recipient: scheduledEmail?.recipient ?? "",
      subject: scheduledEmail?.subject ?? "",
      templateCode: scheduledEmail?.templateCode ?? "",
      bodyOverride: scheduledEmail?.bodyOverride ?? "",
      scheduledAt: scheduledEmail?.scheduledAt ?? "",
      clientId: scheduledEmail?.clientId ?? "",
      variables: Object.entries(scheduledEmail?.variables ?? {}).map(
        ([name, value]) => ({ name, value }),
      ),
    },
  });

  const handleSubmit = (data: ScheduledEmailFormData) => {
    if (!scheduledEmail) return;

    const variables = Object.fromEntries(
      data.variables.map((entry) => [entry.name, entry.value]),
    );

    updateMutation.mutate(
      {
        id: scheduledEmail.id,
        payload: {
          recipient: data.recipient,
          subject: data.subject || undefined,
          templateCode: data.templateCode || undefined,
          bodyOverride: data.bodyOverride || undefined,
          scheduledAt: data.scheduledAt,
          clientId: data.clientId,
          variables: Object.keys(variables).length ? variables : undefined,
        },
      },
      {
        onSuccess: () => {
          notifications.show({
            color: "green",
            title: "Success",
            message: "Scheduled email updated",
          });
          onSaved();
        },
        onError: (error: unknown) => {
          notifications.show({
            color: "red",
            title: "Error",
            message: extractErrorMessage(error, "Update failed"),
          });
        },
      },
    );
  };

  return {
    form,
    onSubmit: handleSubmit,
    isLoading: updateMutation.isPending,
  };
};
