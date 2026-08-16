import { USERS_PATH } from "@/DAL/const";
import { httpClient } from "@/libs";
import type { User } from "@/models";
import type { AxiosResponse } from "axios";

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export const getUsersService = async (
  params: Record<string, string | number | boolean>,
): Promise<AxiosResponse<PaginatedResponse<User>>> => {
  return await httpClient.get<PaginatedResponse<User>>(USERS_PATH, { params });
};
