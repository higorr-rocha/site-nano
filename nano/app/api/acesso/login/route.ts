import { NextRequest } from "next/server";
import {
  checkRateLimit,
  createSessionToken,
  getClientIdentifier,
  getSessionCookieName,
  signedJsonResponse,
  verifyAccountCredentials,
  verifyCloudflareTurnstile,
  verifySignedChallenge,
} from "../../../lib/security";

export async function POST(req: NextRequest) {
  const clientId = getClientIdentifier(req);
  const rl = checkRateLimit(`login_${clientId}`, 5, 15 * 60 * 1000, 15 * 60 * 1000);
  if (!rl.allowed) {
    return signedJsonResponse(
      {
        ok: false,
        error: `Muitas tentativas de login. Acesso bloqueado temporariamente por ${rl.retryAfterSeconds} segundos.`,
      },
      429
    );
  }

  try {
    const body = (await req.json()) as Record<string, unknown>;

    if (
      !verifySignedChallenge(
        body.challengeNonce,
        body.challengeTimestamp,
        body.challengeSignature
      )
    ) {
      return signedJsonResponse(
        { ok: false, error: "Assinatura criptográfica da requisição inválida ou expirada." },
        403
      );
    }

    const captchaOk = await verifyCloudflareTurnstile(body.turnstileToken);
    if (!captchaOk) {
      return signedJsonResponse(
        { ok: false, error: "Falha na verificação automática de segurança (Cloudflare Turnstile)." },
        403
      );
    }

    const account = verifyAccountCredentials(body.email, body.password);
    if (!account) {
      return signedJsonResponse(
        { ok: false, error: "Credenciais inválidas ou conta não autorizada." },
        401
      );
    }

    const sessionToken = createSessionToken(account);
    const res = signedJsonResponse({
      ok: true,
      authenticated: true,
      redirectTo: "/acesso",
    });

    res.cookies.set(getSessionCookieName(), sessionToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 8 * 60 * 60,
    });

    return res;
  } catch {
    return signedJsonResponse({ ok: false, error: "Erro interno na autenticação." }, 400);
  }
}
