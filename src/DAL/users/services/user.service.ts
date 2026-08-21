import {
  ADMIN_USERS_PATH,
  ADMIN_USER_DETAIL_PATH,
  ADMIN_USER_ROLES_PATH,
} from "@/DAL/const";
import { httpClient } from "@/libs";
import type { User } from "@/models";
import type { AxiosResponse } from "axios";

export interface CreateUserPayload {
  email: string;
  password: string;
  applicationId: string;
  roles: string[];
}

export interface UpdateUserPayload {
  enabled?: boolean;
  password?: string;
}

export const getUsersService = async (): Promise<AxiosResponse<User[]>> =>
  await httpClient.get<User[]>(ADMIN_USERS_PATH);

export const createUserService = async (
  payload: CreateUserPayload,
): Promise<AxiosResponse<User>> =>
  await httpClient.post<User>(ADMIN_USERS_PATH, payload);

export const updateUserService = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateUserPayload;
}): Promise<AxiosResponse<User>> =>
  await httpClient.patch<User>(ADMIN_USER_DETAIL_PATH({ id }), payload);

export const assignUserRolesService = async ({
  id,
  roles,
}: {
  id: string;
  roles: string[];
}): Promise<AxiosResponse<User>> =>
  await httpClient.put<User>(ADMIN_USER_ROLES_PATH({ id }), { roles });

export const deleteUserService = async (
  id: string,
): Promise<AxiosResponse<void>> =>
  await httpClient.delete<void>(ADMIN_USER_DETAIL_PATH({ id }));
