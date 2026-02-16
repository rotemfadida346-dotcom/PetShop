import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Admin routes: require ADMIN role
    if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Public routes
        if (
          pathname.startsWith("/api/webhooks") ||
          pathname.startsWith("/api/products") ||
          pathname === "/" ||
          pathname.startsWith("/shop") ||
          pathname.startsWith("/product") ||
          pathname.startsWith("/quiz") ||
          pathname.startsWith("/about") ||
          pathname.startsWith("/auth") ||
          pathname.startsWith("/cart") ||
          pathname.startsWith("/checkout") ||
          pathname.startsWith("/_next") ||
          pathname.startsWith("/favicon")
        ) {
          return true;
        }

        // Protected routes require authentication
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/((?!api/webhooks|api/products|_next/static|_next/image|favicon.ico|images).*)",
  ],
};
