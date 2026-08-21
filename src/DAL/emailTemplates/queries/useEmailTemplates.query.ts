import { EMAIL_TEMPLATE_LIST } from "@/DAL/const";
import { useApiQuery } from "@/libs";
import type { EmailTemplateFilters } from "../services/emailTemplate.service";
import { getEmailTemplatesService } from "../services/emailTemplate.service";

export const useEmailTemplatesQuery = (filters: EmailTemplateFilters = {}) => {
  return useApiQuery({
    queryKey: [EMAIL_TEMPLATE_LIST, filters],
    queryFn: async () => await getEmailTemplatesService(filters),
  });
};
