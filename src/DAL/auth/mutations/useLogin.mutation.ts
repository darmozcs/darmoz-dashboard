import { useMutation } from "@tanstack/react-query";
import { loginService } from "../services/auth.service";

export const useLoginMutation = () =>
  useMutation({
    mutationFn: loginService,
  });
