"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "../ui";

export default function SignOutButton() {
  function handleSignOut() {
    signOut({
      callbackUrl: "/login",
    });
  }

  return (
    <Button
      variant="ghost"
      className="fixed top-6 left-6 text-destructive hover:bg-destructive/25 hover:text-destructive"
      onClick={handleSignOut}
    >
      <LogOut size={16} className="mr-3" />
      Sign out
    </Button>
  );
}
