import { create } from "zustand";

interface MailAuditFiltersState {
  recipient: string;
  accion: string;
  clientId: string | null;
  from: string | null;
  to: string | null;
  setRecipient: (recipient: string) => void;
  setAccion: (accion: string) => void;
  setClientId: (clientId: string | null) => void;
  setFrom: (from: string | null) => void;
  setTo: (to: string | null) => void;
  resetAll: () => void;
}

const INITIAL_STATE = {
  recipient: "",
  accion: "",
  clientId: null as string | null,
  from: null as string | null,
  to: null as string | null,
};

export const useMailAuditFiltersStore = create<MailAuditFiltersState>(
  (set) => ({
    ...INITIAL_STATE,
    setRecipient: (recipient) => set({ recipient }),
    setAccion: (accion) => set({ accion }),
    setClientId: (clientId) => set({ clientId }),
    setFrom: (from) => set({ from }),
    setTo: (to) => set({ to }),
    resetAll: () => set(INITIAL_STATE),
  }),
);
