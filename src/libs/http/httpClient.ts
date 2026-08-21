import { config } from "@/config";
import { AUTH_REFRESH_PATH } from "@/DAL/const";
import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import { applySuperGatedSession, forceLogout } from "./authSession";
import { tokenStorage } from "./tokenStorage";

const EXCLUDED_AUTH_PATHS = ["/auth/login", "/auth/refresh"];

const isExcludedPath = (url: string) =>
  EXCLUDED_AUTH_PATHS.some((path) => url.includes(path));

export const httpClient = axios.create({
  baseURL: config.VITE_API_BASE_URL,
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
    API_ID: config.VITE_API_ID,
  },
});

httpClient.interceptors.request.use((request) => {
  const url = request.url ?? "";

  if (!isExcludedPath(url)) {
    const token = tokenStorage.getAccess();
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
  }

  return request;
});

type RetriableRequestConfig = InternalAxiosRequestConfig & {
  _retried?: boolean;
};

// De-dupes concurrent 401s into a single in-flight refresh call, using
// plain axios (not httpClient) so this request never re-enters this
// interceptor.
let refreshPromise: Promise<string | null> | null = null;

const performRefresh = async (): Promise<string | null> => {
  const refreshToken = tokenStorage.getRefresh();
  if (!refreshToken) return null;

  try {
    const response = await axios.post(
      `${config.VITE_API_BASE_URL}${AUTH_REFRESH_PATH}`,
      { refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
          API_ID: config.VITE_API_ID,
        },
      },
    );
    const granted = applySuperGatedSession(response.data);
    return granted ? response.data.accessToken : null;
  } catch {
    return null;
  }
};

httpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const request = error.config as RetriableRequestConfig | undefined;

    if (status === 403) {
      forceLogout();
      return Promise.reject(error);
    }

    if (
      status === 401 &&
      request &&
      !request._retried &&
      !isExcludedPath(request.url ?? "")
    ) {
      request._retried = true;
      refreshPromise ??= performRefresh().finally(() => {
        refreshPromise = null;
      });

      const newAccessToken = await refreshPromise;
      if (newAccessToken) {
        return httpClient(request);
      }
      forceLogout();
    }

    return Promise.reject(error);
  },
);
