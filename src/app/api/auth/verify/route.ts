import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/login?error=missing_token", req.url));
  }

  const email = validateToken(token);

  if (!email) {
    return NextResponse.redirect(new URL("/login?error=invalid_token", req.url));
  }

  const response = NextResponse.redirect(new URL("/dashboard", req.url));
  response.cookies.set("gw_auth", email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });

  return response;
}
