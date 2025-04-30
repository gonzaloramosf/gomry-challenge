import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/services/Users";

export async function middleware(req: NextRequest) {
  const session = req.cookies.get("session")?.value;
  const { pathname } = req.nextUrl;
  const origin = req.nextUrl.origin;

  if (!session) {
    if (pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  let sessionInfo;
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    sessionInfo = await verifySession(origin, cookieHeader);
  } catch (err) {
    console.error(err);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const { completedKyc } = sessionInfo;

  if (!completedKyc && pathname !== "/kyc") {
    return NextResponse.redirect(new URL("/kyc", req.url));
  }

  if (completedKyc && (pathname === "/login" || pathname === "/kyc")) {
    return NextResponse.redirect(new URL("/account", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
