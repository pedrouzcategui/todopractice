"use client";

import React, { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";

type ImagePreviewProps = {
  handleImageChange: (file: React.ChangeEvent<HTMLInputElement>) => void;
  imageUrl: string;
};

export function ImagePreview({
  imageUrl,
  handleImageChange,
}: ImagePreviewProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);

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
        <AvatarImage src={imageUrl} alt="Current profile image" />
        <AvatarFallback>
          <Loader2 className="h-6 w-6 animate-spin" />
        </AvatarFallback>
      </Avatar>
    </figure>
  );
}
