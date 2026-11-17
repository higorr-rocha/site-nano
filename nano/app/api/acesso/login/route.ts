import crypto from "crypto";
import { NextRequest } from "next/server";
import {
  checkRateLimit,
  createSessionToken,
  getClientIp,
  getClientIdentifier,
  getSessionCookieName,
  sanitizeStrictString,
  signedJsonResponse,
  verifyAccountCredentials,
  verifyCloudflareTurnstile,
  verifySignedChallenge,
} from "../../../lib/security";

export async function POST(req: NextRequest) {
  const clientId = getClientIdentifier(req);
  const rlIp = await checkRateLimit(`login_ip_${clientId}`, 10, 15 * 60 * 1000, 15 * 60 * 1000);
  if (!rlIp.allowed) {
    return signedJsonResponse(
      {
        ok: false,
        error: `Muitas tentativas de login deste endereço IP. Acesso bloqueado temporariamente por ${rlIp.retryAfterSeconds} segundos.`,
      },
      429
    );
  }

  try {
    const body = (await req.json()) as Record<string, unknown>;
    const normalizedEmail = sanitizeStrictString(body.email, 120).toLowerCase();

    if (normalizedEmail) {
      const emailHash = crypto
        .createHash("sha256")
        .update(normalizedEmail)
        .digest("hex")
        .slice(0, 32);
      const rlEmail = await checkRateLimit(
        `login_email_${emailHash}`,
        8,
        15 * 60 * 1000,
        15 * 60 * 1000
      );
      if (!rlEmail.allowed) {
        return signedJsonResponse(
          {
            ok: false,
            error: `Muitas tentativas para esta conta. Aguarde ${rlEmail.retryAfterSeconds} segundos antes de tentar novamente.`,
          },
          429
        );
      }
    }

    if (
      !(await verifySignedChallenge(
        body.challengeNonce,
        body.challengeTimestamp,
        body.challengeSignature
      ))
    ) {
      return signedJsonResponse(
        { ok: false, error: "Assinatura criptográfica da requisição inválida, expirada ou já utilizada." },
        403
      );
    }

    const captchaOk = await verifyCloudflareTurnstile(
      body.turnstileToken,
      getClientIp(req),
      "login"
    );
    if (!captchaOk) {
      return signedJsonResponse(
        { ok: false, error: "Falha na verificação automática de segurança (Cloudflare Turnstile)." },
        403
      );
    }

    const account = await verifyAccountCredentials(body.email, body.password);
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
  } catch (error) {
    console.error("Login route failed:", error);
    return signedJsonResponse({ ok: false, error: "Erro interno na autenticação." }, 400);
  }
}
