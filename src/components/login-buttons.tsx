"use client";

import { SiDiscord, SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

export default function LoginButtons() {
  return (
    <div className="grid gap-3">
      <Button
        className={createButtonClass("google")}
        onClick={() => signIn("google")}
      >
        <SiGoogle size={18} />
        Google
      </Button>
      <Button
        className={createButtonClass("github")}
        onClick={() => signIn("github")}
      >
        <SiGithub size={18} />
        Github
      </Button>
      <Button
        className={createButtonClass("discord")}
        onClick={() => signIn("discord")}
      >
        <SiDiscord size={18} />
        Discord
      </Button>
    </div>
  );
}

function createButtonClass(provider: "google" | "github" | "discord") {
  return `bg-${provider} border border-${provider} text-card gap-2 hover:bg-${provider}/85 hover:text-card transition-all duration-200`;
}
