import { SCHEDULED_EMAIL_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateScheduledEmailService } from "../services/scheduledEmail.service";

export const useUpdateScheduledEmailMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateScheduledEmailService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SCHEDULED_EMAIL_LIST] });
    },
  });
};
