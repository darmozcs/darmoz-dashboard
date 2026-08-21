import { useUpdateEmailTemplateMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import type { EmailTemplate } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import {
  emailTemplateSchema,
  type EmailTemplateFormData,
} from "../../schemas/emailTemplate.schema";

export const useEditEmailTemplateForm = (
  template: EmailTemplate | null,
  onSaved: () => void,
) => {
  const updateMutation = useUpdateEmailTemplateMutation();

  const form = useForm<EmailTemplateFormData>({
    resolver: yupResolver(emailTemplateSchema),
    values: {
      code: template?.code ?? "",
      name: template?.name ?? "",
      subject: template?.subject ?? "",
      bodyHtml: template?.bodyHtml ?? "",
      bodyText: template?.bodyText ?? "",
      active: template?.active ?? true,
    },
  });

  const handleSubmit = (data: EmailTemplateFormData) => {
    if (!template) return;

    updateMutation.mutate(
      { id: template.id, payload: data },
      {
        onSuccess: () => {
          notifications.show({
            color: "green",
            title: "Success",
            message: "Template updated",
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
