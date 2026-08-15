import { useMutation } from "@tanstack/react-query";
import { verifyService } from "../services/auth.service";

export const useVerifyMutation = () =>
  useMutation({
    mutationFn: verifyService,
  });
