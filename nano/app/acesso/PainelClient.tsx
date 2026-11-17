"use client";

import { useState } from "react";
import { FaDownload, FaEnvelope, FaTrashCan } from "react-icons/fa6";
import { availableJobTitles } from "../lib/job-openings";
import type { RoleScope } from "../lib/security";
import type {
  ContactStatus,
  ContactSubmission,
  JobStatus,
  JobSubmission,
  TelemetryConsentRecord,
} from "../lib/store";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

interface PainelClientProps {
  user: {
    email: string;
    name: string;
    roleLabel: string;
    scopes: RoleScope[];
  };
  initialSection: RoleScope;
  accessDeniedNotice?: string;
  data: {
    contacts: ContactSubmission[] | null;
    applications: JobSubmission[] | null;
    consents: TelemetryConsentRecord[] | null;
  };
}

const CONTACT_STATUS_OPTIONS: ContactStatus[] = [
  "Novo",
  "Em atendimento",
  "Concluído",
];

const JOB_STATUS_OPTIONS: JobStatus[] = [
  "Recebido",
  "Em análise",
  "Aprovado",
];

function getStatusBadgeClass(status: string): string {
  switch (status) {
    case "Concluído":
    case "Aprovado":
      return "bg-emerald-100 text-emerald-800 border-emerald-300";
    case "Em atendimento":
    case "Em análise":
      return "bg-amber-100 text-amber-800 border-amber-300";
    default:
      return "bg-[#24298D]/10 text-[#24298D] border-[#24298D]/25";
  }
}

