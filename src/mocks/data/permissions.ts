import type { AuthPermission } from "@/models";

const ROLE_PERMISSIONS: Record<string, AuthPermission[]> = {
  USER: [
    { service: "nexora-api", method: "GET", path: "/api/products/**" },
  ],
  ADMIN: [
    { service: "nexora-api", method: "GET", path: "/api/**" },
    { service: "nexora-api", method: "POST", path: "/api/**" },
    { service: "nexora-api", method: "PUT", path: "/api/**" },
    { service: "nexora-api", method: "DELETE", path: "/api/**" },
  ],
};

export const getPermissionsForRoles = (roles: string[]): AuthPermission[] => {
  const seen = new Set<string>();
  const permissions: AuthPermission[] = [];

  for (const role of roles) {
    const rolePerms = ROLE_PERMISSIONS[role] ?? [];
    for (const perm of rolePerms) {
      const key = `${perm.service}:${perm.method}:${perm.path}`;
      if (!seen.has(key)) {
        seen.add(key);
        permissions.push(perm);
      }
    }
  }

  return permissions;
};
