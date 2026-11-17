import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { dbExecute, dbQueryGet } from "./db";

const DEV_FALLBACKS: Record<string, string> = {
  NANO_SERVER_HMAC_SECRET:
    "dev-only-hmac-secret-nanoquimica-configure-env-local-em-producao-64bytes",
  NANO_DUMMY_PASSWORD_SALT: "0123456789abcdef0123456789abcdef",
  NANO_DUMMY_PASSWORD_HASH:
    "2c70e12b7a0646f92279f427c7b38e7334d8e5389cff167a1dc30e73f826b683" +
    "2c70e12b7a0646f92279f427c7b38e7334d8e5389cff167a1dc30e73f826b683",
};

function getRequiredEnv(key: string): string {
  const val = process.env[key];
  if (val && val.trim().length > 0) {
    return val.trim();
  }

  // Em desenvolvimento local (npm run dev), usa fallback seguro caso o .env.local ainda não tenha sido copiado
  if (process.env.NODE_ENV !== "production" && DEV_FALLBACKS[key]) {
    return DEV_FALLBACKS[key];
  }

  throw new Error(
    `Variável de ambiente de segurança obrigatória ausente: ${key}. Crie o arquivo nano/.env.local ou configure nas Environment Variables da Vercel.`
  );
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

// Constant-time password verification against the Turso `accounts` table
export async function verifyAccountCredentials(
  emailRaw: unknown,
  passwordRaw: unknown
): Promise<AdminAccount | null> {
  const email = sanitizeStrictString(emailRaw, 120).toLowerCase();
  const password = typeof passwordRaw === "string" ? passwordRaw.slice(0, 128) : "";
  if (!email || !password) return null;

  const row = await dbQueryGet<DbAccountRow>(
    "SELECT id, email, name, role_label, scopes_json, password_salt, password_hash, active FROM accounts WHERE lower(email) = ? LIMIT 1",
    [email]
  );

  const dummySalt = getRequiredEnv("NANO_DUMMY_PASSWORD_SALT");
  const dummyHash = getRequiredEnv("NANO_DUMMY_PASSWORD_HASH");

  const saltToUse = row ? String(row.password_salt) : dummySalt;
  const expectedHash = row ? String(row.password_hash) : dummyHash;
  const candidateHash = derivePasswordHash(password, saltToUse);

  const bufA = Buffer.from(candidateHash, "hex");
  const bufB = Buffer.from(expectedHash, "hex");
  if (bufA.length !== bufB.length) return null;

  const isMatch = crypto.timingSafeEqual(bufA, bufB);
  if (!isMatch || !row || !Number(row.active)) return null;

  let scopes: RoleScope[] = [];
  try {
    scopes = JSON.parse(String(row.scopes_json)) as RoleScope[];
  } catch {
    scopes = [];
  }

  const roleLabel = String(row.role_label);

  return {
    id: String(row.id),
    email: String(row.email),
    name: String(row.name),
    roleLabel: roleLabel === "Diretoria Nanoquímica" ? "Diretoria" : roleLabel,
    scopes,
  };
}

// Strict string coercion & control-char removal without double HTML-entity escaping
export function sanitizeStrictString(input: unknown, maxLength = 1000): string {
  if (typeof input !== "string") {
    return "";
  }
  return input
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .trim()
    .normalize("NFC")
    .slice(0, maxLength);
}

export function isValidEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]{1,180}\.[a-zA-Z]{2,12}$/;
  return re.test(email);
}

// Validate resume file: mandatory non-empty binary + .pdf/.doc/.docx + MIME + Magic Bytes + real Buffer size <= 1MB
export function validateResumeFile(
  fileNameRaw: unknown,
  mimeTypeRaw: unknown,
  _fileSizeRaw: unknown,
  base64ContentRaw: unknown
): {
  valid: boolean;
  error?: string;
  safeFileName?: string;
  sizeBytes?: number;
  cleanBase64?: string;
} {
  const fileName = sanitizeStrictString(fileNameRaw, 180).replace(/[^a-zA-Z0-9._ -]/g, "_");
  const mimeType = sanitizeStrictString(mimeTypeRaw, 120).toLowerCase();

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
      error:
        "Formato de arquivo inválido! São aceitos exclusivamente arquivos PDF (.pdf), Word (.doc ou .docx).",
    };
  }

  if (typeof base64ContentRaw !== "string" || base64ContentRaw.trim().length === 0) {
    return {
      valid: false,
      error: "O conteúdo do arquivo de currículo é obrigatório e não pode estar vazio.",
    };
  }

  try {
    const rawBase64 = (
      base64ContentRaw.includes(",") ? base64ContentRaw.split(",")[1] : base64ContentRaw
    ).trim();

    if (!rawBase64 || !/^[A-Za-z0-9+/=\r\n]+$/.test(rawBase64)) {
      return {
        valid: false,
        error: "Codificação binária do currículo inválida.",
      };
    }

    const fullBuffer = Buffer.from(rawBase64, "base64");
    const realSizeBytes = fullBuffer.byteLength;

    if (realSizeBytes <= 0 || realSizeBytes > 1024 * 1024) {
      return {
        valid: false,
        error: "O arquivo deve ter tamanho real entre 1 byte e no máximo 1MB.",
      };
    }

    const isPdfMagic =
      fullBuffer.length >= 4 &&
      fullBuffer[0] === 0x25 &&
      fullBuffer[1] === 0x50 &&
      fullBuffer[2] === 0x44 &&
      fullBuffer[3] === 0x46;
    const isDocMagic =
      fullBuffer.length >= 4 &&
      fullBuffer[0] === 0xd0 &&
      fullBuffer[1] === 0xcf &&
      fullBuffer[2] === 0x11 &&
      fullBuffer[3] === 0xe0;
    const isDocxMagic =
      fullBuffer.length >= 4 &&
      fullBuffer[0] === 0x50 &&
      fullBuffer[1] === 0x4b &&
      fullBuffer[2] === 0x03 &&
      fullBuffer[3] === 0x04;

    if (
      (lowerName.endsWith(".pdf") && !isPdfMagic) ||
      (lowerName.endsWith(".doc") && !isDocMagic) ||
      (lowerName.endsWith(".docx") && !isDocxMagic)
    ) {
      return {
        valid: false,
        error:
          "Assinatura binária do arquivo inválida. Envie um arquivo PDF, DOC ou DOCX autêntico.",
      };
    }

    return {
      valid: true,
      safeFileName: fileName,
      sizeBytes: realSizeBytes,
      cleanBase64: rawBase64,
    };
  } catch {
    return { valid: false, error: "Não foi possível validar o conteúdo binário do currículo." };
  }
}

