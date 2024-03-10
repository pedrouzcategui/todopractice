import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get("path");

  if (path) {
    revalidatePath(path);
    return Response.json({ revalidated: true, now: Date.now() });
  }

  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: "Missing path to revalidate",
  });
}
