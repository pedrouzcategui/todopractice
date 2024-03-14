"use client";

import React from "react";

export const TutorialContext = React.createContext({} as TutorialContextValue);

type TutorialProviderProps = {
  children: React.ReactNode;
};

type TutorialForm = {
  title: string;
  description: string;
  thumbnail: File | undefined;
};

type TutorialContextValue = {
  form: TutorialForm;
  currentStep: number;
  goNext: () => void;
  goBack: () => void;
  setFormProperty: <K extends keyof TutorialForm>(
    key: K,
    value: TutorialForm[K],
  ) => void;
};

export default function TutorialContextProvider({
  children,
}: TutorialProviderProps) {
  const [form, setForm] = React.useState<TutorialForm>({
    title: "",
    description: "",
    thumbnail: undefined,
  });
  const [currentStep, setCurrentStep] = React.useState(0);

  const goNext = () => setCurrentStep((prev) => prev + 1);
  const goBack = () => setCurrentStep((prev) => prev - 1);

  function setFormProperty<K extends keyof TutorialForm>(
    key: K,
    value: (typeof form)[K],
  ) {
    return setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <TutorialContext.Provider
      value={{ form, currentStep, goNext, goBack, setFormProperty }}
    >
      {children}
    </TutorialContext.Provider>
  );
}

export function useTutorialContext() {
  const ctx = React.useContext(TutorialContext);
  if (!ctx) {
    throw new Error(
      "useTutorialContext must be used within a TutorialProvider",
    );
  }

  return ctx;
}
