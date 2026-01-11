import { NextResponse } from "next/server";

const ADMIN_COOKIE_NAME = "admin_session";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  // Clear the session cookie
  response.cookies.delete(ADMIN_COOKIE_NAME);

  return response;
}

export async function GET() {
  const response = NextResponse.redirect(new URL("/admin/login", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"));
  
  // Clear the session cookie
  response.cookies.delete(ADMIN_COOKIE_NAME);

  return response;
}
