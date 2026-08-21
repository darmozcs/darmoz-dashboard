import { EMAIL_TEMPLATE_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEmailTemplateService } from "../services/emailTemplate.service";

export const useCreateEmailTemplateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEmailTemplateService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EMAIL_TEMPLATE_LIST] });
    },
  });
};
