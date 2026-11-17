import { NextRequest } from "next/server";
import {
  checkRateLimit,
  getClientIdentifier,
  getClientIp,
  isValidEmail,
  sanitizeStrictString,
  signedJsonResponse,
  validateResumeFile,
  verifyCloudflareTurnstile,
  verifySignedChallenge,
} from "../../lib/security";
import { addJobSubmission } from "../../lib/store";
import { isAvailableJobTitle } from "../../lib/job-openings";

export async function POST(req: NextRequest) {
  const clientId = getClientIdentifier(req);
  const rl = await checkRateLimit(`trabalhe_${clientId}`, 3, 15 * 60 * 1000, 15 * 60 * 1000);
  if (!rl.allowed) {
    return signedJsonResponse(
      {
        ok: false,
        error: `Limite de tentativas atingido. Aguarde ${rl.retryAfterSeconds} segundos.`,
      },
      429
    );
  }

  try {
    const body = (await req.json()) as Record<string, unknown>;

    if (
      !(await verifySignedChallenge(
        body.challengeNonce,
        body.challengeTimestamp,
        body.challengeSignature
      ))
    ) {
      return signedJsonResponse(
        { ok: false, error: "Assinatura de segurança inválida, expirada ou já utilizada. Recarregue a página." },
        403
      );
    }

    if (process.env.TURNSTILE_SECRET_KEY) {
      const captchaOk = await verifyCloudflareTurnstile(
        body.turnstileToken,
        getClientIp(req),
        "career"
      );
      if (!captchaOk) {
        return signedJsonResponse(
          {
            ok: false,
            error: "Falha na verificação automática de segurança (Cloudflare Turnstile).",
          },
          403
        );
      }
    }

    const nome = sanitizeStrictString(body.nome, 120);
    const email = sanitizeStrictString(body.email, 120).toLowerCase();
    const telefone = sanitizeStrictString(body.telefone, 40);
    const cidade = sanitizeStrictString(body.cidade, 80);
    const uf = sanitizeStrictString(body.uf, 4).toUpperCase();
    const vaga = sanitizeStrictString(body.vaga, 120);
    const mensagem = sanitizeStrictString(body.mensagem, 2000);
    const fingerprintHash = sanitizeStrictString(body.fingerprintHash, 64) || clientId;

    if (!nome || !email || !vaga || !mensagem) {
      return signedJsonResponse(
        { ok: false, error: "Preencha todos os campos obrigatórios (Nome, Email, Vaga, Currículo e Mensagem)." },
        400
      );
    }

    if (!isAvailableJobTitle(vaga)) {
      return signedJsonResponse({ ok: false, error: "A vaga selecionada não está disponível." }, 400);
    }

    if (!isValidEmail(email)) {
      return signedJsonResponse({ ok: false, error: "Informe um endereço de e-mail válido." }, 400);
    }

    const fileCheck = validateResumeFile(
      body.arquivoNome,
      body.arquivoMime,
      body.arquivoTamanhoBytes,
      body.arquivoBase64
    );

    if (!fileCheck.valid || !fileCheck.cleanBase64) {
      return signedJsonResponse({ ok: false, error: fileCheck.error }, 400);
    }

    const record = await addJobSubmission({
      nome,
      email,
      telefone,
      cidade,
      uf,
      vaga,
      mensagem,
      arquivoNome: fileCheck.safeFileName!,
      arquivoMime: sanitizeStrictString(body.arquivoMime, 120).toLowerCase(),
      arquivoTamanhoBytes: fileCheck.sizeBytes!,
      arquivoBase64: fileCheck.cleanBase64,
      fingerprintHash,
    });

    return signedJsonResponse({
      ok: true,
      protocolo: record.id,
      createdAt: record.createdAt,
    });
  } catch {
    return signedJsonResponse({ ok: false, error: "Erro ao processar a candidatura." }, 400);
  }
}
