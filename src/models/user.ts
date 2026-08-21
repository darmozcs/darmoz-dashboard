export interface User {
  id: string;
  email: string;
  enabled: boolean;
  emailVerified: boolean;
  applicationId: string;
  applicationName: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}
