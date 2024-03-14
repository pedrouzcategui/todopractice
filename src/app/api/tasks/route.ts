import { withAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { parseApiError } from "@/lib/errors";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function POST(req: NextRequest) {
  return withAuth(async (session) => {
    try {
      const data: Prisma.TaskCreateInput = await req.json();
      const { user } = session;

      if (!user?.id) {
        throw new Error("Bad request: User not found.");
      }

      const task = await db.task.create({
        data,
      });

      return NextResponse.json(task, { status: 201 });
    } catch (error) {
      const data = parseApiError(error);
      return NextResponse.json(data, { status: 500 });
    }
  })();
}
