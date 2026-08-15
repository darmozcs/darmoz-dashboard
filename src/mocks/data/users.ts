export interface MockUser {
  id: string;
  email: string;
  password: string;
  roles: string[];
  enabled: boolean;
}

export const MOCK_USERS: MockUser[] = [
  {
    id: "0f3a2b1c-4d5e-4f6a-8b7c-9d0e1f2a3b4c",
    email: "demo@darmoz.com",
    password: "Demo12345!",
    roles: ["USER"],
    enabled: true,
  },
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    email: "admin@darmoz.com",
    password: "Admin12345!",
    roles: ["USER", "ADMIN"],
    enabled: true,
  },
];

const users = new Map<string, MockUser>(
  MOCK_USERS.map((u) => [u.email, u]),
);

export const findUserByEmail = (email: string): MockUser | undefined =>
  users.get(email);

export const createUser = (
  email: string,
  password: string,
): MockUser => {
  const user: MockUser = {
    id: crypto.randomUUID(),
    email,
    password,
    roles: ["USER"],
    enabled: true,
  };
  users.set(email, user);
  return user;
};

export const validatePassword = (
  user: MockUser,
  password: string,
): boolean => user.password === password;
