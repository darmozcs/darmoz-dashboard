import type { AuthPermission } from "@/models";

const ACCESS_TOKEN_TTL_MS = 720_000;

export interface TokenPayload {
  jti: string;
  sub: string;
  email: string;
  roles: string[];
  permissions: AuthPermission[];
  typ: "access";
  iss: string;
  iat: number;
  exp: number;
}

export const generateId = (): string => crypto.randomUUID();

const base64UrlEncode = (data: string): string =>
  btoa(data).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

export const createMockAccessToken = (payload: {
  userId: string;
  email: string;
  roles: string[];
  permissions: AuthPermission[];
}): string => {
  const now = Date.now();
  const tokenPayload: TokenPayload = {
    jti: generateId(),
    sub: payload.userId,
    email: payload.email,
    roles: payload.roles,
    permissions: payload.permissions,
    typ: "access",
    iss: "darmoz-auth-mock",
    iat: Math.floor(now / 1000),
    exp: Math.floor((now + ACCESS_TOKEN_TTL_MS) / 1000),
  };

  const header = base64UrlEncode(
    JSON.stringify({ alg: "HS256", typ: "JWT" }),
  );
  const body = base64UrlEncode(JSON.stringify(tokenPayload));
  const signature = base64UrlEncode("mock-signature");

  return `${header}.${body}.${signature}`;
};

export const createMockRefreshToken = (): string => generateId();

export const decodeMockToken = (token: string): TokenPayload | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1])) as TokenPayload;
    return payload;
  } catch {
    return null;
  }
};
