import { APPLICATION_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteApplicationService } from "../services/application.service";

export const useDeleteApplicationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteApplicationService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [APPLICATION_LIST] });
    },
  });
};
