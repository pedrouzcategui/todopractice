import { useMutation } from "@tanstack/react-query";
import { Prisma } from "@prisma/client";
import { api } from "@/lib/api";

export function useUpdateProfile() {
  return useMutation({
    async mutationFn(data: Prisma.UserUpdateInput) {
      const response = await api.put<Prisma.UserUpdateInput, void>(
        "/profile",
        data,
      );

      return response.data;
    },
  });
}
