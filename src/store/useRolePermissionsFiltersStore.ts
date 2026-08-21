import { create } from "zustand";

interface RolePermissionsFiltersState {
  createOpen: boolean;
  setCreateOpen: (open: boolean) => void;
  resetAll: () => void;
}

const INITIAL_STATE = {
  createOpen: false,
};

export const useRolePermissionsFiltersStore =
  create<RolePermissionsFiltersState>((set) => ({
    ...INITIAL_STATE,
    setCreateOpen: (createOpen) => set({ createOpen }),
    resetAll: () => set(INITIAL_STATE),
  }));
