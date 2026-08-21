import { USER_LIST } from "@/DAL/const";
import { useApiQuery } from "@/libs";
import { getUsersService, type UserFilters } from "../services/user.service";

export const useUsersQuery = (filters: UserFilters = {}) => {
  return useApiQuery({
    queryKey: [USER_LIST, filters],
    queryFn: async () => await getUsersService(filters),
  });
};
