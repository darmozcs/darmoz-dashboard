import { WA_INTEGRATION_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWaIntegrationService } from "../services/waIntegration.service";

export const useCreateWaIntegrationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWaIntegrationService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WA_INTEGRATION_LIST] });
    },
  });
};
