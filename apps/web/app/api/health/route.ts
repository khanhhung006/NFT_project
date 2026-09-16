import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    service: "moviepass-web",
    phase: 1,
    status: "ok"
  });
}
