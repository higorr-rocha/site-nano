import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { dbExecute, dbQueryGet } from "./db";

function getRequiredEnv(key: string): string {
  const val = process.env[key];
  if (!val || val.trim().length === 0) {
    throw new Error(`Variável de ambiente de segurança obrigatória ausente: ${key}`);
  }
  return val.trim();
}

export function getSessionCookieName(): string {
  return process.env.NANO_SESSION_COOKIE_NAME || "nano_acesso_sid";
}

export type RoleScope = "contatos" | "candidaturas" | "telemetria";

export interface AdminAccount {
  id: string;
  email: string;
  name: string;
  roleLabel: string;
  scopes: RoleScope[];
}

interface DbAccountRow {
  id: string;
  email: string;
  name: string;
  role_label: string;
  scopes_json: string;
  password_salt: string;
  password_hash: string;
  active: number;
}

function derivePasswordHash(password: string, salt: string): string {
  const iterations = Number(process.env.NANO_PBKDF2_ITERATIONS) || 100000;
  return crypto.pbkdf2Sync(password, salt, iterations, 64, "sha512").toString("hex");
}

// Constant-time password verification against the SQLite `accounts` table
export function verifyAccountCredentials(emailRaw: unknown, passwordRaw: unknown): AdminAccount | null {
  const email = sanitizeStrictString(emailRaw, 120).toLowerCase();
  const password = typeof passwordRaw === "string" ? passwordRaw.slice(0, 128) : "";
  if (!email || !password) return null;

  const row = dbQueryGet<DbAccountRow>(
    "SELECT id, email, name, role_label, scopes_json, password_salt, password_hash, active FROM accounts WHERE lower(email) = ? LIMIT 1",
    [email]
  );

  const dummySalt = getRequiredEnv("NANO_DUMMY_PASSWORD_SALT");
  const dummyHash = getRequiredEnv("NANO_DUMMY_PASSWORD_HASH");

  const saltToUse = row ? row.password_salt : dummySalt;
  const expectedHash = row ? row.password_hash : dummyHash;
  const candidateHash = derivePasswordHash(password, saltToUse);

  const bufA = Buffer.from(candidateHash, "hex");
  const bufB = Buffer.from(expectedHash, "hex");
  if (bufA.length !== bufB.length) return null;

  const isMatch = crypto.timingSafeEqual(bufA, bufB);
  if (!isMatch || !row || !row.active) return null;

  let scopes: RoleScope[] = [];
  try {
    scopes = JSON.parse(row.scopes_json) as RoleScope[];
  } catch {
    scopes = [];
  }

  return {
    id: row.id,
    email: row.email,
    name: row.name,
    roleLabel: row.role_label === "Diretoria Nanoquímica" ? "Diretoria" : row.role_label,
    scopes,
  };
}

// Strict string coercion & anti-XSS / anti-injection sanitization
export function sanitizeStrictString(input: unknown, maxLength = 1000): string {
  if (typeof input !== "string") {
    return "";
  }
  const cleaned = input
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .trim()
    .slice(0, maxLength);

  return cleaned
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export function isValidEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]{1,180}\.[a-zA-Z]{2,12}$/;
  return re.test(email);
}

// Validate resume file: only .pdf, .doc, .docx + MIME + Magic Bytes + Max 1MB
export function validateResumeFile(
  fileNameRaw: unknown,
  mimeTypeRaw: unknown,
  fileSizeRaw: unknown,
  base64ContentRaw: unknown
): { valid: boolean; error?: string; safeFileName?: string; sizeBytes?: number } {
  const fileName = sanitizeStrictString(fileNameRaw, 180).replace(/[^a-zA-Z0-9._ -]/g, "_");
  const mimeType = sanitizeStrictString(mimeTypeRaw, 120).toLowerCase();
  const sizeBytes = typeof fileSizeRaw === "number" ? fileSizeRaw : Number(fileSizeRaw) || 0;

  if (!fileName) {
    return { valid: false, error: "Arquivo de currículo obrigatório." };
  }

  const lowerName = fileName.toLowerCase();
  const hasAllowedExt =
    lowerName.endsWith(".pdf") || lowerName.endsWith(".doc") || lowerName.endsWith(".docx");

  const allowedMimes = new Set([
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]);

  if (!hasAllowedExt || !allowedMimes.has(mimeType)) {
    return {
      valid: false,
      error: "Formato de arquivo inválido! São aceitos exclusivamente arquivos PDF (.pdf), Word (.doc ou .docx).",
    };
  }

  if (sizeBytes <= 0 || sizeBytes > 1024 * 1024) {
    return {
      valid: false,
      error: "O arquivo deve ter no máximo 1MB.",
    };
  }

  if (typeof base64ContentRaw === "string" && base64ContentRaw.length > 0) {
    try {
      const rawBase64 = base64ContentRaw.includes(",")
        ? base64ContentRaw.split(",")[1]
        : base64ContentRaw;
      const buf = Buffer.from(rawBase64.slice(0, 64), "base64");
      const isPdfMagic = buf.length >= 4 && buf[0] === 0x25 && buf[1] === 0x50 && buf[2] === 0x44 && buf[3] === 0x46;
      const isDocMagic = buf.length >= 4 && buf[0] === 0xd0 && buf[1] === 0xcf && buf[2] === 0x11 && buf[3] === 0xe0;
      const isDocxMagic = buf.length >= 4 && buf[0] === 0x50 && buf[1] === 0x4b && buf[2] === 0x03 && buf[3] === 0x04;

      if (
        (lowerName.endsWith(".pdf") && !isPdfMagic) ||
        (lowerName.endsWith(".doc") && !isDocMagic) ||
        (lowerName.endsWith(".docx") && !isDocxMagic)
      ) {
        return {
          valid: false,
          error: "Assinatura binária do arquivo inválida. Envie um arquivo PDF, DOC ou DOCX autêntico.",
        };
      }
    } catch {
      return { valid: false, error: "Não foi possível validar o conteúdo binário do currículo." };
    }
  }

  return { valid: true, safeFileName: fileName, sizeBytes };
}

