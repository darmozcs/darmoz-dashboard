import { WA_FLOW_LIST, WA_FLOW_DETAIL } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { renameWaFlowService } from "../services/waFlow.service";

export const useRenameWaFlowMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: renameWaFlowService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WA_FLOW_LIST] });
      queryClient.invalidateQueries({ queryKey: [WA_FLOW_DETAIL] });
    },
  });
};
