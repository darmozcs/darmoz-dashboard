import { APPLICATION_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createApplicationService } from "../services/application.service";

export const useCreateApplicationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createApplicationService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [APPLICATION_LIST] });
    },
  });
};
