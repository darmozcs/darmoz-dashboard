import { USER_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignUserRolesService } from "../services/user.service";

export const useAssignUserRolesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: assignUserRolesService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_LIST] });
    },
  });
};
