import {
  ADMIN_ROLE_PERMISSIONS_PATH,
  ADMIN_ROLE_PERMISSION_DETAIL_PATH,
} from "@/DAL/const";
import { httpClient } from "@/libs";
import type { RolePermission } from "@/models";
import type { AxiosResponse } from "axios";

export interface RolePermissionFilters {
  roleId?: string;
}

export interface CreateRolePermissionPayload {
  roleId: string;
  service: string;
  httpMethod: string;
  endpointPattern: string;
}

export const getRolePermissionsService = async (
  params: RolePermissionFilters = {},
): Promise<AxiosResponse<RolePermission[]>> =>
  await httpClient.get<RolePermission[]>(ADMIN_ROLE_PERMISSIONS_PATH, {
    params,
  });

export const createRolePermissionService = async (
  payload: CreateRolePermissionPayload,
): Promise<AxiosResponse<RolePermission>> =>
  await httpClient.post<RolePermission>(ADMIN_ROLE_PERMISSIONS_PATH, payload);

export const deleteRolePermissionService = async (
  id: string,
): Promise<AxiosResponse<void>> =>
  await httpClient.delete<void>(ADMIN_ROLE_PERMISSION_DETAIL_PATH({ id }));
