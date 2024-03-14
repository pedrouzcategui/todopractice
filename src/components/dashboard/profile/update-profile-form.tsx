"use client";

import { ImagePreview } from "./image-preview";
import { Button, Input, Label } from "@/components/ui";
import { useToast } from "@/components/ui/use-toast";
import { AUTH_PROVIDERS, AuthProvider } from "@/constants/auth";
import { useUpdateProfile } from "@/hooks/profile";
import { useUploadThing } from "@/lib/files";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useState } from "react";

type AuthProvidersListProps = {
  userLinkedProviders: AuthProvider[];
};

function AuthProvidersList({ userLinkedProviders }: AuthProvidersListProps) {
  return (
    <section className="flex flex-col gap-2">
      <header>
        <h3 className="font-semibold text-center">Linked accounts</h3>
      </header>

      <ul className="flex justify-center gap-4">
        {Object.keys(AUTH_PROVIDERS).map((provider) => {
          // Iterates over the all the available providers and checks if the user has linked them
          const isLinked = userLinkedProviders.includes(
            provider as AuthProvider,
          );
          const { styles, Icon } = AUTH_PROVIDERS[provider as AuthProvider];

          return (
            <li key={provider}>
              <Button
                asChild
                disabled={!isLinked}
                size="icon"
                className={cn(
                  "p-2 pointer-events-none",
                  styles.backgroundColor,
                  !isLinked && "opacity-45",
                )}
              >
                <Icon />
              </Button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

type ProfileForm = {
  name: string;
  imageUrl: string;
  file: File | null;
};

const FORM_IDS = {
  name: "name",
  email: "email",
} as const;

type UpdateProfileFormProps = {
  userLinkedProviders: AuthProvider[];
  email: string;
  name: string;
  imageUrl: string;
};

export function UpdateProfileForm({
  email,
  imageUrl,
  name,
  userLinkedProviders,
}: UpdateProfileFormProps) {
  const { toast } = useToast();
  const { mutateAsync, isPending: isUploadingForm } = useUpdateProfile();
  const { startUpload, isUploading: isUploadingImage } =
    useUploadThing("imageUploader");

  const isLoading = isUploadingForm || isUploadingImage;

  const [profileForm, setProfileForm] = useState<ProfileForm>({
    name,
    imageUrl,
    file: null,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileForm((prev) => ({ ...prev, file, imageUrl }));
    }
  };

  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      let thumbnail = "";

      if (profileForm.file) {
        const extension = profileForm.file.name.split(".").pop();
        const newFile = new File(
          [profileForm.file],
          `profile-image-${email}.${extension}`,
        );
        const [{ url }] = (await startUpload([newFile])) as { url: string }[];
        thumbnail = url;
      }

      await mutateAsync({
        name: profileForm.name,
        image: thumbnail,
      });

      toast({
        title: "Profile updated successfully",
        description: "Your changes has been saved.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Failed to update profile",
        variant: "destructive",
      });
    }
  };
  return (
    <section className="w-full flex flex-col gap-4 items-center justify-center">
      <ImagePreview
        handleImageChange={handleImageChange}
        imageUrl={profileForm.imageUrl}
      />

      <form onSubmit={handleSubmitForm} className="w-full flex flex-col gap-6">
        <div className="flex flex-col justify-center gap-2">
          <Label htmlFor={FORM_IDS.name}>Name</Label>
          <Input
            id={FORM_IDS.name}
            name={FORM_IDS.name}
            value={profileForm.name}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label htmlFor={FORM_IDS.email}>Email</Label>
          <Input
            id={FORM_IDS.email}
            name={FORM_IDS.email}
            value={email}
            disabled
          />
        </div>

        <AuthProvidersList userLinkedProviders={userLinkedProviders} />

        <Button disabled={isLoading}>
          {isLoading ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <span>Save</span>
          )}
        </Button>
      </form>
    </section>
  );
}
