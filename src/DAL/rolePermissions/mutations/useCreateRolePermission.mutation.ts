import { ROLE_PERMISSION_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRolePermissionService } from "../services/rolePermission.service";

export const useCreateRolePermissionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRolePermissionService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ROLE_PERMISSION_LIST] });
    },
  });
};
