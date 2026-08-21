import { create } from "zustand";

interface RolesFiltersState {
  createOpen: boolean;
  setCreateOpen: (open: boolean) => void;
  resetAll: () => void;
}

const INITIAL_STATE = {
  createOpen: false,
};

export const useRolesFiltersStore = create<RolesFiltersState>((set) => ({
  ...INITIAL_STATE,
  setCreateOpen: (createOpen) => set({ createOpen }),
  resetAll: () => set(INITIAL_STATE),
}));
