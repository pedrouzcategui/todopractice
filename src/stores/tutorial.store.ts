import { create } from "zustand";
import type { IWorkspace } from "@/types";

interface WorkspaceState {
  workspace: IWorkspace;
  currentStep: number;
  goNext: () => void;
  goBack: () => void;
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
  goNext: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  goBack: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  setWorkspaceProperty: (key, value) =>
    set((state) => ({ workspace: { ...state.workspace, [key]: value } })),
}));
