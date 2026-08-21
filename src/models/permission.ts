export interface RolePermission {
  id: string;
  roleId: string;
  role: string;
  applicationId: string;
  applicationName: string;
  service: string;
  httpMethod: string;
  endpointPattern: string;
  createdAt: string;
}
