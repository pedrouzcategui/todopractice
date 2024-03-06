import { create } from "zustand";
import type { IWorkspace } from "@/types";

interface WorkspaceState {
  workspace: IWorkspace;
  currentStep: number;
  setStep: (by: number) => void;
  setWorkspaceProperty: <K extends keyof IWorkspace>(
    key: K,
    value: IWorkspace[K]
  ) => void;
}

export const useTutorialStore = create<WorkspaceState>()((set) => ({
  workspace: {
    name: "",
    description: "",
    image_url: "",
  },
  currentStep: 0,
  setStep: (by) => set((state) => ({ currentStep: state.currentStep + by })),
  setWorkspaceProperty: (key, value) =>
    set((state) => ({ workspace: { ...state.workspace, [key]: value } })),
}));
