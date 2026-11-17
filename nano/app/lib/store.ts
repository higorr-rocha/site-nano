import crypto from "crypto";
import { dbExecute, dbQueryAll, dbQueryGet } from "./db";

export type ContactStatus = "Novo" | "Em atendimento" | "Concluído";
export type JobStatus = "Recebido" | "Em análise" | "Aprovado";

export interface ContactSubmission {
  id: string;
  createdAt: string;
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  cidade: string;
  uf: string;
  mensagem: string;
  status: ContactStatus;
  fingerprintHash: string;
}

export interface JobSubmission {
  id: string;
  createdAt: string;
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  uf: string;
  vaga: string;
  mensagem: string;
  arquivoNome: string;
  arquivoMime: string;
  arquivoTamanhoBytes: number;
  arquivoBase64?: string;
  status: JobStatus;
  fingerprintHash: string;
}

export interface TelemetryConsentRecord {
  id: string;
  updatedAt: string;
  fingerprintHash: string;
  essentialAccepted: boolean;
  analyticsAccepted: boolean;
  browserInfo: {
    language: string;
    timezone: string;
    screenResolution: string;
    platform: string;
  };
}

interface DbContactRow {
  id: string;
  created_at: string;
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  cidade: string;
  uf: string;
  mensagem: string;
  status: ContactStatus;
  fingerprint_hash: string;
}

interface DbJobRow {
  id: string;
  created_at: string;
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  uf: string;
  vaga: string;
  mensagem: string;
  arquivo_nome: string;
  arquivo_mime: string;
  arquivo_tamanho_bytes: number;
  arquivo_base64?: string;
  status: JobStatus;
  fingerprint_hash: string;
}

interface DbConsentRow {
  id: string;
  updated_at: string;
  fingerprint_hash: string;
  essential_accepted: number;
  analytics_accepted: number;
  language: string;
  timezone: string;
  screen_resolution: string;
  platform: string;
}

export async function addContactSubmission(
  entry: Omit<ContactSubmission, "id" | "createdAt" | "status">
): Promise<ContactSubmission> {
  const id = "cnt_" + crypto.randomBytes(6).toString("hex");
  const createdAt = new Date().toISOString();
  const status: ContactStatus = "Novo";

  await dbExecute(
    `INSERT INTO contacts (id, created_at, nome, empresa, email, telefone, cidade, uf, mensagem, status, fingerprint_hash)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      createdAt,
      entry.nome,
      entry.empresa,
      entry.email,
      entry.telefone,
      entry.cidade,
      entry.uf,
      entry.mensagem,
      status,
      entry.fingerprintHash,
    ]
  );

  return {
    ...entry,
    id,
    createdAt,
    status,
  };
}

export async function addJobSubmission(
  entry: Omit<JobSubmission, "id" | "createdAt" | "status"> & { arquivoBase64: string }
): Promise<JobSubmission> {
  const id = "job_" + crypto.randomBytes(6).toString("hex");
  const createdAt = new Date().toISOString();
  const status: JobStatus = "Recebido";

  const rawB64 = entry.arquivoBase64.includes(",")
    ? entry.arquivoBase64.split(",")[1]
    : entry.arquivoBase64;

  await dbExecute(
    `INSERT INTO job_applications (id, created_at, nome, email, telefone, cidade, uf, vaga, mensagem, arquivo_nome, arquivo_mime, arquivo_tamanho_bytes, arquivo_base64, status, fingerprint_hash)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      createdAt,
      entry.nome,
      entry.email,
      entry.telefone,
      entry.cidade,
      entry.uf,
      entry.vaga,
      entry.mensagem,
      entry.arquivoNome,
      entry.arquivoMime,
      entry.arquivoTamanhoBytes,
      rawB64,
      status,
      entry.fingerprintHash,
    ]
  );

  return {
    ...entry,
    id,
    createdAt,
    status,
  };
}

export async function getJobResumeById(jobId: string): Promise<{
  fileName: string;
  mimeType: string;
  buffer: Buffer;
} | null> {
  const row = await dbQueryGet<DbJobRow>(
    "SELECT id, arquivo_nome, arquivo_mime, arquivo_base64 FROM job_applications WHERE id = ? LIMIT 1",
    [jobId]
  );
  if (!row || !row.arquivo_base64) return null;

  const rawB64 = String(row.arquivo_base64).includes(",")
    ? String(row.arquivo_base64).split(",")[1]
    : String(row.arquivo_base64);

  return {
    fileName: String(row.arquivo_nome),
    mimeType: String(row.arquivo_mime),
    buffer: Buffer.from(rawB64, "base64"),
  };
}

