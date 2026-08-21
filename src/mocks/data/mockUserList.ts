import type { User } from "@/models";

const FIRST_NAMES = [
  "Carlos", "María", "Juan", "Ana", "Pedro", "Laura", "Miguel", "Sofía",
  "Diego", "Valentina", "Andrés", "Camila", "Luis", "Isabella", "Jorge", "Lucía",
  "Fernando", "Gabriela", "Roberto", "Daniela", "Eduardo", "Patricia", "Ricardo",
  "Alejandra", "Martín", "Claudia", "Pablo", "Adriana", "Sergio", "Carolina",
  "Raúl", "Mónica", "Ángel", "Teresa", "Héctor", "Rosa", "Enrique", "Carmen",
  "Óscar", "Elena", "Javier", "Marta", "Manuel", "Paula", "Francisco", "Nuria",
  "Alejandro", "Cristina", "José", "Beatriz",
];

const LAST_NAMES = [
  "García", "López", "Martínez", "González", "Rodríguez", "Fernández",
  "Pérez", "Sánchez", "Ramírez", "Torres", "Flores", "Rivera", "Gómez",
  "Díaz", "Cruz", "Morales", "Reyes", "Ortiz", "Gutiérrez", "Chávez",
];

const DOMAINS = ["gmail.com", "outlook.com", "yahoo.com", "hotmail.com"];
const APPLICATIONS = [
  { id: "app-001", name: "Nexora API" },
  { id: "app-002", name: "Darmoz Admin" },
  { id: "app-003", name: "Portal Web" },
];

const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const randomDate = (start: Date, end: Date): string =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();

const generateId = (): string => {
  const hex = () => Math.floor(Math.random() * 0xffff).toString(16).padStart(4, "0");
  return `${hex()}${hex()}-${hex()}-${hex()}-${hex()}-${hex()}${hex()}${hex()}`;
};

const generateMockUsers = (): User[] => {
  const users: User[] = [];

  for (let i = 0; i < 50; i++) {
    const firstName = FIRST_NAMES[i % FIRST_NAMES.length];
    const lastName = LAST_NAMES[i % LAST_NAMES.length];
    const app = APPLICATIONS[i % APPLICATIONS.length];

    users.push({
      id: generateId(),
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@${pick(DOMAINS)}`,
      enabled: i % 7 !== 0,
      emailVerified: i % 3 !== 0,
      applicationId: app.id,
      applicationName: app.name,
      roles: i % 5 === 0 ? ["USER", "ADMIN"] : ["USER"],
      createdAt: randomDate(new Date("2025-01-01"), new Date("2026-08-15")),
      updatedAt: randomDate(new Date("2026-01-01"), new Date("2026-08-15")),
    });
  }

  return users;
};

export const MOCK_USER_LIST: User[] = generateMockUsers();
