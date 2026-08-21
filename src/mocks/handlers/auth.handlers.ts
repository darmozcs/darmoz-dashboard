import { config } from "@/config";
import {
  AUTH_LOGIN_PATH,
  AUTH_LOGOUT_PATH,
  AUTH_REFRESH_PATH,
  AUTH_REGISTER_PATH,
  AUTH_VERIFY_PATH,
} from "@/DAL/const";
import type { AuthResponse, VerifyResponse } from "@/models";
import { http, HttpResponse } from "msw";
import { getPermissionsForRoles } from "../data/permissions";
import { MOCK_USERS, createUser, findUserByEmail, validatePassword } from "../data/users";
import {
  createMockAccessToken,
  createMockRefreshToken,
} from "../utils/token";

const API_URL = config.VITE_API_BASE_URL || "";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MOCK_USER = MOCK_USERS[0];

const buildAuthResponse = (data: {
  userId: string;
  email: string;
  roles: string[];
}): AuthResponse => {
  const permissions = getPermissionsForRoles(data.roles);
  return {
    userId: data.userId,
    email: data.email,
    roles: data.roles,
    permissions,
    accessToken: createMockAccessToken({
      userId: data.userId,
      email: data.email,
      roles: data.roles,
      permissions,
    }),
    refreshToken: createMockRefreshToken(),
    tokenType: "Bearer",
    expiresIn: 720,
    emailVerified: true,
    unverifiedLoginLimit: 0,
    unverifiedLoginCount: 0,
  };
};

export const authHandlers = [
  http.options(`${API_URL}/*`, () => {
    return new HttpResponse(null, { status: 200 });
  }),

  http.post(`${API_URL}${AUTH_REGISTER_PATH}`, async ({ request }) => {
    console.log(`[MSW] POST ${API_URL}${AUTH_REGISTER_PATH}`);
    try {
      const body = (await request.json()) as {
        email?: string;
        password?: string;
      };

      if (!body.email || !body.password) {
        const emailMissing = !body.email;
        const passwordMissing = !body.password;
        const missingFields = [
          emailMissing ? "email" : null,
          passwordMissing ? "password" : null,
        ]
          .filter(Boolean)
          .join(" and ");
        return HttpResponse.json(
          {
            timestamp: new Date().toISOString(),
            status: 400,
            error: "Bad Request",
            message: `${missingFields}: must not be blank`,
          },
          { status: 400 },
        );
      }

      const emailInvalid = !EMAIL_REGEX.test(body.email);
      const passwordInvalid =
        body.password.length < 8 || body.password.length > 100;

      if (emailInvalid || passwordInvalid) {
        const errors = [
          emailInvalid
            ? "email: must be a well-formed email address"
            : null,
          passwordInvalid
            ? "password: size must be between 8 and 100"
            : null,
        ]
          .filter(Boolean)
          .join("; ");
        return HttpResponse.json(
          {
            timestamp: new Date().toISOString(),
            status: 400,
            error: "Bad Request",
            message: errors,
          },
          { status: 400 },
        );
      }

      const existing = findUserByEmail(body.email);
      if (existing) {
        return HttpResponse.json(
          {
            timestamp: new Date().toISOString(),
            status: 409,
            error: "Conflict",
            message: "Ya existe una cuenta con ese email",
          },
          { status: 409 },
        );
      }

      const user = createUser(body.email, body.password);
      const response = buildAuthResponse({
        userId: user.id,
        email: user.email,
        roles: user.roles,
      });

      return HttpResponse.json(response, { status: 201 });
    } catch (error) {
      console.error("[MSW] /auth/register error:", error);
      return HttpResponse.json(
        { message: "Internal mock error" },
        { status: 500 },
      );
    }
  }),

  http.post(`${API_URL}${AUTH_LOGIN_PATH}`, async ({ request }) => {
    console.log(`[MSW] POST ${API_URL}${AUTH_LOGIN_PATH}`);
    try {
      const body = (await request.json()) as {
        email?: string;
        password?: string;
      };

      if (!body.email || !body.password) {
        const emailMissing = !body.email;
        const passwordMissing = !body.password;
        const missingFields = [
          emailMissing ? "email" : null,
          passwordMissing ? "password" : null,
        ]
          .filter(Boolean)
          .join(" and ");
        return HttpResponse.json(
          {
            timestamp: new Date().toISOString(),
            status: 400,
            error: "Bad Request",
            message: `${missingFields}: must not be blank`,
          },
          { status: 400 },
        );
      }

      const user = findUserByEmail(body.email);
      if (!user || !validatePassword(user, body.password) || !user.enabled) {
        return HttpResponse.json(
          {
            timestamp: new Date().toISOString(),
            status: 401,
            error: "Unauthorized",
            message: "Email o password invalidos",
          },
          { status: 401 },
        );
      }

      const response = buildAuthResponse({
        userId: user.id,
        email: user.email,
        roles: user.roles,
      });

      return HttpResponse.json(response);
    } catch (error) {
      console.error("[MSW] /auth/login error:", error);
      return HttpResponse.json(
        { message: "Internal mock error" },
        { status: 500 },
      );
    }
  }),

  http.post(`${API_URL}${AUTH_REFRESH_PATH}`, async ({ request }) => {
    console.log(`[MSW] POST ${API_URL}${AUTH_REFRESH_PATH}`);
    try {
      const body = (await request.json()) as { refreshToken?: string };

      if (!body.refreshToken) {
        return HttpResponse.json(
          {
            timestamp: new Date().toISOString(),
            status: 400,
            error: "Bad Request",
            message: "refreshToken: must not be blank",
          },
          { status: 400 },
        );
      }

      const response = buildAuthResponse({
        userId: MOCK_USER.id,
        email: MOCK_USER.email,
        roles: MOCK_USER.roles,
      });

      return HttpResponse.json(response);
    } catch (error) {
      console.error("[MSW] /auth/refresh error:", error);
      return HttpResponse.json(
        { message: "Internal mock error" },
        { status: 500 },
      );
    }
  }),

  http.post(`${API_URL}${AUTH_LOGOUT_PATH}`, async ({ request }) => {
    console.log(`[MSW] POST ${API_URL}${AUTH_LOGOUT_PATH}`);
    try {
      const body = (await request.json()) as { refreshToken?: string };
      if (!body.refreshToken) {
        return HttpResponse.json(
          {
            timestamp: new Date().toISOString(),
            status: 400,
            error: "Bad Request",
            message: "refreshToken: must not be blank",
          },
          { status: 400 },
        );
      }

      return new HttpResponse(null, { status: 204 });
    } catch (error) {
      console.error("[MSW] /auth/logout error:", error);
      return HttpResponse.json(
        { message: "Internal mock error" },
        { status: 500 },
      );
    }
  }),

  http.post(`${API_URL}${AUTH_VERIFY_PATH}`, async () => {
    console.log(`[MSW] POST ${API_URL}${AUTH_VERIFY_PATH}`);
    try {
      const permissions = getPermissionsForRoles(MOCK_USER.roles);

      return HttpResponse.json({
        valid: true,
        userId: MOCK_USER.id,
        email: MOCK_USER.email,
        roles: MOCK_USER.roles,
        permissions,
        expiresAt: new Date(Date.now() + 720_000).toISOString(),
        reason: null,
      } satisfies VerifyResponse);
    } catch (error) {
      console.error("[MSW] /auth/verify error:", error);
      return HttpResponse.json(
        { message: "Internal mock error" },
        { status: 500 },
      );
    }
  }),
];
