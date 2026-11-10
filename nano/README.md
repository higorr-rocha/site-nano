# Site Nanoquímica — Next.js Full-Stack & Segurança Corporativa

## 1. Banco de Dados Relacional (`database/nanoquimica.sqlite`)

Todos os registros operacionais e contas corporativas pré-provisionadas residem exclusivamente no banco de dados relacional SQLite (`database/nanoquimica.sqlite`, definido em `database/schema.sql`), acessado via *queries* parametrizadas em `app/lib/db.ts`:
- `accounts`: Contas corporativas com escopo RBAC (`scopes_json`), *salt* individual e hash irreversível `PBKDF2-SHA512`.
- `contacts`: Solicitações de contato e orçamento enviadas por `POST /api/contato`.
- `job_applications`: Candidaturas e metadados de currículos validados enviados por `POST /api/trabalhe-conosco`.
- `telemetry_consents`: Registros essenciais de consentimento de cookies e hash `SHA-256` de *fingerprint* do navegador enviados por `POST /api/telemetria/consentimento`.
- `rate_limits`: Controle persistente de janelas de tentativas por IP/fingerprint.

## 2. Variáveis de Ambiente e Chaves de Segurança (`.env`)

Nenhuma chave criptográfica, segredo HMAC, chave de captcha ou credencial fica hardcoded no código-fonte. Todas as variáveis sensíveis ficam isoladas no arquivo `.env` (protegido pelo `.gitignore`):
- `NANO_DB_PATH`
- `NANO_SERVER_HMAC_SECRET`
- `NANO_PBKDF2_ITERATIONS`
- `NANO_DUMMY_PASSWORD_SALT` / `NANO_DUMMY_PASSWORD_HASH`
- `NANO_SESSION_COOKIE_NAME` / `NANO_SESSION_TTL_MS` / `NANO_CHALLENGE_TTL_MS`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` / `TURNSTILE_VERIFY_URL`
- `NEXT_PUBLIC_GA_ID`

## 3. Execução

```bash
npm install
npm run dev
```
