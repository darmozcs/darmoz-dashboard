import { WA_ACCOUNT_WEBHOOK_INFO } from "@/DAL/const";
import { useApiQuery } from "@/libs";
import { getWaAccountWebhookInfoService } from "../services/waAccount.service";

export const useWaAccountWebhookInfoQuery = (accountId: string | null) => {
  return useApiQuery({
    queryKey: [WA_ACCOUNT_WEBHOOK_INFO, accountId],
    queryFn: async () => await getWaAccountWebhookInfoService(accountId ?? ""),
    enabled: accountId !== null,
  });
};
