import { NextRequest } from "next/server";
import {
  getSessionCookieName,
  signedJsonResponse,
  verifySessionToken,
} from "../../../lib/security";
import { getStoreDataForScopes } from "../../../lib/store";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(getSessionCookieName())?.value;
  const session = verifySessionToken(token);

  if (!session) {
    return signedJsonResponse(
      { ok: false, error: "Acesso negado. Sessão inválida ou não autenticada." },
      401
    );
  }

  const requestedSection = req.nextUrl.searchParams.get("secao");
  if (
    requestedSection &&
    (requestedSection === "contatos" ||
      requestedSection === "candidaturas" ||
      requestedSection === "telemetria") &&
    !session.scopes.includes(requestedSection)
  ) {
    return signedJsonResponse(
      {
        ok: false,
        error: `A sua conta (${session.email}) não possui permissão para acessar a seção "${requestedSection}".`,
      },
      403
    );
  }

  const data = getStoreDataForScopes(session.scopes);

  return signedJsonResponse({
    ok: true,
    user: {
      email: session.email,
      name: session.name,
      roleLabel: session.roleLabel,
      scopes: session.scopes,
    },
    data,
  });
}