export async function updateContactStatus(
  id: string,
  status: ContactStatus
): Promise<boolean> {
  const changes = await dbExecute(
    "UPDATE contacts SET status = ? WHERE id = ?",
    [status, id]
  );
  return changes > 0;
}

export async function deleteContactSubmission(id: string): Promise<boolean> {
  const changes = await dbExecute("DELETE FROM contacts WHERE id = ?", [id]);
  return changes > 0;
}

export async function updateJobStatus(
  id: string,
  status: JobStatus
): Promise<boolean> {
  const changes = await dbExecute(
    "UPDATE job_applications SET status = ? WHERE id = ?",
    [status, id]
  );
  return changes > 0;
}

export async function deleteJobSubmission(id: string): Promise<boolean> {
  const changes = await dbExecute("DELETE FROM job_applications WHERE id = ?", [id]);
  return changes > 0;
}

export async function saveTelemetryConsent(
  entry: Omit<TelemetryConsentRecord, "id" | "updatedAt">
): Promise<TelemetryConsentRecord> {
  const id = "cns_" + crypto.randomBytes(6).toString("hex");
  const updatedAt = new Date().toISOString();

  await dbExecute(
    `INSERT INTO telemetry_consents (id, updated_at, fingerprint_hash, essential_accepted, analytics_accepted, language, timezone, screen_resolution, platform)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(fingerprint_hash) DO UPDATE SET
       updated_at = excluded.updated_at,
       essential_accepted = excluded.essential_accepted,
       analytics_accepted = excluded.analytics_accepted,
       language = excluded.language,
       timezone = excluded.timezone,
       screen_resolution = excluded.screen_resolution,
       platform = excluded.platform`,
    [
      id,
      updatedAt,
      entry.fingerprintHash,
      entry.essentialAccepted ? 1 : 0,
      entry.analyticsAccepted ? 1 : 0,
      entry.browserInfo.language,
      entry.browserInfo.timezone,
      entry.browserInfo.screenResolution,
      entry.browserInfo.platform,
    ]
  );

  return {
    ...entry,
    id,
    updatedAt,
  };
}

export async function getStoreDataForScopes(scopes: string[]) {
  const contacts: ContactSubmission[] | null = scopes.includes("contatos")
    ? (
        await dbQueryAll<DbContactRow>(
          "SELECT id, created_at, nome, empresa, email, telefone, cidade, uf, mensagem, status, fingerprint_hash FROM contacts ORDER BY created_at DESC"
        )
      ).map((r) => ({
        id: String(r.id),
        createdAt: String(r.created_at),
        nome: String(r.nome),
        empresa: String(r.empresa),
        email: String(r.email),
        telefone: String(r.telefone),
        cidade: String(r.cidade),
        uf: String(r.uf),
        mensagem: String(r.mensagem),
        status: (r.status as ContactStatus) || "Novo",
        fingerprintHash: String(r.fingerprint_hash),
      }))
    : null;

  const applications: JobSubmission[] | null = scopes.includes("candidaturas")
    ? (
        await dbQueryAll<DbJobRow>(
          "SELECT id, created_at, nome, email, telefone, cidade, uf, vaga, mensagem, arquivo_nome, arquivo_mime, arquivo_tamanho_bytes, status, fingerprint_hash FROM job_applications ORDER BY created_at DESC"
        )
      ).map((r) => ({
        id: String(r.id),
        createdAt: String(r.created_at),
        nome: String(r.nome),
        email: String(r.email),
        telefone: String(r.telefone),
        cidade: String(r.cidade),
        uf: String(r.uf),
        vaga: String(r.vaga),
        mensagem: String(r.mensagem),
        arquivoNome: String(r.arquivo_nome),
        arquivoMime: String(r.arquivo_mime),
        arquivoTamanhoBytes: Number(r.arquivo_tamanho_bytes),
        status: (r.status as JobStatus) || "Recebido",
        fingerprintHash: String(r.fingerprint_hash),
      }))
    : null;

  const consents: TelemetryConsentRecord[] | null = scopes.includes("telemetria")
    ? (
        await dbQueryAll<DbConsentRow>(
          "SELECT id, updated_at, fingerprint_hash, essential_accepted, analytics_accepted, language, timezone, screen_resolution, platform FROM telemetry_consents ORDER BY updated_at DESC"
        )
      ).map((r) => ({
        id: String(r.id),
        updatedAt: String(r.updated_at),
        fingerprintHash: String(r.fingerprint_hash),
        essentialAccepted: Boolean(Number(r.essential_accepted)),
        analyticsAccepted: Boolean(Number(r.analytics_accepted)),
        browserInfo: {
          language: String(r.language),
          timezone: String(r.timezone),
          screenResolution: String(r.screen_resolution),
          platform: String(r.platform),
        },
      }))
    : null;

  return { contacts, applications, consents };
}
