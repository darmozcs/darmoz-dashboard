import { ROLE_LIST } from "@/DAL/const";
import { useApiQuery } from "@/libs";
import { getRolesService } from "../services/role.service";

export const useRolesQuery = () => {
  return useApiQuery({
    queryKey: [ROLE_LIST],
    queryFn: async () => await getRolesService(),
  });
};
