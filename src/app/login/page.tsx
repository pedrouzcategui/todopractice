import LoginButtons from "@/components/login/login-buttons";
import React from "react";

export default async function LoginPage() {
  return (
    <main>
      {/* Main Login Wrapper */}
      <section className="w-dvw h-dvh text-foreground flex justify-center items-center">
        {/* Floating Card */}
        <div className="w-full max-w-lg border border-primary py-8 px-6 bg-card rounded-md shadow-md">
          <div className="mb-8 pb-4 border-b border-border">
            <h1 className="text-2xl font-bold mb-1">Login</h1>
            <p>Get access to your workspaces.</p>
          </div>

          <LoginButtons />
        </div>
      </section>
    </main>
  );
}
