import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin-session";

// Only the admin area is gated here. Language is a manual choice made with the
// switcher; there is no automatic redirect, so `/` always serves the portfolio.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const { data: session } = await auth.getSession({
    fetchOptions: { headers: request.headers },
  });

  if (!isAdminEmail(session?.user?.email)) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
