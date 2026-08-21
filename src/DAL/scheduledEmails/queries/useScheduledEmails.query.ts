import { SCHEDULED_EMAIL_LIST } from "@/DAL/const";
import { useApiQuery } from "@/libs";
import type { ScheduledEmailFilters } from "../services/scheduledEmail.service";
import { getScheduledEmailsService } from "../services/scheduledEmail.service";

export const useScheduledEmailsQuery = (
  filters: ScheduledEmailFilters = {},
) => {
  return useApiQuery({
    queryKey: [SCHEDULED_EMAIL_LIST, filters],
    queryFn: async () => await getScheduledEmailsService(filters),
  });
};
