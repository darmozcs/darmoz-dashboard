import { ROLE_PERMISSION_LIST } from "@/DAL/const";
import { useApiQuery } from "@/libs";
import type { RolePermissionFilters } from "../services/rolePermission.service";
import { getRolePermissionsService } from "../services/rolePermission.service";

export const useRolePermissionsQuery = (
  filters: RolePermissionFilters = {},
) => {
  return useApiQuery({
    queryKey: [ROLE_PERMISSION_LIST, filters],
    queryFn: async () => await getRolePermissionsService(filters),
  });
};
