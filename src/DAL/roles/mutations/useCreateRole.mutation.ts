import { ROLE_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRoleService } from "../services/role.service";

export const useCreateRoleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRoleService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ROLE_LIST] });
    },
  });
};
