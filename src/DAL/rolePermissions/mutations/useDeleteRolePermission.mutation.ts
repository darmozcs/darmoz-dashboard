import { ROLE_PERMISSION_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRolePermissionService } from "../services/rolePermission.service";

export const useDeleteRolePermissionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRolePermissionService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ROLE_PERMISSION_LIST] });
    },
  });
};
