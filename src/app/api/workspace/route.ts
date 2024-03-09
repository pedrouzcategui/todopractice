import { withAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST() {
  return withAuth(async (req, session) => {
    const data: Prisma.WorkspaceCreateInput = await req.json();
    const { user } = session;

    if (!user?.id) {
      return NextResponse.json({ message: "Bad Input" }, { status: 402 });
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
  });
}
