import { ROLE_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRoleService } from "../services/role.service";

export const useDeleteRoleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRoleService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ROLE_LIST] });
    },
  });
};
