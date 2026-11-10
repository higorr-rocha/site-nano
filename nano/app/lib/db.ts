import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

let connection: Database.Database | null = null;

function resolveDbPath(): string {
  const configured = process.env.NANO_DB_PATH;
  if (configured && path.isAbsolute(configured)) {
    return configured;
  }

  return process.env.NODE_ENV === "production"
    ? path.join("/tmp", "nanoquimica.sqlite")
    : path.join(process.cwd(), "database", "nanoquimica.sqlite");
}

function getConnection(): Database.Database {
  if (connection) {
    return connection;
  }

  const dbPath = resolveDbPath();
  const dir = path.dirname(dbPath);
  fs.mkdirSync(dir, { recursive: true });
  connection = new Database(dbPath);
  connection.pragma("journal_mode = WAL");

  const schemaPath = path.join(process.cwd(), "database", "schema.sql");
  connection.exec(fs.readFileSync(schemaPath, "utf8"));
  seedAccountsFromEnvironment(connection);
  return connection;
}

function seedAccountsFromEnvironment(db: Database.Database): void {
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

  const insert = db.prepare(
    `INSERT INTO accounts (
      id, email, name, role_label, scopes_json, password_salt, password_hash, active, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      email = excluded.email,
      name = excluded.name,
      role_label = excluded.role_label,
      scopes_json = excluded.scopes_json,
      password_salt = excluded.password_salt,
      password_hash = excluded.password_hash,
      active = excluded.active`
  );

  const transaction = db.transaction(() => {
    for (const account of accounts) {
      insert.run(
        account.id,
        account.email,
        account.name,
        account.roleLabel,
        JSON.stringify(account.scopes),
        account.passwordSalt,
        account.passwordHash,
        account.active === false ? 0 : 1,
        account.createdAt || new Date().toISOString()
      );
    }
  });
  transaction();
}

export function dbQueryAll<T = Record<string, unknown>>(
  sql: string,
  params: unknown[] = []
): T[] {
  return getConnection().prepare(sql).all(...params) as T[];
}

export function dbQueryGet<T = Record<string, unknown>>(
  sql: string,
  params: unknown[] = []
): T | null {
  return (getConnection().prepare(sql).get(...params) as T | undefined) ?? null;
}

export function dbExecute(sql: string, params: unknown[] = []): number {
  return getConnection().prepare(sql).run(...params).changes;
}
