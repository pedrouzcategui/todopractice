"use client";

import React, { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ImageInputProps = {
  image?: string;
  handleImageChange: (file: React.ChangeEvent<HTMLInputElement>) => void;
};

export function ImageInput({ image, handleImageChange }: ImageInputProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);

  // TODO: add logic for handling image uploads
  const handleOpenFileSelector = () => {
    imageInputRef.current?.click();
  };

  return (
    <figure>
      <input
        ref={imageInputRef}
        onChange={handleImageChange}
        type="file"
        className="hidden"
      />
      <Avatar onClick={handleOpenFileSelector} className="h-36 w-36">
        <AvatarImage src={image} alt="Current profile image" />
        <AvatarFallback>Change</AvatarFallback>
      </Avatar>
    </figure>
  );
}
