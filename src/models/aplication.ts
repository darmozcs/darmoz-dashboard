export interface Aplication {
  id: string;
  serviceName: string;
  name: string;
  description: string;
  unverifiedLoginLimit: number;
  // Duración del access token en segundos; null = valor por defecto.
  accessTokenTtlSeconds: number | null;
  refreshedAccessTokenTtlSeconds: number | null;
  createdAt: string;
}
