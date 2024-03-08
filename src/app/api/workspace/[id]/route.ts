import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  return NextResponse.json({
    message: "Hello from the workspace API route!",
  });
}

export function PUT(req: NextRequest) {
  return NextResponse.json({
    message: "Hello from the workspace API route!",
  });
}

export function DELETE(req: NextRequest) {
  return NextResponse.json({
    message: "Hello from the workspace API route!",
  });
}
