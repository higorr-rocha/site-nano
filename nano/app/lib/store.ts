import crypto from "crypto";
import { dbExecute, dbQueryAll } from "./db";

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
  status: "Novo" | "Em atendimento" | "Concluído";
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
  status: "Recebido" | "Em análise" | "Aprovado";
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
  status: "Novo" | "Em atendimento" | "Concluído";
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
  status: "Recebido" | "Em análise" | "Aprovado";
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

export function addContactSubmission(
  entry: Omit<ContactSubmission, "id" | "createdAt" | "status">
): ContactSubmission {
  const id = "cnt_" + crypto.randomBytes(6).toString("hex");
  const createdAt = new Date().toISOString();
  const status = "Novo";

  dbExecute(
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

export function addJobSubmission(
  entry: Omit<JobSubmission, "id" | "createdAt" | "status">
): JobSubmission {
  const id = "job_" + crypto.randomBytes(6).toString("hex");
  const createdAt = new Date().toISOString();
  const status = "Recebido";

  dbExecute(
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
      entry.arquivoBase64 || null,
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

export function saveTelemetryConsent(
  entry: Omit<TelemetryConsentRecord, "id" | "updatedAt">
): TelemetryConsentRecord {
  const id = "cns_" + crypto.randomBytes(6).toString("hex");
  const updatedAt = new Date().toISOString();

  dbExecute(
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

export function getStoreDataForScopes(scopes: string[]) {
  const contacts: ContactSubmission[] | null = scopes.includes("contatos")
    ? dbQueryAll<DbContactRow>(
        "SELECT id, created_at, nome, empresa, email, telefone, cidade, uf, mensagem, status, fingerprint_hash FROM contacts ORDER BY created_at DESC"
      ).map((r) => ({
        id: r.id,
        createdAt: r.created_at,
        nome: r.nome,
        empresa: r.empresa,
        email: r.email,
        telefone: r.telefone,
        cidade: r.cidade,
        uf: r.uf,
        mensagem: r.mensagem,
        status: r.status,
        fingerprintHash: r.fingerprint_hash,
      }))
    : null;

  const applications: JobSubmission[] | null = scopes.includes("candidaturas")
    ? dbQueryAll<DbJobRow>(
        "SELECT id, created_at, nome, email, telefone, cidade, uf, vaga, mensagem, arquivo_nome, arquivo_mime, arquivo_tamanho_bytes, status, fingerprint_hash FROM job_applications ORDER BY created_at DESC"
      ).map((r) => ({
        id: r.id,
        createdAt: r.created_at,
        nome: r.nome,
        email: r.email,
        telefone: r.telefone,
        cidade: r.cidade,
        uf: r.uf,
        vaga: r.vaga,
        mensagem: r.mensagem,
        arquivoNome: r.arquivo_nome,
        arquivoMime: r.arquivo_mime,
        arquivoTamanhoBytes: r.arquivo_tamanho_bytes,
        status: r.status,
        fingerprintHash: r.fingerprint_hash,
      }))
    : null;

  const consents: TelemetryConsentRecord[] | null = scopes.includes("telemetria")
    ? dbQueryAll<DbConsentRow>(
        "SELECT id, updated_at, fingerprint_hash, essential_accepted, analytics_accepted, language, timezone, screen_resolution, platform FROM telemetry_consents ORDER BY updated_at DESC"
      ).map((r) => ({
        id: r.id,
        updatedAt: r.updated_at,
        fingerprintHash: r.fingerprint_hash,
        essentialAccepted: Boolean(r.essential_accepted),
        analyticsAccepted: Boolean(r.analytics_accepted),
        browserInfo: {
          language: r.language,
          timezone: r.timezone,
          screenResolution: r.screen_resolution,
          platform: r.platform,
        },
      }))
    : null;

  return { contacts, applications, consents };
}
