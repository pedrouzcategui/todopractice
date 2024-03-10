import { api } from "@/lib/api";
import { Prisma, Workspace } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";

export function useCreateWorkspace() {
  return useMutation({
    async mutationFn(data: Prisma.WorkspaceCreateInput) {
      const response = await api.post<Prisma.WorkspaceCreateInput, Workspace>(
        "/workspace",
        data,
      );

      return response.data;
    },
  });
}
