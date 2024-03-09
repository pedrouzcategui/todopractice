import { withAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { parseApiError } from "@/lib/errors";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST() {
  return withAuth(async (req, session) => {
    try {
      const data: Prisma.WorkspaceCreateInput = await req.json();
      const { user } = session;

      if (!user?.id) {
        throw new Error("Bad request: User not found.");
      }

      const workspace = await db.workspace.create({
        data: {
          ...data,
          users: {
            create: {
              userId: user?.id,
              isAdmin: true,
            },
          },
        },
      });

      return NextResponse.json(workspace);
    } catch (error) {
      const data = parseApiError(error);
      return NextResponse.json(data, { status: 500 });
    }
  });
}
