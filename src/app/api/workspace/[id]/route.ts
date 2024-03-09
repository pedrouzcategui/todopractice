import { withAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { parseApiError } from "@/lib/errors";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest, { params }: { params: { id: string } }) {
  return withAuth(async (session) => {
    try {
      const task = await db.workspace.findFirst({
        where: { id: params.id, users: { some: { userId: session.user?.id } } },
      });
      if (!task) throw new Error("Not found");

      return NextResponse.json(task);
    } catch (error) {
      const data = parseApiError(error);
      return NextResponse.json(data, { status: 500 });
    }
  });
}

export function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  return withAuth(async (session) => {
    try {
      const data: Prisma.WorkspaceUpdateInput = await req.json();
      const task = await db.workspace.update({
        where: { id: params.id, users: { some: { userId: session.user?.id } } },
        data,
      });
      if (!task) throw new Error("Not found / Unauthorized");

      return NextResponse.json(task);
    } catch (error) {
      const data = parseApiError(error);
      return NextResponse.json(data, { status: 500 });
    }
  });
}

export function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(async (session) => {
    try {
      const task = await db.workspace.delete({
        where: { id: params.id, users: { some: { userId: session.user?.id } } },
      });
      if (!task) throw new Error("Not found / Unauthorized");

      return NextResponse.json(task);
    } catch (error) {
      const data = parseApiError(error);
      return NextResponse.json(data, { status: 500 });
    }
  });
}
