import crypto from "crypto";
import { NextRequest } from "next/server";
import {
  checkRateLimit,
  getClientIdentifier,
  sanitizeStrictString,
  signedJsonResponse,
} from "../../../lib/security";
import { saveTelemetryConsent } from "../../../lib/store";

export async function POST(req: NextRequest) {
  const clientId = getClientIdentifier(req);
  const rl = checkRateLimit(`consent_${clientId}`, 20, 60 * 1000, 60 * 1000);
  if (!rl.allowed) {
    return signedJsonResponse(
      { ok: false, error: "Muitas requisições. Tente novamente em instantes." },
      429
    );
  }

  try {
    const body = (await req.json()) as Record<string, unknown>;
    const analyticsAccepted = Boolean(body.analyticsAccepted);
    const language = sanitizeStrictString(body.language, 32) || "pt-BR";
    const timezone = sanitizeStrictString(body.timezone, 64) || "America/Sao_Paulo";
    const screenResolution = sanitizeStrictString(body.screenResolution, 32) || "unknown";
    const platform = sanitizeStrictString(body.platform, 64) || "unknown";
    const clientFp = sanitizeStrictString(body.fingerprintHash, 64);

    const fingerprintHash =
      clientFp ||
      crypto
        .createHash("sha256")
        .update(`${clientId}|${language}|${timezone}|${screenResolution}|${platform}`)
        .digest("hex")
        .slice(0, 32);

    const saved = saveTelemetryConsent({
      fingerprintHash,
      essentialAccepted: true,
      analyticsAccepted,
      browserInfo: {
        language,
        timezone,
        screenResolution,
        platform,
      },
    });

    const res = signedJsonResponse({
      ok: true,
      consentId: saved.id,
      fingerprintHash: saved.fingerprintHash,
      essentialAccepted: true,
      analyticsAccepted: saved.analyticsAccepted,
    });

    res.cookies.set("nano_cookie_consent", analyticsAccepted ? "essential_analytics" : "essential_only", {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 180,
    });

    return res;
  } catch {
    return signedJsonResponse({ ok: false, error: "Requisição inválida." }, 400);
  }
}
