import { EMAIL_TEMPLATE_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEmailTemplateService } from "../services/emailTemplate.service";

export const useUpdateEmailTemplateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEmailTemplateService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EMAIL_TEMPLATE_LIST] });
    },
  });
};
