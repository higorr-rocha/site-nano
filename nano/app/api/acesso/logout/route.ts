import { NextRequest } from "next/server";
import { getSessionCookieName, signedJsonResponse } from "../../../lib/security";

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (origin && origin !== req.nextUrl.origin) {
    return signedJsonResponse(
      { ok: false, error: "Origem da requisição inválida (CSRF bloqueado)." },
      403
    );
  }

  const res = signedJsonResponse({ ok: true, loggedOut: true });
  res.cookies.set(getSessionCookieName(), "", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return res;
}
