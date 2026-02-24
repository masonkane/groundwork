import { NextRequest, NextResponse } from "next/server";
import { generateToken, storeToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const token = generateToken();
  storeToken(token, email);

  const baseUrl = req.nextUrl.origin;
  const magicLink = `${baseUrl}/api/auth/verify?token=${token}`;

  // Log the magic link (no real email sending yet)
  console.log("\n========================================");
  console.log("MAGIC LINK FOR:", email);
  console.log(magicLink);
  console.log("========================================\n");

  return NextResponse.json({ success: true, message: "Check your email for the dashboard link." });
}
