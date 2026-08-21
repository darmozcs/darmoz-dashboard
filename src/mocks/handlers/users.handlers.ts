import { config } from "@/config";
import { ADMIN_USERS_PATH } from "@/DAL/const";
import type { User } from "@/models";
import { http, HttpResponse } from "msw";
import { MOCK_USER_LIST } from "../data/mockUserList";

const API_URL = config.VITE_API_BASE_URL || "";

const resolveApplicationName = (applicationId: string): string =>
  MOCK_USER_LIST.find((u) => u.applicationId === applicationId)
    ?.applicationName ?? applicationId;

export const userHandlers = [
  http.get(`${API_URL}${ADMIN_USERS_PATH}`, () => {
    console.log(`[MSW] GET ${API_URL}${ADMIN_USERS_PATH}`);
    return HttpResponse.json(MOCK_USER_LIST);
  }),

  http.post(`${API_URL}${ADMIN_USERS_PATH}`, async ({ request }) => {
    console.log(`[MSW] POST ${API_URL}${ADMIN_USERS_PATH}`);
    const body = (await request.json()) as {
      email: string;
      password: string;
      applicationId: string;
      roles: string[];
    };

    const existing = MOCK_USER_LIST.find(
      (u) => u.email === body.email && u.applicationId === body.applicationId,
    );
    if (existing) {
      return HttpResponse.json(
        { message: "Ya existe una cuenta con ese email" },
        { status: 409 },
      );
    }

    const now = new Date().toISOString();
    const newUser: User = {
      id: crypto.randomUUID(),
      email: body.email,
      enabled: true,
      emailVerified: true,
      unverifiedLoginCount: 0,
      applicationId: body.applicationId,
      applicationName: resolveApplicationName(body.applicationId),
      roles: body.roles,
      createdAt: now,
      updatedAt: now,
    };
    MOCK_USER_LIST.push(newUser);
    return HttpResponse.json(newUser, { status: 201 });
  }),

  http.patch(
    `${API_URL}${ADMIN_USERS_PATH}/:id`,
    async ({ params, request }) => {
      console.log(`[MSW] PATCH ${API_URL}${ADMIN_USERS_PATH}/${params.id}`);
      const body = (await request.json()) as {
        enabled?: boolean;
        password?: string;
      };
      const user = MOCK_USER_LIST.find((u) => u.id === params.id);
      if (!user) {
        return HttpResponse.json(
          { message: "Usuario no encontrado" },
          { status: 404 },
        );
      }

      if (body.enabled !== undefined) user.enabled = body.enabled;
      user.updatedAt = new Date().toISOString();
      return HttpResponse.json(user);
    },
  ),

  http.put(
    `${API_URL}${ADMIN_USERS_PATH}/:id/roles`,
    async ({ params, request }) => {
      console.log(
        `[MSW] PUT ${API_URL}${ADMIN_USERS_PATH}/${params.id}/roles`,
      );
      const body = (await request.json()) as { roles: string[] };
      const user = MOCK_USER_LIST.find((u) => u.id === params.id);
      if (!user) {
        return HttpResponse.json(
          { message: "Usuario no encontrado" },
          { status: 404 },
        );
      }

      user.roles = body.roles;
      user.updatedAt = new Date().toISOString();
      return HttpResponse.json(user);
    },
  ),

  http.delete(`${API_URL}${ADMIN_USERS_PATH}/:id`, ({ params }) => {
    console.log(`[MSW] DELETE ${API_URL}${ADMIN_USERS_PATH}/${params.id}`);
    const index = MOCK_USER_LIST.findIndex((u) => u.id === params.id);
    if (index === -1) {
      return HttpResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    MOCK_USER_LIST.splice(index, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];
