-- Schema Relacional do Banco de Dados Nanoquímica (SQLite)

CREATE TABLE IF NOT EXISTS accounts (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role_label TEXT NOT NULL,
  scopes_json TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS contacts (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  nome TEXT NOT NULL,
  empresa TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT NOT NULL,
  cidade TEXT NOT NULL,
  uf TEXT NOT NULL,
  mensagem TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Novo',
  fingerprint_hash TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS job_applications (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT NOT NULL,
  cidade TEXT NOT NULL,
  uf TEXT NOT NULL,
  vaga TEXT NOT NULL,
  mensagem TEXT NOT NULL,
  arquivo_nome TEXT NOT NULL,
  arquivo_mime TEXT NOT NULL,
  arquivo_tamanho_bytes INTEGER NOT NULL,
  arquivo_base64 TEXT,
  status TEXT NOT NULL DEFAULT 'Recebido',
  fingerprint_hash TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS telemetry_consents (
  id TEXT PRIMARY KEY,
  updated_at TEXT NOT NULL,
  fingerprint_hash TEXT NOT NULL UNIQUE,
  essential_accepted INTEGER NOT NULL DEFAULT 1,
  analytics_accepted INTEGER NOT NULL DEFAULT 0,
  language TEXT NOT NULL,
  timezone TEXT NOT NULL,
  screen_resolution TEXT NOT NULL,
  platform TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS rate_limits (
  bucket_key TEXT PRIMARY KEY,
  timestamps_json TEXT NOT NULL,
  locked_until INTEGER NOT NULL DEFAULT 0
);
