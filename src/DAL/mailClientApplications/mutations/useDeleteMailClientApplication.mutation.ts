import { MAIL_CLIENT_APPLICATION_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMailClientApplicationService } from "../services/mailClientApplication.service";

export const useDeleteMailClientApplicationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMailClientApplicationService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MAIL_CLIENT_APPLICATION_LIST],
      });
    },
  });
};
