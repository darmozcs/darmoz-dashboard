import type { User } from "@/models";
import { create } from "zustand";

interface UsersMasterFiltersState {
  search: string;
  applicationId: string | null;
  page: number;
  limit: number;
  createOpen: boolean;
  selectedUserForRoles: User | null;
  setSearch: (search: string) => void;
  setApplicationId: (applicationId: string | null) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setCreateOpen: (open: boolean) => void;
  setSelectedUserForRoles: (user: User | null) => void;
  resetAll: () => void;
}

const INITIAL_STATE = {
  search: "",
  applicationId: null as string | null,
  page: 1,
  limit: 10,
  createOpen: false,
  selectedUserForRoles: null as User | null,
};

export const useUsersMasterFiltersStore = create<UsersMasterFiltersState>(
  (set) => ({
    ...INITIAL_STATE,
    setSearch: (search) => set({ search, page: 1 }),
    setApplicationId: (applicationId) => set({ applicationId, page: 1 }),
    setPage: (page) => set({ page }),
    setLimit: (limit) => set({ limit, page: 1 }),
    setCreateOpen: (createOpen) => set({ createOpen }),
    setSelectedUserForRoles: (selectedUserForRoles) =>
      set({ selectedUserForRoles }),
    resetAll: () => set(INITIAL_STATE),
  }),
);
