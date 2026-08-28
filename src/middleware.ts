import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_API_ROUTES = [
  "/api/auth/login",
  "/api/auth/signup",
  "/api/health",
  "/api/colleges",
];

function isPublicRoute(pathname: string): boolean {
  if (PUBLIC_API_ROUTES.includes(pathname)) {
    return true;
  }
  // Allow all college sub-routes (e.g. compare, details by slug)
  if (pathname.startsWith("/api/colleges/")) {
    return true;
  }
  return false;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api")) {
    if (isPublicRoute(pathname)) {
      return NextResponse.next();
    }

    let token = request.cookies.get("auth_token")?.value;

    const authHeader = request.headers.get("authorization");
    if (authHeader) {
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      } else {
        return NextResponse.json(
          { error: "Unauthorized: Invalid authorization format. Use 'Bearer <token>'" },
          { status: 401 }
        );
      }
    }

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: Missing authentication token" },
        { status: 401 }
      );
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "");
      const { payload } = await jwtVerify(token, secret);

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-user-id", (payload.id as string) || "");
      requestHeaders.set("x-user-email", (payload.email as string) || "");
      requestHeaders.set("x-user-name", (payload.name as string) || "");

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (err) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid or expired token" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
