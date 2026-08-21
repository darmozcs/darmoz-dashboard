import { MAIL_CLIENT_APPLICATION_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMailClientApplicationService } from "../services/mailClientApplication.service";

export const useUpdateMailClientApplicationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMailClientApplicationService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MAIL_CLIENT_APPLICATION_LIST],
      });
    },
  });
};
