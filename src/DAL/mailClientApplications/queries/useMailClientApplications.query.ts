import { MAIL_CLIENT_APPLICATION_LIST } from "@/DAL/const";
import { useApiQuery } from "@/libs";
import type { MailClientApplicationFilters } from "../services/mailClientApplication.service";
import { getMailClientApplicationsService } from "../services/mailClientApplication.service";

export const useMailClientApplicationsQuery = (
  filters: MailClientApplicationFilters = {},
) => {
  return useApiQuery({
    queryKey: [MAIL_CLIENT_APPLICATION_LIST, filters],
    queryFn: async () => await getMailClientApplicationsService(filters),
  });
};
