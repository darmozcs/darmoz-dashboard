import { SCHEDULED_EMAIL_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelScheduledEmailService } from "../services/scheduledEmail.service";

export const useCancelScheduledEmailMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelScheduledEmailService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SCHEDULED_EMAIL_LIST] });
    },
  });
};
