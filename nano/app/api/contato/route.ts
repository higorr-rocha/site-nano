import { NextRequest } from "next/server";
import {
  checkRateLimit,
  getClientIdentifier,
  isValidEmail,
  sanitizeStrictString,
  signedJsonResponse,
  verifySignedChallenge,
} from "../../lib/security";
import { addContactSubmission } from "../../lib/store";

export async function POST(req: NextRequest) {
  const clientId = getClientIdentifier(req);
  const rl = checkRateLimit(`contato_${clientId}`, 5, 10 * 60 * 1000, 15 * 60 * 1000);
  if (!rl.allowed) {
    return signedJsonResponse(
      {
        ok: false,
        error: `Limite de envios excedido. Aguarde ${rl.retryAfterSeconds} segundos antes de tentar novamente.`,
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
    const empresa = sanitizeStrictString(body.empresa, 120);
    const email = sanitizeStrictString(body.email, 120).toLowerCase();
    const telefone = sanitizeStrictString(body.telefone, 40);
    const cidade = sanitizeStrictString(body.cidade, 80);
    const uf = sanitizeStrictString(body.uf, 4).toUpperCase();
    const mensagem = sanitizeStrictString(body.mensagem, 2000);
    const fingerprintHash = sanitizeStrictString(body.fingerprintHash, 64) || clientId;

    if (!nome || !empresa || !email || !mensagem) {
      return signedJsonResponse(
        { ok: false, error: "Preencha todos os campos obrigatórios (Nome, Empresa, Email e Mensagem)." },
        400
      );
    }

    if (!isValidEmail(email)) {
      return signedJsonResponse({ ok: false, error: "Informe um endereço de e-mail válido." }, 400);
    }

    const record = addContactSubmission({
      nome,
      empresa,
      email,
      telefone,
      cidade,
      uf,
      mensagem,
      fingerprintHash,
    });

    return signedJsonResponse({
      ok: true,
      protocolo: record.id,
      createdAt: record.createdAt,
    });
  } catch {
    return signedJsonResponse({ ok: false, error: "Erro ao processar o formulário de contato." }, 400);
  }
}
