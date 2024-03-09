import type { TWorkspace } from "@/types";
import { create } from "zustand";

type WorkspaceState = {
  workspace: TWorkspace;
  currentStep: number;
  goNext: () => void;
  goBack: () => void;
  setWorkspaceProperty: <K extends keyof TWorkspace>(
    key: K,
    value: TWorkspace[K],
  ) => void;
};

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
