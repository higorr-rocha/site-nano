import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cookieName = process.env.NANO_SESSION_COOKIE_NAME || "nano_acesso_sid";

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return new NextResponse("Not Found", { status: 404 });
  }

  if (pathname.startsWith("/acesso") && !pathname.startsWith("/acesso/login")) {
    const token = req.cookies.get(cookieName)?.value;
    if (!token || !token.includes(".")) {
      const loginUrl = new URL("/acesso/login", req.url);
      loginUrl.searchParams.set("bloqueado", "1");
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/acesso/:path*", "/admin/:path*", "/admin"],
};
