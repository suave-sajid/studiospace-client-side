import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const protectedRoutes = [
  "/dashboard",
  "/add-studio",
  "/my-listings",
  "/my-bookings",
  "/booking-requests",
  "/wishlist",
];

const authRoutes = ["/login", "/register"];

export function proxy(request) {
  const { pathname, search } = request.nextUrl;

  // Check whether Better Auth session cookie exists
  const sessionCookie = getSessionCookie(request);

  const isAuthenticated = Boolean(sessionCookie);

  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      pathname === route || pathname.startsWith(`${route}/`)
  );

  const isAuthRoute = authRoutes.some(
    (route) =>
      pathname === route || pathname.startsWith(`${route}/`)
  );

  // Unauthenticated user trying to access protected pages
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set(
      "callbackURL",
      `${pathname}${search}`
    );

    return NextResponse.redirect(loginUrl);
  }

  // Authenticated user trying to access login/register
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/add-studio/:path*",
    "/my-listings/:path*",
    "/my-bookings/:path*",
    "/booking-requests/:path*",
    "/wishlist/:path*",
    "/login",
    "/register",
  ],
};