// Persistent SQLite-backed Rate Limiter
interface DbRateLimitRow {
  bucket_key: string;
  timestamps_json: string;
  locked_until: number;
}

export function checkRateLimit(
  bucketKey: string,
  maxAttempts: number,
  windowMs: number,
  lockoutMs: number
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const row = dbQueryGet<DbRateLimitRow>(
    "SELECT bucket_key, timestamps_json, locked_until FROM rate_limits WHERE bucket_key = ? LIMIT 1",
    [bucketKey]
  );

  let timestamps: number[] = [];
  let lockedUntil = 0;

  if (row) {
    lockedUntil = Number(row.locked_until) || 0;
    try {
      timestamps = JSON.parse(row.timestamps_json) as number[];
    } catch {
      timestamps = [];
    }
  }

  if (lockedUntil > now) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((lockedUntil - now) / 1000),
    };
  }

  const validTimestamps = timestamps.filter((t) => now - t < windowMs);
  if (validTimestamps.length >= maxAttempts) {
    const newLock = now + lockoutMs;
    dbExecute(
      `INSERT INTO rate_limits (bucket_key, timestamps_json, locked_until)
       VALUES (?, ?, ?)
       ON CONFLICT(bucket_key) DO UPDATE SET timestamps_json = excluded.timestamps_json, locked_until = excluded.locked_until`,
      [bucketKey, JSON.stringify(validTimestamps), newLock]
    );
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil(lockoutMs / 1000),
    };
  }

  validTimestamps.push(now);
  dbExecute(
    `INSERT INTO rate_limits (bucket_key, timestamps_json, locked_until)
     VALUES (?, ?, 0)
     ON CONFLICT(bucket_key) DO UPDATE SET timestamps_json = excluded.timestamps_json, locked_until = 0`,
    [bucketKey, JSON.stringify(validTimestamps)]
  );
  return { allowed: true, retryAfterSeconds: 0 };
}

export function getClientIdentifier(req: NextRequest): string {
  const ip = getClientIp(req);
  const ua = req.headers.get("user-agent") || "unknown";
  return crypto.createHash("sha256").update(`${ip}|${ua}`).digest("hex").slice(0, 32);
}

export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
}

// Cryptographic Challenge & Request/Response HMAC-SHA256 Signing using .env secret
export function createSignedChallenge(): {
  nonce: string;
  timestamp: number;
  serverSignature: string;
} {
  const hmacSecret = getRequiredEnv("NANO_SERVER_HMAC_SECRET");
  const nonce = crypto.randomBytes(16).toString("hex");
  const timestamp = Date.now();
  const payload = `${nonce}.${timestamp}`;
  const serverSignature = crypto
    .createHmac("sha256", hmacSecret)
    .update(payload)
    .digest("hex");
  return { nonce, timestamp, serverSignature };
}

