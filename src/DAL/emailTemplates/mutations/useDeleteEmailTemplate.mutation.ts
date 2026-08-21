import { EMAIL_TEMPLATE_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEmailTemplateService } from "../services/emailTemplate.service";

export const useDeleteEmailTemplateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmailTemplateService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EMAIL_TEMPLATE_LIST] });
    },
  });
};
