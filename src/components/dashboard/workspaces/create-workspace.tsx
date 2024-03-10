"use client";

import { useCreateWorkspace } from "@/hooks/workspaces";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import WorkspaceForm from "./form";

export default function CreateWorkspaceForm() {
  const router = useRouter();
  const { mutateAsync, isPending } = useCreateWorkspace();

  async function handleSubmit(data: {
    title: string;
    description: string;
    image?: File;
  }) {
    await mutateAsync(data);
    await api.get("/revalidate?path=/dashboard/workspaces");
    router.refresh();
    alert("Workspace created!");
    router.push("/dashboard/workspaces");
  }

  return <WorkspaceForm onSubmit={handleSubmit} isLoading={isPending} />;
}
