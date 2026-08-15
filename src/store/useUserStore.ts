import type { AuthPermission } from "@/models";
import { create } from "zustand";

interface UserState {
  userId: string | null;
  email: string | null;
  roles: string[];
  permissions: AuthPermission[];
  setUser: (data: Omit<UserState, "setUser" | "clearUser">) => void;
  clearUser: () => void;
}

const INITIAL_STATE = {
  userId: null,
  email: null,
  roles: [],
  permissions: [],
};

export const useUserStore = create<UserState>((set) => ({
  ...INITIAL_STATE,
  setUser: (data) => set(data),
  clearUser: () => set(INITIAL_STATE),
}));
