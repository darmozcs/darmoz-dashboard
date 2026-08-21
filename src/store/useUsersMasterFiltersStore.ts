import { create } from "zustand";

interface UsersMasterFiltersState {
  search: string;
  page: number;
  limit: number;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  resetAll: () => void;
}

const INITIAL_STATE = {
  search: "",
  page: 1,
  limit: 10,
};

export const useUsersMasterFiltersStore = create<UsersMasterFiltersState>(
  (set) => ({
    ...INITIAL_STATE,
    setSearch: (search) => set({ search, page: 1 }),
    setPage: (page) => set({ page }),
    setLimit: (limit) => set({ limit, page: 1 }),
    resetAll: () => set(INITIAL_STATE),
  }),
);
