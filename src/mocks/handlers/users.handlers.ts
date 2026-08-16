import { config } from "@/config";
import { USERS_PATH } from "@/DAL/const";
import type { User } from "@/models";
import { http, HttpResponse, type DefaultBodyType, type StrictRequest } from "msw";
import { MOCK_USER_LIST } from "../data/mockUserList";

const API_URL = config.VITE_API_BASE_URL || "";

interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

const getUsersPaginated = (
  request: StrictRequest<DefaultBodyType>,
): PaginatedResponse<User> => {
  const url = new URL(request.url);
  const page = Math.max(0, parseInt(url.searchParams.get("page") || "0", 10));
  const size = Math.min(100, Math.max(1, parseInt(url.searchParams.get("size") || "10", 10)));
  const search = (url.searchParams.get("search") || "").toLowerCase();
  const sortParam = url.searchParams.get("sort") || "createdAt,desc";

  let filtered = [...MOCK_USER_LIST];

  if (search) {
    filtered = filtered.filter(
      (u) =>
        u.email.toLowerCase().includes(search) ||
        u.applicationName.toLowerCase().includes(search),
    );
  }

  const [sortField, sortDir] = sortParam.split(",");
  filtered.sort((a, b) => {
    const aVal = a[sortField as keyof User] ?? "";
    const bVal = b[sortField as keyof User] ?? "";
    const cmp = String(aVal).localeCompare(String(bVal));
    return sortDir === "asc" ? cmp : -cmp;
  });

  const totalElements = filtered.length;
  const totalPages = Math.ceil(totalElements / size);
  const start = page * size;
  const content = filtered.slice(start, start + size);

  return {
    content,
    totalElements,
    totalPages,
    number: page,
    size,
  };
};

export const userHandlers = [
  http.get(`${API_URL}${USERS_PATH}`, async ({ request }) => {
    console.log(`[MSW] GET ${API_URL}${USERS_PATH}`);
    try {
      const response = getUsersPaginated(request);
      return HttpResponse.json(response);
    } catch (error) {
      console.error("[MSW] GET /users error:", error);
      return HttpResponse.json(
        { message: "Internal mock error" },
        { status: 500 },
      );
    }
  }),
];
