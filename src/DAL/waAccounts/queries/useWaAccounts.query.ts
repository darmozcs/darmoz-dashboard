import { WA_ACCOUNT_LIST } from "@/DAL/const";
import { useApiQuery } from "@/libs";
import { getWaAccountsService } from "../services/waAccount.service";

export const useWaAccountsQuery = () => {
  return useApiQuery({
    queryKey: [WA_ACCOUNT_LIST],
    queryFn: async () => await getWaAccountsService(),
  });
};
