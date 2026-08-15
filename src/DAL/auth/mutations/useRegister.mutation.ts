import { useMutation } from "@tanstack/react-query";
import { registerService } from "../services/auth.service";

export const useRegisterMutation = () =>
  useMutation({
    mutationFn: registerService,
  });
