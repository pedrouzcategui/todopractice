"use client";

import { useCreateWorkspace } from "@/hooks/workspaces";
import { api } from "@/lib/api";
import { useUploadThing } from "@/lib/files";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import WorkspaceForm from "./form";

export default function CreateWorkspaceForm() {
  const router = useRouter();
  const { mutateAsync, isPending: isUploadingFormData } = useCreateWorkspace();
  const { startUpload, isUploading: isUploadingImage } =
    useUploadThing("imageUploader");

  async function handleSubmit(data: {
    title: string;
    description: string;
    image?: File;
  }) {
    let thumbnail = "";

    // TODO: delete image on error
    if (data.image) {
      const extension = data.image.name.split(".").pop();
      const newFile = new File([data.image], nanoid() + "." + extension);
      const [{ url }] = (await startUpload([newFile])) as { url: string }[];
      thumbnail = url;
    }

    await mutateAsync({
      description: data.description,
      title: data.title,
      thumbnail,
    });
    await api.get("/revalidate?path=/dashboard/workspaces");
    router.refresh();
    alert("Workspace created!");
    router.push("/dashboard/workspaces");
  }

  const isLoading = isUploadingFormData || isUploadingImage;

  return <WorkspaceForm onSubmit={handleSubmit} isLoading={isLoading} />;
}
