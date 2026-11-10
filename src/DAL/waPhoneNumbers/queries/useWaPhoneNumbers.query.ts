import { WA_PHONE_NUMBER_LIST } from "@/DAL/const";
import { useApiQuery } from "@/libs";
import type { WaPhoneNumberFilters } from "../services/waPhoneNumber.service";
import { getWaPhoneNumbersService } from "../services/waPhoneNumber.service";

export const useWaPhoneNumbersQuery = (filters: WaPhoneNumberFilters = {}) => {
  return useApiQuery({
    queryKey: [WA_PHONE_NUMBER_LIST, filters],
    queryFn: async () => await getWaPhoneNumbersService(filters),
  });
};
