import { ADMIN_ROLES_PATH, ADMIN_ROLE_DETAIL_PATH } from "@/DAL/const";
import { httpClient } from "@/libs";
import type { Role } from "@/models";
import type { AxiosResponse } from "axios";

export interface CreateRolePayload {
  name: string;
  description?: string;
  applicationId: string;
}

export const getRolesService = async (): Promise<AxiosResponse<Role[]>> =>
  await httpClient.get<Role[]>(ADMIN_ROLES_PATH);

export const createRoleService = async (
  payload: CreateRolePayload,
): Promise<AxiosResponse<Role>> =>
  await httpClient.post<Role>(ADMIN_ROLES_PATH, payload);

export const deleteRoleService = async (
  id: string,
): Promise<AxiosResponse<void>> =>
  await httpClient.delete<void>(ADMIN_ROLE_DETAIL_PATH({ id }));
