import { db } from "@/lib/db";
import { getSession } from "@/lib/user";
import { NextResponse } from "next/server";

export async function POST() {
  const { user } = (await getSession()) ?? {};

  if (!user) {
    return NextResponse.json({ ok: false, error: "User not found" });
  }

  await db.user.update({
    where: { id: user.id },
    data: { isTutorialFinished: true },
  });

  return NextResponse.json({ ok: true });
}
