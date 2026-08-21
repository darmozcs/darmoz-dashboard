import { MAIL_CLIENT_APPLICATION_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMailClientApplicationService } from "../services/mailClientApplication.service";

export const useCreateMailClientApplicationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMailClientApplicationService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MAIL_CLIENT_APPLICATION_LIST],
      });
    },
  });
};
