"use client";

import { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ImageInputProps = {
  image?: string;
};

export function ImageInput({ image }: ImageInputProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);

  // TODO: add logic for handling image uploads
  const handleOpenFileSelector = () => {
    imageInputRef.current?.click();
  };

  return (
    <figure>
      <input ref={imageInputRef} type="file" className="hidden" />
      <Avatar onClick={handleOpenFileSelector} className="h-36 w-36">
        <AvatarImage src={image} alt="Current profile image" />
        <AvatarFallback>Change</AvatarFallback>
      </Avatar>
    </figure>
  );
}
