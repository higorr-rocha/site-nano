import { execFileSync } from "child_process";
import fs from "fs";
import path from "path";

function resolveDbPath(): string {
  const configured = process.env.NANO_DB_PATH || "./database/nanoquimica.sqlite";
  return path.isAbsolute(configured)
    ? configured
    : path.join(process.cwd(), configured);
}

function ensureDatabaseInitialized(dbPath: string): void {
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

const PYTHON_SQLITE_BRIDGE = `
import json, sqlite3, sys
db_path = sys.argv[1]
mode = sys.argv[2]
sql = sys.argv[3]
params = json.loads(sys.argv[4])

conn = sqlite3.connect(db_path, timeout=10.0)
conn.row_factory = sqlite3.Row
cur = conn.cursor()
cur.execute(sql, params)
if mode == "all":
    rows = [dict(r) for r in cur.fetchall()]
    print(json.dumps({"ok": True, "rows": rows}))
elif mode == "get":
    row = cur.fetchone()
    print(json.dumps({"ok": True, "row": dict(row) if row else None}))
else:
    conn.commit()
    print(json.dumps({"ok": True, "changes": cur.rowcount}))
conn.close()
`;

export function dbQueryAll<T = Record<string, unknown>>(
  sql: string,
  params: unknown[] = []
): T[] {
  const dbPath = resolveDbPath();
  ensureDatabaseInitialized(dbPath);

  const out = execFileSync(
    "python3",
    ["-c", PYTHON_SQLITE_BRIDGE, dbPath, "all", sql, JSON.stringify(params)],
    { encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] }
  );
  const parsed = JSON.parse(out.trim()) as { ok: boolean; rows: T[] };
  return parsed.rows || [];
}

export function dbQueryGet<T = Record<string, unknown>>(
  sql: string,
  params: unknown[] = []
): T | null {
  const dbPath = resolveDbPath();
  ensureDatabaseInitialized(dbPath);

  const out = execFileSync(
    "python3",
    ["-c", PYTHON_SQLITE_BRIDGE, dbPath, "get", sql, JSON.stringify(params)],
    { encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] }
  );
  const parsed = JSON.parse(out.trim()) as { ok: boolean; row: T | null };
  return parsed.row ?? null;
}

export function dbExecute(sql: string, params: unknown[] = []): number {
  const dbPath = resolveDbPath();
  ensureDatabaseInitialized(dbPath);

  const out = execFileSync(
    "python3",
    ["-c", PYTHON_SQLITE_BRIDGE, dbPath, "run", sql, JSON.stringify(params)],
    { encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] }
  );
  const parsed = JSON.parse(out.trim()) as { ok: boolean; changes: number };
  return parsed.changes || 0;
}
