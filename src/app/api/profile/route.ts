import { withAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { parseApiError } from "@/lib/errors";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  return withAuth(async (session) => {
    try {
      const { name, image }: Prisma.UserUpdateInput = await req.json();
      const { user } = session;

      await db.user.update({
        data: {
          name,
          image,
        },
        where: {
          id: user.id, // 👈 we use the user's ID from the session so it always should be valid
        },
      });

      return NextResponse.json({});
    } catch (error) {
      const data = parseApiError(error);
      return NextResponse.json(data, { status: 500 });
    }
  })();
}
