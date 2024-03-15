import { useMutation } from "@tanstack/react-query";
import { Prisma } from "@prisma/client";
import { api } from "@/lib/api";

export function useUpdateProfile() {
  return useMutation({
    async mutationFn(data: Pick<Prisma.UserUpdateInput, "name" | "image">) {
      await api.put<void>("/profile", data);
    },
  });
}
