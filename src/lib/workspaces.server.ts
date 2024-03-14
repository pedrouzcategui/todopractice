import { User } from "@prisma/client";
import { db } from "./db";
import { parseApiError } from "./errors";

export async function findUsersByWorkspaceId(
  workspaceId: string,
): Promise<User[]> {
  try {
    const users = await db.user.findMany({
      where: {
        workspaces: {
          some: {
            workspaceId,
          },
        },
      },
    });
    return users;
  } catch (error) {
    throw parseApiError(error);
  }
}
