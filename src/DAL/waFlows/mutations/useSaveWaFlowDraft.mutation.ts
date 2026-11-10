import { WA_FLOW_LIST, WA_FLOW_DETAIL } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveWaFlowDraftService } from "../services/waFlow.service";

export const useSaveWaFlowDraftMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveWaFlowDraftService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WA_FLOW_LIST] });
      queryClient.invalidateQueries({ queryKey: [WA_FLOW_DETAIL] });
    },
  });
};
