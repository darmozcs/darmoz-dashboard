import { useCreateEmailTemplateMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import { yupResolver } from "@hookform/resolvers/yup";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import {
  emailTemplateSchema,
  type EmailTemplateFormData,
} from "../../schemas/emailTemplate.schema";

export const useCreateEmailTemplateForm = (onSaved: () => void) => {
  const createMutation = useCreateEmailTemplateMutation();

  const form = useForm<EmailTemplateFormData>({
    resolver: yupResolver(emailTemplateSchema),
    defaultValues: {
      code: "",
      name: "",
      subject: "",
      bodyHtml: "",
      bodyText: "",
      active: true,
    },
  });

  const handleSubmit = (data: EmailTemplateFormData) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        notifications.show({
          color: "green",
          title: "Success",
          message: "Template created",
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
