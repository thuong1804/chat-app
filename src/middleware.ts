import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  let isLogin = request.cookies.get("loggin");

  if (!isLogin) {
    if (request.nextUrl.pathname.startsWith("/component")) {
      return NextResponse.redirect(new URL("/", request.url));
    } else if (request.nextUrl.pathname.startsWith("/conversation/")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}
// See "Matching Paths" below to learn more
