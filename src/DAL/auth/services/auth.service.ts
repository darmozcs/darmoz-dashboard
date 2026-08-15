import type { AxiosResponse } from "axios";
import { httpClient } from "@/libs";
import {
  AUTH_LOGIN_PATH,
  AUTH_LOGOUT_PATH,
  AUTH_REFRESH_PATH,
  AUTH_REGISTER_PATH,
  AUTH_VERIFY_PATH,
} from "@/DAL/const";
import type { AuthResponse, VerifyResponse } from "@/models";

interface AuthPayload {
  email: string;
  password: string;
}

interface RefreshPayload {
  refreshToken: string;
}

interface LogoutPayload {
  refreshToken: string;
}

export const loginService = async (
  payload: AuthPayload,
): Promise<AxiosResponse<AuthResponse>> =>
  await httpClient.post<AuthResponse>(AUTH_LOGIN_PATH, payload);

export const registerService = async (
  payload: AuthPayload,
): Promise<AxiosResponse<AuthResponse>> =>
  await httpClient.post<AuthResponse>(AUTH_REGISTER_PATH, payload);

export const refreshService = async (
  payload: RefreshPayload,
): Promise<AxiosResponse<AuthResponse>> =>
  await httpClient.post<AuthResponse>(AUTH_REFRESH_PATH, payload);

export const logoutService = async (
  payload: LogoutPayload,
): Promise<AxiosResponse<void>> =>
  await httpClient.post<void>(AUTH_LOGOUT_PATH, payload);

export const verifyService = async (): Promise<
  AxiosResponse<VerifyResponse>
> => await httpClient.post<VerifyResponse>(AUTH_VERIFY_PATH);
