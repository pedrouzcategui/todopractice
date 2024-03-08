"use client";

import { SiDiscord, SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

export default function LoginButtons() {
  return (
    <div className="grid gap-3">
      <Button
        className={`bg-google border border-google text-card gap-2 hover:bg-google/85 hover:text-card transition-all duration-200`}
        onClick={() => signIn("google")}
      >
        <SiGoogle size={18} />
        Google
      </Button>
      <Button
        className={`bg-github border border-github text-card gap-2 hover:bg-github/85 hover:text-card transition-all duration-200`}
        onClick={() => signIn("github")}
      >
        <SiGithub size={18} />
        Github
      </Button>
      <Button
        className={`bg-discord border border-discord text-card gap-2 hover:bg-discord/85 hover:text-card transition-all duration-200`}
        onClick={() => signIn("discord")}
      >
        <SiDiscord size={18} />
        Discord
      </Button>
    </div>
  );
}
