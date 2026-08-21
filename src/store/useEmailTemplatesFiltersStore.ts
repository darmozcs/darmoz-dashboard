import type { EmailTemplate } from "@/models";
import { create } from "zustand";

interface EmailTemplatesFiltersState {
  createOpen: boolean;
  selectedTemplate: EmailTemplate | null;
  setCreateOpen: (open: boolean) => void;
  setSelectedTemplate: (template: EmailTemplate | null) => void;
  resetAll: () => void;
}

const INITIAL_STATE = {
  createOpen: false,
  selectedTemplate: null as EmailTemplate | null,
};

export const useEmailTemplatesFiltersStore =
  create<EmailTemplatesFiltersState>((set) => ({
    ...INITIAL_STATE,
    setCreateOpen: (createOpen) => set({ createOpen }),
    setSelectedTemplate: (selectedTemplate) => set({ selectedTemplate }),
    resetAll: () => set(INITIAL_STATE),
  }));
