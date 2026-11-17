import { NextRequest } from "next/server";
import {
  getSessionCookieName,
  sanitizeStrictString,
  signedJsonResponse,
  verifySessionToken,
} from "../../../lib/security";
import {
  type ContactStatus,
  deleteContactSubmission,
  deleteJobSubmission,
  type JobStatus,
  updateContactStatus,
  updateJobStatus,
} from "../../../lib/store";

const VALID_CONTACT_STATUSES = new Set<ContactStatus>([
  "Novo",
  "Em atendimento",
  "Concluído",
]);
const VALID_JOB_STATUSES = new Set<JobStatus>([
  "Recebido",
  "Em análise",
  "Aprovado",
]);

export async function PATCH(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (origin && origin !== req.nextUrl.origin) {
    return signedJsonResponse({ ok: false, error: "Origem inválida." }, 403);
  }

  const token = req.cookies.get(getSessionCookieName())?.value;
  const session = verifySessionToken(token);
  if (!session) {
    return signedJsonResponse({ ok: false, error: "Não autenticado." }, 401);
  }

  try {
    const body = (await req.json()) as Record<string, unknown>;
    const tipo = sanitizeStrictString(body.tipo, 20);
    const id = sanitizeStrictString(body.id, 40);
    const status = sanitizeStrictString(body.status, 30);

    if (!id || !status) {
      return signedJsonResponse({ ok: false, error: "Parâmetros inválidos." }, 400);
    }

    if (tipo === "contato") {
      if (!session.scopes.includes("contatos")) {
        return signedJsonResponse({ ok: false, error: "Sem permissão para alterar contatos." }, 403);
      }
      if (!VALID_CONTACT_STATUSES.has(status as ContactStatus)) {
        return signedJsonResponse({ ok: false, error: "Status de contato inválido." }, 400);
      }
      const updated = await updateContactStatus(id, status as ContactStatus);
      return signedJsonResponse({ ok: updated, id, status });
    }

    if (tipo === "candidatura") {
      if (!session.scopes.includes("candidaturas")) {
        return signedJsonResponse(
          { ok: false, error: "Sem permissão para alterar candidaturas." },
          403
        );
      }
      if (!VALID_JOB_STATUSES.has(status as JobStatus)) {
        return signedJsonResponse({ ok: false, error: "Status de candidatura inválido." }, 400);
      }
      const updated = await updateJobStatus(id, status as JobStatus);
      return signedJsonResponse({ ok: updated, id, status });
    }

    return signedJsonResponse({ ok: false, error: "Tipo de registro inválido." }, 400);
  } catch {
    return signedJsonResponse({ ok: false, error: "Falha ao atualizar status." }, 400);
  }
}

export async function DELETE(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (origin && origin !== req.nextUrl.origin) {
    return signedJsonResponse({ ok: false, error: "Origem inválida." }, 403);
  }

  const token = req.cookies.get(getSessionCookieName())?.value;
  const session = verifySessionToken(token);
  if (!session) {
    return signedJsonResponse({ ok: false, error: "Não autenticado." }, 401);
  }

  try {
    const body = (await req.json()) as Record<string, unknown>;
    const tipo = sanitizeStrictString(body.tipo, 20);
    const id = sanitizeStrictString(body.id, 40);

    if (!id) {
      return signedJsonResponse({ ok: false, error: "Identificador obrigatório." }, 400);
    }

    if (tipo === "contato") {
      if (!session.scopes.includes("contatos")) {
        return signedJsonResponse({ ok: false, error: "Sem permissão para excluir contatos." }, 403);
      }
      const deleted = await deleteContactSubmission(id);
      return signedJsonResponse({ ok: deleted, id });
    }

    if (tipo === "candidatura") {
      if (!session.scopes.includes("candidaturas")) {
        return signedJsonResponse(
          { ok: false, error: "Sem permissão para excluir candidaturas." },
          403
        );
      }
      const deleted = await deleteJobSubmission(id);
      return signedJsonResponse({ ok: deleted, id });
    }

    return signedJsonResponse({ ok: false, error: "Tipo de registro inválido." }, 400);
  } catch {
    return signedJsonResponse({ ok: false, error: "Falha ao excluir registro." }, 400);
  }
}
