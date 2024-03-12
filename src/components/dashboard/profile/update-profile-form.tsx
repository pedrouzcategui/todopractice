"use client";

import { ImageInput } from "@/components/image-input";
import { Button, Input, Label } from "@/components/ui";
import { Loader } from "lucide-react";
import { useState } from "react";

type ProfileForm = {
  name: string;
};

const FORM_IDS = {
  name: "name",
  email: "email",
} as const;

type UpdateProfileFormProps = {
  authProviders: string[];
  email: string;
  name: string;
  image?: string;
};

export function UpdateProfileForm({
  email,
  image,
  name,
  authProviders,
}: UpdateProfileFormProps) {
  const [profileForm, setProfileForm] = useState<ProfileForm>({
    name,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(profileForm);
  };
  return (
    <section className="w-full flex flex-col gap-4 items-center justify-center">
      <ImageInput image={image} />

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

        <div>
          <h3>Linked accounts</h3>

          <ul>
            {authProviders.map((account) => (
              <li key={account}>{account}</li>
            ))}
          </ul>
        </div>

        {false ? (
          <Button disabled>
            <Loader className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </Button>
        ) : (
          <Button variant="default" className="w-full" type="submit">
            Save
          </Button>
        )}
      </form>
    </section>
  );
}
