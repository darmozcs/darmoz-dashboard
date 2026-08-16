import { USER_LIST } from "@/DAL/const";
import { useApiQuery } from "@/libs";
import { getUsersService } from "../services/user.service";

export const useUsersQuery = (
  params: Record<string, string | number | boolean> = {},
) => {
  return useApiQuery({
    queryKey: [USER_LIST, params],
    queryFn: async () => await getUsersService(params),
  });
};
