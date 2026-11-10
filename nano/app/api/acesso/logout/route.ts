import { getSessionCookieName, signedJsonResponse } from "../../../lib/security";

export async function POST() {
  const res = signedJsonResponse({ ok: true, loggedOut: true });
  res.cookies.delete(getSessionCookieName());
  return res;
}
