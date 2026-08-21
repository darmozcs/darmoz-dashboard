import { useCreateMailClientApplicationMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import { yupResolver } from "@hookform/resolvers/yup";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import {
  mailClientApplicationSchema,
  type MailClientApplicationFormData,
} from "../../schemas/mailClientApplication.schema";

export const useCreateMailClientApplicationForm = (onSaved: () => void) => {
  const createMutation = useCreateMailClientApplicationMutation();

  const form = useForm<MailClientApplicationFormData>({
    resolver: yupResolver(mailClientApplicationSchema),
    defaultValues: { name: "", active: true },
  });

  const handleSubmit = (data: MailClientApplicationFormData) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        notifications.show({
          color: "green",
          title: "Success",
          message: "Application created",
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
    });
  };

  return {
    form,
    onSubmit: handleSubmit,
    isLoading: createMutation.isPending,
  };
};
