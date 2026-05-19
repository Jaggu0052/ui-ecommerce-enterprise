import { NextResponse, type NextRequest } from "next/server";
import { AUTH_TOKEN_KEY } from "@/lib/auth";

const protectedPrefixes = [
  "/dashboard",
  "/ecommerce",
  "/products",
  "/categories",
  "/orders",
  "/customers",
  "/employees",
  "/attendance",
  "/salaries",
  "/analytics",
  "/notifications",
  "/settings",
  "/profile"
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_TOKEN_KEY)?.value;
  const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (isProtected && !token) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  if (pathname === "/" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
