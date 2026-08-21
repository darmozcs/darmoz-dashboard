import type { MailClientApplication } from "@/models";
import { create } from "zustand";

interface MailClientApplicationsFiltersState {
  createOpen: boolean;
  selectedApplication: MailClientApplication | null;
  setCreateOpen: (open: boolean) => void;
  setSelectedApplication: (application: MailClientApplication | null) => void;
  resetAll: () => void;
}

const INITIAL_STATE = {
  createOpen: false,
  selectedApplication: null as MailClientApplication | null,
};

export const useMailClientApplicationsFiltersStore =
  create<MailClientApplicationsFiltersState>((set) => ({
    ...INITIAL_STATE,
    setCreateOpen: (createOpen) => set({ createOpen }),
    setSelectedApplication: (selectedApplication) =>
      set({ selectedApplication }),
    resetAll: () => set(INITIAL_STATE),
  }));
