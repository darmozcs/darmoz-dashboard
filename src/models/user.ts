export interface User {
  id: string;
  email: string;
  enabled: boolean;
  emailVerified: boolean;
  unverifiedLoginCount: number;
  applicationId: string;
  applicationName: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}
