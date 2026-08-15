import { useMutation } from "@tanstack/react-query";
import { refreshService } from "../services/auth.service";

export const useRefreshMutation = () =>
  useMutation({
    mutationFn: refreshService,
  });
