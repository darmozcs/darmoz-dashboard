import { useUpdateMailClientApplicationMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import type { MailClientApplication } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import {
  mailClientApplicationSchema,
  type MailClientApplicationFormData,
} from "../../schemas/mailClientApplication.schema";

export const useEditMailClientApplicationForm = (
  application: MailClientApplication | null,
  onSaved: () => void,
) => {
  const updateMutation = useUpdateMailClientApplicationMutation();

  const form = useForm<MailClientApplicationFormData>({
    resolver: yupResolver(mailClientApplicationSchema),
    values: {
      name: application?.name ?? "",
      active: application?.active ?? true,
    },
  });

  const handleSubmit = (data: MailClientApplicationFormData) => {
    if (!application) return;

    updateMutation.mutate(
      { id: application.id, payload: data },
      {
        onSuccess: () => {
          notifications.show({
            color: "green",
            title: "Success",
            message: "Application updated",
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
