"use client";

import { ChangeEvent } from "react";
import { Input } from "@/components/ui";
import { useTutorialStore } from "@/stores/tutorial.store";

export function ImageUploader() {
  const setWorkspaceProperty = useTutorialStore(
    (state) => state.setWorkspaceProperty,
  );

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && file.type.substr(0, 5) === "image") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setWorkspaceProperty("image_url", reader.result as string); // Cast reader.result to string
      };
      reader.readAsDataURL(file);
    } else {
      setWorkspaceProperty("image_url", "");
    }
  };
  return <Input type="file" onChange={handleImageChange} />;
}
