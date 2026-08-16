import { create } from "zustand";

interface UsersMasterFiltersState {
  search: string;
  status: string | undefined;
  state: string | undefined;
  page: number;
  limit: number;
  setSearch: (search: string) => void;
  setStatus: (status: string | undefined) => void;
  setState: (state: string | undefined) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  resetFilters: () => void;
  resetAll: () => void;
  getQueryParams: () => Record<string, string | number>;
}

const INITIAL_STATE = {
  search: "",
  status: undefined as string | undefined,
  state: undefined as string | undefined,
  page: 1,
  limit: 10,
};

export const useUsersMasterFiltersStore = create<UsersMasterFiltersState>(
  (set, get) => ({
    ...INITIAL_STATE,
    setSearch: (search) => set({ search, page: 1 }),
    setStatus: (status) => set({ status, page: 1 }),
    setState: (state) => set({ state, page: 1 }),
    setPage: (page) => set({ page }),
    setLimit: (limit) => set({ limit, page: 1 }),
    resetFilters: () =>
      set({
        search: INITIAL_STATE.search,
        status: INITIAL_STATE.status,
        state: INITIAL_STATE.state,
        page: 1,
      }),
    resetAll: () => set(INITIAL_STATE),
    getQueryParams: () => {
      const { search, status, state, page, limit } = get();
      return {
        page: page - 1,
        size: limit,
        ...(search && { search }),
        ...(status && { status }),
        ...(state && { state }),
      };
    },
  }),
);
