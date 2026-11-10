import { useMutation } from "@tanstack/react-query";
import { validateWaFlowService } from "../services/waFlow.service";

export const useValidateWaFlowMutation = () =>
  useMutation({
    mutationFn: validateWaFlowService,
  });
