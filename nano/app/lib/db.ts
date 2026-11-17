import { createClient, type Client, type InValue } from "@libsql/client";
import fs from "fs";
import path from "path";

let clientInstance: Client | null = null;
let initPromise: Promise<void> | null = null;

function resolveTursoConfig(): { url: string; authToken?: string } {
  const tursoUrl = process.env.TURSO_DATABASE_URL?.trim();
  const tursoAuthToken = process.env.TURSO_AUTH_TOKEN?.trim();

  if (tursoUrl) {
    return { url: tursoUrl, authToken: tursoAuthToken };
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "Variável de ambiente obrigatória TURSO_DATABASE_URL ausente em produção. Configure TURSO_DATABASE_URL e TURSO_AUTH_TOKEN na Vercel."
    );
  }

  // Fallback exclusivo para desenvolvimento local caso TURSO_DATABASE_URL ainda não esteja definida no .env.local
  const localDir = path.join(process.cwd(), "database");
  fs.mkdirSync(localDir, { recursive: true });
  const localFile = path.join(localDir, "nanoquimica.sqlite");
  return { url: `file:${localFile}` };
}

function getClient(): Client {
  if (!clientInstance) {
    const { url, authToken } = resolveTursoConfig();
    clientInstance = createClient({
      url,
      authToken,
    });
  }
  return clientInstance;
}

const SCHEMA_SQL = `
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
  arquivo_base64 TEXT NOT NULL,
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

CREATE TABLE IF NOT EXISTS used_nonces (
  nonce TEXT PRIMARY KEY,
  expires_at INTEGER NOT NULL
);
`;

async function seedAccountsFromEnvironment(db: Client): Promise<void> {
  const rawAccounts = process.env.NANO_ACCOUNTS_JSON;
  if (!rawAccounts) {
    return;
  }

  let accounts: Array<{
    id: string;
    email: string;
    name: string;
    roleLabel: string;
    scopes: string[];
    passwordSalt: string;
    passwordHash: string;
    active?: boolean;
    createdAt?: string;
  }>;

  try {
    accounts = JSON.parse(rawAccounts) as typeof accounts;
  } catch {
    throw new Error("NANO_ACCOUNTS_JSON contém JSON inválido.");
  }

  if (!Array.isArray(accounts) || accounts.length === 0) {
    return;
  }

  const statements = accounts.map((account) => ({
    sql: `INSERT INTO accounts (
      id, email, name, role_label, scopes_json, password_salt, password_hash, active, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      email = excluded.email,
      name = excluded.name,
      role_label = excluded.role_label,
      scopes_json = excluded.scopes_json,
      password_salt = excluded.password_salt,
      password_hash = excluded.password_hash,
      active = excluded.active`,
    args: [
      account.id,
      account.email,
      account.name,
      account.roleLabel,
      JSON.stringify(account.scopes),
      account.passwordSalt,
      account.passwordHash,
      account.active === false ? 0 : 1,
      account.createdAt || new Date().toISOString(),
    ] as InValue[],
  }));

  await db.batch(statements, "write");
}

async function ensureInitialized(): Promise<Client> {
  const db = getClient();
  if (!initPromise) {
    initPromise = (async () => {
      await db.executeMultiple(SCHEMA_SQL);
      await seedAccountsFromEnvironment(db);
    })().catch((err) => {
      initPromise = null;
      throw err;
    });
  }
  await initPromise;
  return db;
}

export async function dbQueryAll<T = Record<string, unknown>>(
  sql: string,
  params: InValue[] = []
): Promise<T[]> {
  const db = await ensureInitialized();
  const result = await db.execute({ sql, args: params });
  return result.rows as unknown as T[];
}

export async function dbQueryGet<T = Record<string, unknown>>(
  sql: string,
  params: InValue[] = []
): Promise<T | null> {
  const db = await ensureInitialized();
  const result = await db.execute({ sql, args: params });
  return (result.rows[0] as unknown as T | undefined) ?? null;
}

export async function dbExecute(
  sql: string,
  params: InValue[] = []
): Promise<number> {
  const db = await ensureInitialized();
  const result = await db.execute({ sql, args: params });
  return Number(result.rowsAffected ?? 0);
}
