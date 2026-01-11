import { NextRequest, NextResponse } from "next/server";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@webcraft.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "WebCraft2026!";
const ADMIN_COOKIE_NAME = "admin_session";
const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "webcraft_admin_secret_2026";

// Simple hash function for session validation
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check credentials
    // In production, check against database with hashed password
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      // Log failed attempt
      console.warn(`Failed admin login attempt: ${email} at ${new Date().toISOString()}`);
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Create session
    const timestamp = Date.now().toString();
    const hash = simpleHash(`${timestamp}:${ADMIN_SESSION_SECRET}`);
    const sessionValue = `${timestamp}:${hash}`;

    // Create response with session cookie
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
    });

    response.cookies.set(ADMIN_COOKIE_NAME, sessionValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    console.log(`Admin login successful: ${email} at ${new Date().toISOString()}`);

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
