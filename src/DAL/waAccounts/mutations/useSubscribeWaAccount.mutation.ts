import { useMutation } from "@tanstack/react-query";
import { subscribeWaAccountService } from "../services/waAccount.service";

export const useSubscribeWaAccountMutation = () =>
  useMutation({
    mutationFn: subscribeWaAccountService,
  });
