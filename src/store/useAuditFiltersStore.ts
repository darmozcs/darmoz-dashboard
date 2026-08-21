import type { AuditAction } from "@/models";
import { create } from "zustand";

interface AuditFiltersState {
  action: AuditAction | null;
  applicationId: string | null;
  email: string;
  from: string | null;
  to: string | null;
  page: number;
  setAction: (action: AuditAction | null) => void;
  setApplicationId: (applicationId: string | null) => void;
  setEmail: (email: string) => void;
  setFrom: (from: string | null) => void;
  setTo: (to: string | null) => void;
  setPage: (page: number) => void;
  resetAll: () => void;
}

const INITIAL_STATE = {
  action: null as AuditAction | null,
  applicationId: null as string | null,
  email: "",
  from: null as string | null,
  to: null as string | null,
  page: 1,
};

export const useAuditFiltersStore = create<AuditFiltersState>((set) => ({
  ...INITIAL_STATE,
  setAction: (action) => set({ action, page: 1 }),
  setApplicationId: (applicationId) => set({ applicationId, page: 1 }),
  setEmail: (email) => set({ email, page: 1 }),
  setFrom: (from) => set({ from, page: 1 }),
  setTo: (to) => set({ to, page: 1 }),
  setPage: (page) => set({ page }),
  resetAll: () => set(INITIAL_STATE),
}));
