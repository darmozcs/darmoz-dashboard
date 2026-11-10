import { WA_INTEGRATION_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWaIntegrationService } from "../services/waIntegration.service";

export const useUpdateWaIntegrationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateWaIntegrationService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WA_INTEGRATION_LIST] });
    },
  });
};