// Persistent Turso-backed Rate Limiter
interface DbRateLimitRow {
  bucket_key: string;
  timestamps_json: string;
  locked_until: number;
}

export async function checkRateLimit(
  bucketKey: string,
  maxAttempts: number,
  windowMs: number,
  lockoutMs: number
): Promise<{ allowed: boolean; retryAfterSeconds: number }> {
  const now = Date.now();
  const row = await dbQueryGet<DbRateLimitRow>(
    "SELECT bucket_key, timestamps_json, locked_until FROM rate_limits WHERE bucket_key = ? LIMIT 1",
    [bucketKey]
  );

  let timestamps: number[] = [];
  let lockedUntil = 0;

  if (row) {
    lockedUntil = Number(row.locked_until) || 0;
    try {
      timestamps = JSON.parse(String(row.timestamps_json)) as number[];
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
    await dbExecute(
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
  await dbExecute(
    `INSERT INTO rate_limits (bucket_key, timestamps_json, locked_until)
     VALUES (?, ?, 0)
     ON CONFLICT(bucket_key) DO UPDATE SET timestamps_json = excluded.timestamps_json, locked_until = 0`,
    [bucketKey, JSON.stringify(validTimestamps)]
  );
  return { allowed: true, retryAfterSeconds: 0 };
}

export function getClientIp(req: NextRequest): string {
  const vercelForwarded = req.headers.get("x-vercel-forwarded-for");
  if (vercelForwarded) {
    return vercelForwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
}

export function getClientIdentifier(req: NextRequest): string {
  const ip = getClientIp(req);
  return crypto.createHash("sha256").update(ip).digest("hex").slice(0, 32);
}

// Cryptographic Challenge & One-Time Nonce Verification using .env secret + Turso
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

export async function verifySignedChallenge(
  nonceRaw: unknown,
  timestampRaw: unknown,
  signatureRaw: unknown
): Promise<boolean> {
  const hmacSecret = getRequiredEnv("NANO_SERVER_HMAC_SECRET");
  const ttlMs = Number(process.env.NANO_CHALLENGE_TTL_MS) || 600000;
  const nonce = typeof nonceRaw === "string" ? nonceRaw.trim() : "";
  const timestamp = typeof timestampRaw === "number" ? timestampRaw : Number(timestampRaw) || 0;
  const signature = typeof signatureRaw === "string" ? signatureRaw.trim() : "";
  if (!nonce || !/^[a-f0-9]{32}$/i.test(nonce) || !timestamp || !signature) return false;

  const now = Date.now();
  // Rejeita timestamps no futuro (além de 5s de tolerância de relógio) e desafios expirados
  if (now < timestamp - 5000 || now - timestamp > ttlMs) {
    return false;
  }

  const expected = crypto
    .createHmac("sha256", hmacSecret)
    .update(`${nonce}.${timestamp}`)
    .digest("hex");

  const bufA = Buffer.from(signature, "hex");
  const bufB = Buffer.from(expected, "hex");
  if (bufA.length !== bufB.length || !crypto.timingSafeEqual(bufA, bufB)) {
    return false;
  }

  // Invalidação atômica de uso único (One-Time Nonce) contra Replay Attack
  await dbExecute("DELETE FROM used_nonces WHERE expires_at < ?", [now]);
  const inserted = await dbExecute(
    "INSERT INTO used_nonces (nonce, expires_at) VALUES (?, ?) ON CONFLICT(nonce) DO NOTHING",
    [nonce, timestamp + ttlMs]
  );

  return inserted > 0;
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
    (process.env.TURNSTILE_HOSTNAMES || "localhost,site-nano.vercel.app")
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
    const parsed = JSON.parse(
      Buffer.from(payloadB64, "base64url").toString("utf-8")
    ) as SessionPayload;
    if (Date.now() > parsed.exp) return null;
    return parsed;
  } catch {
    return null;
  }
}
