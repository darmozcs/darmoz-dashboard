import { WA_FLOW_LIST, WA_BOT_DETAIL } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWaFlowService } from "../services/waFlow.service";

export const useDeleteWaFlowMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWaFlowService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WA_FLOW_LIST] });
      queryClient.invalidateQueries({ queryKey: [WA_BOT_DETAIL] });
    },
  });
};
