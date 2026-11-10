import { WA_INTEGRATION_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWaIntegrationService } from "../services/waIntegration.service";

export const useDeleteWaIntegrationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWaIntegrationService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WA_INTEGRATION_LIST] });
    },
  });
};
