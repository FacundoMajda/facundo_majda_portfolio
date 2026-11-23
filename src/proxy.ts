import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin-session";

const LOCALE_COOKIE = "NEXT_LOCALE";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin area: session gate.
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (pathname === "/admin/login") return NextResponse.next();
    const { data: session } = await auth.getSession({
      fetchOptions: { headers: request.headers },
    });
    if (!isAdminEmail(session?.user?.email)) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.next();
  }

  // Public: honor the language the visitor picked last time, but only on the
  // section roots so deep links (and crawlers) are never bounced around.
  const locale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (locale === "es" && pathname === "/") {
    return NextResponse.redirect(new URL("/es", request.url));
  }
  if (locale === "en" && pathname === "/es") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/es", "/admin/:path*", "/admin"],
};