export function verifySignedChallenge(
  nonceRaw: unknown,
  timestampRaw: unknown,
  signatureRaw: unknown
): boolean {
  const hmacSecret = getRequiredEnv("NANO_SERVER_HMAC_SECRET");
  const ttlMs = Number(process.env.NANO_CHALLENGE_TTL_MS) || 600000;
  const nonce = typeof nonceRaw === "string" ? nonceRaw : "";
  const timestamp = typeof timestampRaw === "number" ? timestampRaw : Number(timestampRaw) || 0;
  const signature = typeof signatureRaw === "string" ? signatureRaw : "";
  if (!nonce || !timestamp || !signature) return false;

  const now = Date.now();
  if (Math.abs(now - timestamp) > ttlMs) return false;

  const expected = crypto
    .createHmac("sha256", hmacSecret)
    .update(`${nonce}.${timestamp}`)
    .digest("hex");

  const bufA = Buffer.from(signature, "hex");
  const bufB = Buffer.from(expected, "hex");
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export function signServerResponse(payloadObj: Record<string, unknown>): {
  signature: string;
  timestamp: number;
} {
  const hmacSecret = getRequiredEnv("NANO_SERVER_HMAC_SECRET");
  const timestamp = Date.now();
  const serialized = JSON.stringify(payloadObj) + "." + timestamp;
  const signature = crypto
    .createHmac("sha256", hmacSecret)
    .update(serialized)
    .digest("hex");
  return { signature, timestamp };
}

export function signedJsonResponse(
  body: Record<string, unknown>,
  status = 200
): NextResponse {
  const { signature, timestamp } = signServerResponse(body);
  const res = NextResponse.json(
    {
      ...body,
      _auth: {
        timestamp,
        serverSignature: signature,
        alg: "HMAC-SHA256",
      },
    },
    { status }
  );
  res.headers.set("X-Server-Signature", signature);
  res.headers.set("X-Signature-Timestamp", String(timestamp));
  res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  return res;
}

// Cloudflare Turnstile Invisible Captcha Server-Side Verification via .env keys
export async function verifyCloudflareTurnstile(
  tokenRaw: unknown,
  remoteIp?: string,
  expectedAction?: string
): Promise<boolean> {
  const token = typeof tokenRaw === "string" ? tokenRaw.trim() : "";
  if (!token || token.length > 2048) return false;

  const secretKey = getRequiredEnv("TURNSTILE_SECRET_KEY");
  const expectedHostnames = new Set(
    (process.env.TURNSTILE_HOSTNAMES || "")
      .split(",")
      .map((hostname) => hostname.trim().toLowerCase())
      .filter(Boolean)
  );
  if (expectedHostnames.size === 0) return false;

  const verifyUrl =
    process.env.TURNSTILE_VERIFY_URL ||
    "https://challenges.cloudflare.com/turnstile/v0/siteverify";

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (remoteIp) formData.append("remoteip", remoteIp);

    const response = await fetch(verifyUrl, {
      method: "POST",
      signal: AbortSignal.timeout(10000),
      body: formData,
    });
    if (!response.ok) return false;
    const data = (await response.json()) as {
      success?: boolean;
      action?: string;
      hostname?: string;
    };
    return Boolean(
      data.success &&
        (!expectedAction || data.action === expectedAction) &&
        typeof data.hostname === "string" &&
        expectedHostnames.has(data.hostname.toLowerCase())
    );
  } catch {
    return false;
  }
}

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  roleLabel: string;
  scopes: RoleScope[];
  iat: number;
  exp: number;
  jti: string;
}

export function createSessionToken(account: AdminAccount): string {
  const hmacSecret = getRequiredEnv("NANO_SERVER_HMAC_SECRET");
  const sessionTtlMs = Number(process.env.NANO_SESSION_TTL_MS) || 28800000;
  const now = Date.now();
  const payload: SessionPayload = {
    userId: account.id,
    email: account.email,
    name: account.name,
    roleLabel: account.roleLabel,
    scopes: account.scopes,
    iat: now,
    exp: now + sessionTtlMs,
    jti: crypto.randomBytes(12).toString("hex"),
  };
  const payloadB64 = Buffer.from(JSON.stringify(payload), "utf-8").toString("base64url");
  const sig = crypto
    .createHmac("sha256", hmacSecret)
    .update(payloadB64)
    .digest("base64url");
  return `${payloadB64}.${sig}`;
}

export function verifySessionToken(token: string | undefined): SessionPayload | null {
  if (!token || !token.includes(".")) return null;
  const [payloadB64, sig] = token.split(".");
  if (!payloadB64 || !sig) return null;

  const hmacSecret = getRequiredEnv("NANO_SERVER_HMAC_SECRET");
  const expectedSig = crypto
    .createHmac("sha256", hmacSecret)
    .update(payloadB64)
    .digest("base64url");

  const bufA = Buffer.from(sig);
  const bufB = Buffer.from(expectedSig);
  if (bufA.length !== bufB.length || !crypto.timingSafeEqual(bufA, bufB)) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf-8")) as SessionPayload;
    if (Date.now() > parsed.exp) return null;
    return parsed;
  } catch {
    return null;
  }
}
