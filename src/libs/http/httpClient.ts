import { config } from "@/config";
import axios from "axios";

const EXCLUDED_AUTH_PATHS = ["/auth/login"];

export const httpClient = axios.create({
  baseURL: config.VITE_API_BASE_URL,
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use((request) => {
  const url = request.url ?? "";
  const isExcluded = EXCLUDED_AUTH_PATHS.some((path) => url.includes(path));

  if (!isExcluded) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
  }

  return request;
});
