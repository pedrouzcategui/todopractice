import { Task } from "@prisma/client";
import { db } from "./db";
import { parseApiError } from "./errors";

export async function getTaskById(taskId: string): Promise<Task> {
  try {
    const task = await db.task.findFirstOrThrow({
      where: {
        id: taskId,
      },
    });
    return task;
  } catch (error) {
    throw parseApiError(error);
  }
}
