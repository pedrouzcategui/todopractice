import {
  IconType,
  SiDiscord,
  SiGithub,
  SiGoogle,
} from "@icons-pack/react-simple-icons";

export type AuthProvider = "google" | "discord" | "github";

type AuthProviderMetadata = {
  Icon: IconType;
  label: string;
  // Related styles for the given provider
  styles: {
    backgroundColor: string;
  };
};

/**
 * Exposes useful metadata for each auth provider that can be reusable throughout the app
 */
export const AUTH_PROVIDERS = {
  discord: {
    Icon: SiDiscord,
    label: "Discord",
    styles: {
      backgroundColor: "bg-discord",
    },
  },
  google: {
    Icon: SiGoogle,
    label: "Google",
    styles: {
      backgroundColor: "bg-google",
    },
  },
  github: {
    Icon: SiGithub,
    label: "Github",
    styles: {
      backgroundColor: "bg-github",
    },
  },
} satisfies Record<AuthProvider, AuthProviderMetadata>;
