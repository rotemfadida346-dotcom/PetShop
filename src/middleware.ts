import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes — always allow
  if (
    pathname === "/" ||
    pathname.startsWith("/shop") ||
    pathname.startsWith("/product") ||
    pathname.startsWith("/quiz") ||
    pathname.startsWith("/about") ||
    pathname.startsWith("/subscriptions") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/cart") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/images")
  ) {
    return NextResponse.next();
  }

  // Protected routes — check for session token
  // If NEXTAUTH_SECRET is not set, skip auth check to avoid crashes
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    return NextResponse.next();
  }

  try {
    const token = await getToken({ req: request, secret });

    // Not authenticated — redirect to sign in
    if (!token) {
      const signInUrl = new URL("/auth/signin", request.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }

    // Admin routes — require ADMIN role
    if (pathname.startsWith("/admin") && token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch {
    // If auth check fails for any reason, allow the request through
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images).*)",
  ],
};
