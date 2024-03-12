"use client";

import { Input } from "@/components/ui";
import { useTutorialStore } from "@/stores/tutorial.store";
import { ChangeEvent } from "react";

export function ImageUploader() {
  const setWorkspaceProperty = useTutorialStore(
    (state) => state.setWorkspaceProperty,
  );

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setWorkspaceProperty("image", file);
    }
  };
  return <Input type="file" onChange={handleImageChange} accept="img" />;
}
