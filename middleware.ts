import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple session-based auth for admin routes
// In production, use a proper auth library like next-auth
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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes (except login page)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME);
    
    if (!sessionCookie?.value) {
      // No session, redirect to login
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Validate session format (timestamp:hash)
    const [timestamp, hash] = sessionCookie.value.split(":");
    if (!timestamp || !hash) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Check if session is expired (24 hours)
    const sessionTime = parseInt(timestamp, 10);
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    
    if (isNaN(sessionTime) || now - sessionTime > maxAge) {
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete(ADMIN_COOKIE_NAME);
      return response;
    }

    // Validate hash
    const expectedHash = simpleHash(`${timestamp}:${ADMIN_SESSION_SECRET}`);
    if (hash !== expectedHash) {
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete(ADMIN_COOKIE_NAME);
      return response;
    }
  }

  // Client portal PIN protection
  if (pathname.startsWith("/api/portal") && request.method === "GET") {
    // The API route itself will handle verification
    // This middleware just ensures the route is accessible
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protect admin routes
    "/admin/:path*",
  ],
};