export default function PainelClient({
  user,
  initialSection,
  accessDeniedNotice,
  data,
}: PainelClientProps) {
  const [activeTab, setActiveTab] = useState<RoleScope>(initialSection);
  const [contactsList, setContactsList] = useState<ContactSubmission[]>(
    data.contacts || []
  );
  const [applicationsList, setApplicationsList] = useState<JobSubmission[]>(
    data.applications || []
  );
  const [contactStatusFilter, setContactStatusFilter] = useState<string>("TODOS");
  const [jobStatusFilter, setJobStatusFilter] = useState<string>("TODOS");
  const [jobVagaFilter, setJobVagaFilter] = useState<string>("TODAS");
  const [busyId, setBusyId] = useState<string | null>(null);

  const handleLogout = async () => {
    await fetch("/api/acesso/logout", { method: "POST", cache: "no-store" });
    window.location.href = "/acesso/login";
  };

  const handleUpdateContactStatus = async (id: string, nextStatus: ContactStatus) => {
    setBusyId(id);
    try {
      const res = await fetch("/api/acesso/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo: "contato", id, status: nextStatus }),
      });
      const result = await res.json();
      if (res.ok && result.ok) {
        setContactsList((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: nextStatus } : item))
        );
      }
    } finally {
      setBusyId(null);
    }
  };

  const handleDeleteContact = async (id: string) => {
    setBusyId(id);
    try {
      const res = await fetch("/api/acesso/status", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo: "contato", id }),
      });
      const result = await res.json();
      if (res.ok && result.ok) {
        setContactsList((prev) => prev.filter((item) => item.id !== id));
      }
    } finally {
      setBusyId(null);
    }
  };

  const handleUpdateJobStatus = async (id: string, nextStatus: JobStatus) => {
    setBusyId(id);
    try {
      const res = await fetch("/api/acesso/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo: "candidatura", id, status: nextStatus }),
      });
      const result = await res.json();
      if (res.ok && result.ok) {
        setApplicationsList((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: nextStatus } : item))
        );
      }
    } finally {
      setBusyId(null);
    }
  };

  const handleDeleteJob = async (id: string) => {
    setBusyId(id);
    try {
      const res = await fetch("/api/acesso/status", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo: "candidatura", id }),
      });
      const result = await res.json();
      if (res.ok && result.ok) {
        setApplicationsList((prev) => prev.filter((item) => item.id !== id));
      }
    } finally {
      setBusyId(null);
    }
  };

  const canContacts = user.scopes.includes("contatos");
  const canApplications = user.scopes.includes("candidaturas");
  const canTelemetry = user.scopes.includes("telemetria");

  const filteredContacts = contactsList.filter(
    (c) => contactStatusFilter === "TODOS" || c.status === contactStatusFilter
  );

  const filteredApplications = applicationsList.filter(
    (job) =>
      (jobStatusFilter === "TODOS" || job.status === jobStatusFilter) &&
      (jobVagaFilter === "TODAS" || job.vaga === jobVagaFilter)
  );

  return (
    <main className="flex min-h-screen flex-col bg-[#f5f2eb] pt-20 text-[#24298D]">
      <SiteHeader />

      <section className="bg-[#24298D] px-6 py-8 text-white lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF8200]">
              Painel Administrativo
            </p>
            <h1 className="mt-1 text-2xl font-black sm:text-3xl">{user.name}</h1>
            <p className="mt-1 text-xs text-white/80">
              Conta autenticada: <strong>{user.email}</strong>
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-xs font-bold text-white transition-colors hover:border-[#FF8200] hover:bg-[#FF8200]"
          >
            Encerrar sessão
          </button>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl flex-1 px-6 py-10 lg:px-10">
        {accessDeniedNotice && (
          <div className="mb-6 rounded-2xl border border-red-300 bg-red-50 p-4 text-xs font-bold text-red-800">
            {accessDeniedNotice}
          </div>
        )}

        <div className="mb-8 flex flex-wrap gap-3 border-b border-slate-300 pb-4">
          {canContacts && (
            <button
              type="button"
              onClick={() => setActiveTab("contatos")}
              className={`rounded-full px-5 py-2.5 text-xs font-bold transition-colors ${
                activeTab === "contatos"
                  ? "bg-[#24298D] text-white"
                  : "bg-[#FAF8F3] text-[#24298D] hover:bg-[#24298D]/10"
              }`}
            >
              Contatos Recebidos ({contactsList.length})
            </button>
          )}

          {canApplications && (
            <button
              type="button"
              onClick={() => setActiveTab("candidaturas")}
              className={`rounded-full px-5 py-2.5 text-xs font-bold transition-colors ${
                activeTab === "candidaturas"
                  ? "bg-[#24298D] text-white"
                  : "bg-[#FAF8F3] text-[#24298D] hover:bg-[#24298D]/10"
              }`}
            >
              Candidaturas Trabalhe Conosco ({applicationsList.length})
            </button>
          )}

          {canTelemetry && (
            <button
              type="button"
              onClick={() => setActiveTab("telemetria")}
              className={`rounded-full px-5 py-2.5 text-xs font-bold transition-colors ${
                activeTab === "telemetria"
                  ? "bg-[#24298D] text-white"
                  : "bg-[#FAF8F3] text-[#24298D] hover:bg-[#24298D]/10"
              }`}
            >
              Consentimento de Cookies & Fingerprint ({data.consents?.length || 0})
            </button>
          )}
        </div>

        {activeTab === "contatos" && canContacts && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-xl font-black text-[#24298D]">
                Solicitações de Contato e Orçamento
              </h2>
              <div className="flex items-center gap-2">
                <label htmlFor="filtro-status-contato" className="text-xs font-bold text-[#24298D]">
                  Filtrar por status:
                </label>
                <select
                  id="filtro-status-contato"
                  value={contactStatusFilter}
                  onChange={(e) => setContactStatusFilter(e.target.value)}
                  className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-[#24298D] outline-none focus:border-[#FF8200]"
                >
                  <option value="TODOS">Todos ({contactsList.length})</option>
                  {CONTACT_STATUS_OPTIONS.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {filteredContacts.length === 0 ? (
              <p className="rounded-2xl bg-[#FAF8F3] p-6 text-sm text-slate-600">
                Nenhuma solicitação de contato encontrada para o filtro selecionado.
              </p>
            ) : (
              filteredContacts.map((c) => (
                <article
                  key={c.id}
                  className="rounded-2xl border border-slate-200 bg-[#FAF8F3] p-6 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-base font-black text-[#24298D]">{c.nome}</span>
                      <span className="rounded-full bg-[#FF8200]/15 px-3 py-0.5 text-xs font-bold text-[#FF8200]">
                        {c.empresa}
                      </span>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${getStatusBadgeClass(
                          c.status
                        )}`}
                      >
                        {c.status}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">
                      Protocolo: {c.id} • {new Date(c.createdAt).toLocaleString("pt-BR")}
                    </span>
                  </div>
                  <div className="mt-3 grid gap-3 text-xs text-slate-600 sm:grid-cols-3">
                    <p>
                      <strong>E-mail:</strong> {c.email}
                    </p>
                    <p>
                      <strong>Telefone:</strong> {c.telefone || "Não informado"}
                    </p>
                    <p>
                      <strong>Localidade:</strong> {c.cidade || "—"} / {c.uf}
                    </p>
                  </div>
                  <p className="mt-4 rounded-xl bg-white p-4 text-sm leading-6 text-slate-700">
                    {c.mensagem}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-[11px] text-slate-400">
                      Fingerprint de Origem (SHA-256): {c.fingerprintHash}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <label htmlFor={`status-cnt-${c.id}`} className="sr-only">
                        Alterar status do protocolo {c.id}
                      </label>
                      <select
                        id={`status-cnt-${c.id}`}
                        disabled={busyId === c.id}
                        value={c.status}
                        onChange={(e) =>
                          void handleUpdateContactStatus(c.id, e.target.value as ContactStatus)
                        }
                        className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-[#24298D] outline-none focus:border-[#FF8200]"
                      >
                        {CONTACT_STATUS_OPTIONS.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>

                      <a
                        href={`mailto:${c.email}?subject=${encodeURIComponent(
                          `Retorno de Contato Nanoquímica - ${c.empresa}`
                        )}&body=${encodeURIComponent(
                          `Olá ${c.nome},\n\nRecebemos sua mensagem enviada pelo site da Nanoquímica:\n"${c.mensagem}"\n\nAtenciosamente,\nEquipe Nanoquímica`
                        )}`}
                        className="inline-flex items-center gap-2 rounded-full bg-[#24298D] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#FF8200]"
                      >
                        <FaEnvelope className="h-3.5 w-3.5" aria-hidden="true" />
                        Responder para {c.email}
                      </a>

                      <button
                        type="button"
                        disabled={busyId === c.id}
                        onClick={() => void handleDeleteContact(c.id)}
                        title="Excluir registro"
                        className="inline-flex items-center gap-1.5 rounded-full border border-red-300 bg-white px-3.5 py-2 text-xs font-bold text-red-700 transition-colors hover:bg-red-600 hover:text-white disabled:opacity-50"
                      >
                        <FaTrashCan className="h-3 w-3" aria-hidden="true" />
                        Excluir
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        )}

        {activeTab === "candidaturas" && canApplications && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-xl font-black text-[#24298D]">
                Candidaturas Recebidas (Trabalhe Conosco)
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <label htmlFor="filtro-vaga-job" className="text-xs font-bold text-[#24298D]">
                    Vaga:
                  </label>
                  <select
                    id="filtro-vaga-job"
                    value={jobVagaFilter}
                    onChange={(e) => setJobVagaFilter(e.target.value)}
                    className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-[#24298D] outline-none focus:border-[#FF8200]"
                  >
                    <option value="TODAS">Todas as vagas</option>
                    {availableJobTitles.map((vaga) => (
                      <option key={vaga} value={vaga}>
                        {vaga}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label htmlFor="filtro-status-job" className="text-xs font-bold text-[#24298D]">
                    Status:
                  </label>
                  <select
                    id="filtro-status-job"
                    value={jobStatusFilter}
                    onChange={(e) => setJobStatusFilter(e.target.value)}
                    className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-[#24298D] outline-none focus:border-[#FF8200]"
                  >
                    <option value="TODOS">Todos ({applicationsList.length})</option>
                    {JOB_STATUS_OPTIONS.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {filteredApplications.length === 0 ? (
              <p className="rounded-2xl bg-[#FAF8F3] p-6 text-sm text-slate-600">
                Nenhuma candidatura encontrada para os filtros selecionados.
              </p>
            ) : (
              filteredApplications.map((job) => (
                <article
                  key={job.id}
                  className="rounded-2xl border border-slate-200 bg-[#FAF8F3] p-6 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-base font-black text-[#24298D]">{job.nome}</span>
                      <span className="rounded-full bg-[#24298D]/10 px-3 py-0.5 text-xs font-bold text-[#24298D]">
                        {job.vaga}
                      </span>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${getStatusBadgeClass(
                          job.status
                        )}`}
                      >
                        {job.status}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">
                      Protocolo: {job.id} • {new Date(job.createdAt).toLocaleString("pt-BR")}
                    </span>
                  </div>
                  <div className="mt-3 grid gap-3 text-xs text-slate-600 sm:grid-cols-3">
                    <p>
                      <strong>E-mail:</strong> {job.email}
                    </p>
                    <p>
                      <strong>Telefone:</strong> {job.telefone || "Não informado"}
                    </p>
                    <p>
                      <strong>Cidade/UF:</strong> {job.cidade || "—"} / {job.uf}
                    </p>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs">
                    <span className="font-black text-[#24298D]">Currículo Anexado:</span>
                    <a
                      href={`/api/acesso/curriculo/${job.id}`}
                      download={job.arquivoNome}
                      className="inline-flex items-center gap-2 font-bold text-[#FF8200] underline transition-colors hover:text-[#24298D]"
                    >
                      <FaDownload className="h-3.5 w-3.5" aria-hidden="true" />
                      {job.arquivoNome} ({Math.max(1, Math.round(job.arquivoTamanhoBytes / 1024))} KB)
                    </a>
                  </div>
                  <p className="mt-3 rounded-xl bg-white p-4 text-sm leading-6 text-slate-700">
                    {job.mensagem}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-[11px] text-slate-400">
                      Fingerprint de Origem (SHA-256): {job.fingerprintHash}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <label htmlFor={`status-job-${job.id}`} className="sr-only">
                        Alterar status da candidatura {job.id}
                      </label>
                      <select
                        id={`status-job-${job.id}`}
                        disabled={busyId === job.id}
                        value={job.status}
                        onChange={(e) =>
                          void handleUpdateJobStatus(job.id, e.target.value as JobStatus)
                        }
                        className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-[#24298D] outline-none focus:border-[#FF8200]"
                      >
                        {JOB_STATUS_OPTIONS.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>

                      <a
                        href={`mailto:${job.email}?subject=${encodeURIComponent(
                          `Processo Seletivo Nanoquímica - ${job.vaga}`
                        )}`}
                        className="inline-flex items-center gap-2 rounded-full bg-[#24298D] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#FF8200]"
                      >
                        <FaEnvelope className="h-3.5 w-3.5" aria-hidden="true" />
                        Responder para {job.email}
                      </a>

                      <button
                        type="button"
                        disabled={busyId === job.id}
                        onClick={() => void handleDeleteJob(job.id)}
                        title="Excluir candidatura"
                        className="inline-flex items-center gap-1.5 rounded-full border border-red-300 bg-white px-3.5 py-2 text-xs font-bold text-red-700 transition-colors hover:bg-red-600 hover:text-white disabled:opacity-50"
                      >
                        <FaTrashCan className="h-3 w-3" aria-hidden="true" />
                        Excluir
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        )}

        {activeTab === "telemetria" && canTelemetry && (
          <div className="space-y-4">
            <h2 className="text-xl font-black text-[#24298D]">
              Registros Essenciais de Cookies, Fingerprint e Google Analytics
            </h2>
            {(data.consents || []).length === 0 ? (
              <p className="rounded-2xl bg-[#FAF8F3] p-6 text-sm text-slate-600">
                Nenhum registro de consentimento salvo ainda. Os registros são gravados quando um usuário envia um formulário ou interage com rotas protegidas.
              </p>
            ) : (
              (data.consents || []).map((c) => (
                <article
                  key={c.id}
                  className="rounded-2xl border border-slate-200 bg-[#FAF8F3] p-5 text-xs text-slate-700 shadow-sm"
                >
                  <div className="flex flex-wrap justify-between gap-2 font-bold text-[#24298D]">
                    <span>Fingerprint SHA-256: {c.fingerprintHash}</span>
                    <span>Atualizado em: {new Date(c.updatedAt).toLocaleString("pt-BR")}</span>
                  </div>
                  <div className="mt-2 grid gap-2 sm:grid-cols-4">
                    <p>
                      <strong>Essenciais:</strong> Ativo
                    </p>
                    <p>
                      <strong>Google Analytics:</strong>{" "}
                      {c.analyticsAccepted ? "Autorizado" : "Rejeitado"}
                    </p>
                    <p>
                      <strong>Idioma / Fuso:</strong> {c.browserInfo.language} •{" "}
                      {c.browserInfo.timezone}
                    </p>
                    <p>
                      <strong>Tela / Plataforma:</strong> {c.browserInfo.screenResolution} •{" "}
                      {c.browserInfo.platform}
                    </p>
                  </div>
                </article>
              ))
            )}
          </div>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}
