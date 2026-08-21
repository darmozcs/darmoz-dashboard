import type { Aplication } from "@/models";
import { create } from "zustand";

interface ApplicationsFiltersState {
  createOpen: boolean;
  selectedApplication: Aplication | null;
  setCreateOpen: (open: boolean) => void;
  setSelectedApplication: (application: Aplication | null) => void;
  resetAll: () => void;
}

const INITIAL_STATE = {
  createOpen: false,
  selectedApplication: null as Aplication | null,
};

export const useApplicationsFiltersStore =
  create<ApplicationsFiltersState>((set) => ({
    ...INITIAL_STATE,
    setCreateOpen: (createOpen) => set({ createOpen }),
    setSelectedApplication: (selectedApplication) =>
      set({ selectedApplication }),
    resetAll: () => set(INITIAL_STATE),
  }));
