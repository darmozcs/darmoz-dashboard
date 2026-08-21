import { APPLICATION_LIST } from "@/DAL/const";
import { useApiQuery } from "@/libs";
import { getApplicationsService } from "../services/application.service";

export const useApplicationsQuery = () => {
  return useApiQuery({
    queryKey: [APPLICATION_LIST],
    queryFn: async () => await getApplicationsService(),
  });
};
