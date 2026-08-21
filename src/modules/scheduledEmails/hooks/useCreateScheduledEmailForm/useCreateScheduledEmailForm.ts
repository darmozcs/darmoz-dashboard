import { useCreateScheduledEmailMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import { yupResolver } from "@hookform/resolvers/yup";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import {
  scheduledEmailSchema,
  type ScheduledEmailFormData,
} from "../../schemas/scheduledEmail.schema";

export const useCreateScheduledEmailForm = (onSaved: () => void) => {
  const createMutation = useCreateScheduledEmailMutation();

  const form = useForm<ScheduledEmailFormData>({
    resolver: yupResolver(scheduledEmailSchema),
    defaultValues: {
      recipient: "",
      subject: "",
      templateCode: "",
      bodyOverride: "",
      scheduledAt: "",
      clientId: "",
      variables: [],
    },
  });

  const handleSubmit = (data: ScheduledEmailFormData) => {
    const variables = Object.fromEntries(
      data.variables.map((entry) => [entry.name, entry.value]),
    );

    createMutation.mutate(
      {
        recipient: data.recipient,
        subject: data.subject || undefined,
        templateCode: data.templateCode || undefined,
        bodyOverride: data.bodyOverride || undefined,
        scheduledAt: data.scheduledAt,
        clientId: data.clientId,
        variables: Object.keys(variables).length ? variables : undefined,
      },
      {
        onSuccess: () => {
          notifications.show({
            color: "green",
            title: "Success",
            message: "Email scheduled",
          });
          form.reset();
          onSaved();
        },
        onError: (error: unknown) => {
          notifications.show({
            color: "red",
            title: "Error",
            message: extractErrorMessage(error, "Create failed"),
          });
        },
      },
    );
  };

  return {
    form,
    onSubmit: handleSubmit,
    isLoading: createMutation.isPending,
  };
};
