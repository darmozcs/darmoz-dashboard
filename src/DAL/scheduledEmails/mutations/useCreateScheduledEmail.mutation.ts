import { SCHEDULED_EMAIL_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createScheduledEmailService } from "../services/scheduledEmail.service";

export const useCreateScheduledEmailMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createScheduledEmailService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SCHEDULED_EMAIL_LIST] });
    },
  });
};
