import CreateWorkspaceForm from "@/components/dashboard/workspaces/create-workspace";
import { buttonVariants } from "@/components/ui";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function NewWorkspacePage() {
  return (
    <main className="p-16">
      <header className="mb-12">
        <Link
          href="/dashboard/workspaces"
          className={cn(buttonVariants({ variant: "ghost" }), "-ml-4 mb-6")}
        >
          <ArrowLeft className="w-5 h-5 mr-3" />
          Back to Workspaces
        </Link>

        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          New Workspace
        </h1>
        <p className="mt-3 text-muted-foreground">
          Configure your new workspace.
        </p>
      </header>

      <CreateWorkspaceForm />
    </main>
  );
}
