import type { ScheduledEmail, ScheduledEmailStatus } from "@/models";
import { create } from "zustand";

interface ScheduledEmailsFiltersState {
  status: ScheduledEmailStatus | null;
  createOpen: boolean;
  selectedScheduledEmail: ScheduledEmail | null;
  setStatus: (status: ScheduledEmailStatus | null) => void;
  setCreateOpen: (open: boolean) => void;
  setSelectedScheduledEmail: (email: ScheduledEmail | null) => void;
  resetAll: () => void;
}

const INITIAL_STATE = {
  status: null as ScheduledEmailStatus | null,
  createOpen: false,
  selectedScheduledEmail: null as ScheduledEmail | null,
};

export const useScheduledEmailsFiltersStore =
  create<ScheduledEmailsFiltersState>((set) => ({
    ...INITIAL_STATE,
    setStatus: (status) => set({ status }),
    setCreateOpen: (createOpen) => set({ createOpen }),
    setSelectedScheduledEmail: (selectedScheduledEmail) =>
      set({ selectedScheduledEmail }),
    resetAll: () => set(INITIAL_STATE),
  }));
