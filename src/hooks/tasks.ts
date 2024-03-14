import { api } from "@/lib/api";
import { Task, TaskStatus } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";

export type TaskCreationInput = {
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string | Date;
  assignee: {
    connect: {
      id: string;
    };
  };
  Workspace: {
    connect: {
      id: string;
    };
  };
  createdBy: {
    connect: {
      id: string;
    };
  };
};

export function useCreateTask() {
  return useMutation({
    async mutationFn(data: TaskCreationInput) {
      const response = await api.post<TaskCreationInput>("/tasks", data);
      return response.data;
    },
  });
}
