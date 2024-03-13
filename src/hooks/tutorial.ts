import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export function useUpdateTutorialState() {
  return useMutation({
    async mutationFn() {
      const response = await api.post<{ ok: boolean }>("/tutorial/update");

      return response.data;
    },
  });
}
