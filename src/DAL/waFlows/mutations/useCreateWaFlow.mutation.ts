import { WA_FLOW_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWaFlowService } from "../services/waFlow.service";

export const useCreateWaFlowMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWaFlowService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WA_FLOW_LIST] });
    },
  });
};
