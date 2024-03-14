"use client";

import { ImageInput } from "@/components/image-input";
import { Button, Input, Label } from "@/components/ui";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import {
  IconType,
  SiDiscord as DiscordIcon,
  SiGithub as GithubIcon,
  SiGoogle as GoogleIcon,
} from "@icons-pack/react-simple-icons";
import { Loader } from "lucide-react";
import { useState } from "react";

type AuthProviders = "google" | "discord" | "github";
const AUTH_PROVIDERS = [
  "google",
  "discord",
  "github",
] satisfies AuthProviders[];

type ProviderItemProps = {
  color: string;
  Icon: IconType;
};

const AUTH_PROVIDERS_STYLES = {
  google: {
    color: "bg-google",
    Icon: GoogleIcon,
  },
  discord: {
    color: "bg-discord",
    Icon: DiscordIcon,
  },
  github: {
    color: "bg-github",
    Icon: GithubIcon,
  },
} satisfies Record<AuthProviders, ProviderItemProps>;

type AuthProvidersListProps = {
  providers: AuthProviders[];
};

function AuthProvidersList({ providers }: AuthProvidersListProps) {
  return (
    <section className="flex flex-col gap-2">
      <header>
        <h3 className="font-semibold text-center">Linked accounts</h3>
      </header>

      <ul className="flex justify-center gap-4">
        {AUTH_PROVIDERS.map((provider) => {
          const isLinked = providers.includes(provider);
          const { color, Icon } = AUTH_PROVIDERS_STYLES[provider];

          return (
            <li key={provider}>
              <Button
                asChild
                disabled={!isLinked}
                size="icon"
                className={cn(
                  "p-2 pointer-events-none",
                  color,
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
  const { toast } = useToast();

  const [profileForm, setProfileForm] = useState<ProfileForm>({
    name,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      toast({
        title: "Profile updated successfully",
        description: "Your changes has been saved.",
        className: "bg-success text-success-foreground fill-success-foreground",
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

        <AuthProvidersList providers={authProviders as AuthProviders[]} />

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
