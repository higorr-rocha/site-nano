import { NextRequest } from "next/server";
import {
  checkRateLimit,
  getClientIdentifier,
  isValidEmail,
  sanitizeStrictString,
  signedJsonResponse,
  validateResumeFile,
  verifySignedChallenge,
} from "../../lib/security";
import { addJobSubmission } from "../../lib/store";

export async function POST(req: NextRequest) {
  const clientId = getClientIdentifier(req);
  const rl = checkRateLimit(`trabalhe_${clientId}`, 3, 15 * 60 * 1000, 15 * 60 * 1000);
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
      !verifySignedChallenge(
        body.challengeNonce,
        body.challengeTimestamp,
        body.challengeSignature
      )
    ) {
      return signedJsonResponse(
        { ok: false, error: "Assinatura de segurança inválida ou expirada. Recarregue a página." },
        403
      );
    }

    const nome = sanitizeStrictString(body.nome, 120);
    const email = sanitizeStrictString(body.email, 120).toLowerCase();
    const telefone = sanitizeStrictString(body.telefone, 40);
    const cidade = sanitizeStrictString(body.cidade, 80);
    const uf = sanitizeStrictString(body.uf, 4).toUpperCase();
    const vaga = sanitizeStrictString(body.vaga, 120) || "Banco de Talentos / Geral";
    const mensagem = sanitizeStrictString(body.mensagem, 2000);
    const fingerprintHash = sanitizeStrictString(body.fingerprintHash, 64) || clientId;

    if (!nome || !email || !mensagem) {
      return signedJsonResponse(
        { ok: false, error: "Preencha todos os campos obrigatórios (Nome, Email, Currículo e Mensagem)." },
        400
      );
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

    if (!fileCheck.valid) {
      return signedJsonResponse({ ok: false, error: fileCheck.error }, 400);
    }

    const record = addJobSubmission({
      nome,
      email,
      telefone,
      cidade,
      uf,
      vaga,
      mensagem,
      arquivoNome: fileCheck.safeFileName!,
      arquivoMime: sanitizeStrictString(body.arquivoMime, 120),
      arquivoTamanhoBytes: fileCheck.sizeBytes!,
      arquivoBase64: typeof body.arquivoBase64 === 'string' ? body.arquivoBase64 : undefined,
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
