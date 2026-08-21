import { USER_LIST } from "@/DAL/const";
import { useApiQuery } from "@/libs";
import { getUsersService } from "../services/user.service";

export const useUsersQuery = () => {
  return useApiQuery({
    queryKey: [USER_LIST],
    queryFn: async () => await getUsersService(),
  });
};
