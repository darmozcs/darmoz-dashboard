import { useMutation } from "@tanstack/react-query";
import { testWaIntegrationService } from "../services/waIntegration.service";

export const useTestWaIntegrationMutation = () =>
  useMutation({
    mutationFn: testWaIntegrationService,
  });
