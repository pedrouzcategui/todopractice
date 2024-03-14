import { withAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { parseApiError } from "@/lib/errors";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const task = await db.task.findFirst({
      where: {
        id: params.id,
      },
    });
    if (!task) throw new Error("Not found");
    return NextResponse.json(task);
  } catch (error) {
    const data = parseApiError(error);
    return NextResponse.json(data, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
  } catch (error) {}
}
