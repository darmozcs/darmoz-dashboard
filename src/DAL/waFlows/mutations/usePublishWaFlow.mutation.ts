import { WA_FLOW_LIST, WA_FLOW_DETAIL } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { publishWaFlowService } from "../services/waFlow.service";

export const usePublishWaFlowMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: publishWaFlowService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WA_FLOW_LIST] });
      queryClient.invalidateQueries({ queryKey: [WA_FLOW_DETAIL] });
    },
  });
};
