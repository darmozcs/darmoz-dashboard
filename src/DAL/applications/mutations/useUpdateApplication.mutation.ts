import { APPLICATION_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateApplicationService } from "../services/application.service";

export const useUpdateApplicationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateApplicationService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [APPLICATION_LIST] });
    },
  });
};
