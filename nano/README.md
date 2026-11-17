# Site Nanoquímica — Next.js Full-Stack & Turso (libSQL)

## 1. Onde Configurar as Credenciais do Turso (`TURSO_DATABASE_URL` e `TURSO_AUTH_TOKEN`)

Toda a persistência de contas administrativas (`accounts`), contatos comerciais (`contacts`), candidaturas com currículo (`job_applications`), consentimentos (`telemetry_consents`), controle de tentativas (`rate_limits`) e desafios de uso único (`used_nonces`) agora utiliza o **Turso (`@libsql/client`)**:

### A. Em Desenvolvimento Local (`nano/.env.local`)
Crie o arquivo `nano/.env.local` (dentro da pasta `nano/`) com as variáveis abaixo:

```env
# 1. Credenciais do Banco de Dados Turso (obtidas no painel https://app.turso.tech ou via Turso CLI)
TURSO_DATABASE_URL="libsql://nome-do-seu-banco-seu-usuario.turso.io"
TURSO_AUTH_TOKEN="eyJhbGciOiJFZERTQSI..."

# 2. Chaves Criptográficas e Segurança do Servidor
NANO_SERVER_HMAC_SECRET="sua-chave-secreta-hmac-256-bits"
NANO_PBKDF2_ITERATIONS="100000"
NANO_DUMMY_PASSWORD_SALT="0123456789abcdef0123456789abcdef"
NANO_DUMMY_PASSWORD_HASH="0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
NANO_SESSION_COOKIE_NAME="nano_acesso_sid"
NANO_SESSION_TTL_MS="28800000"
NANO_CHALLENGE_TTL_MS="600000"

# 3. Contas Administrativas Iniciais (JSON em uma única linha)
NANO_ACCOUNTS_JSON='[{"id":"adm_1","email":"diretoria@nanoquimica.com.br","name":"Diretoria Nanoquímica","roleLabel":"Diretoria","scopes":["contatos","candidaturas","telemetria"],"passwordSalt":"...","passwordHash":"...","active":true}]'

# 4. Cloudflare Turnstile (Captcha)
NEXT_PUBLIC_TURNSTILE_SITE_KEY="sua-site-key-turnstile"
TURNSTILE_SECRET_KEY="sua-secret-key-turnstile"
TURNSTILE_HOSTNAMES="localhost,site-nano.vercel.app"

# 5. Google Analytics (Opcional) e URL Canônica
NEXT_PUBLIC_GA_ID=""
NEXT_PUBLIC_SITE_URL="https://site-nano.vercel.app"
```

### B. Em Produção na Vercel
1. Acesse o painel da Vercel (`https://vercel.com`) e abra o projeto **site-nano**.
2. Vá em **Settings** → **Environment Variables**.
3. Adicione **`TURSO_DATABASE_URL`** e **`TURSO_AUTH_TOKEN`** (marcando os ambientes *Production*, *Preview* e *Development*), além das demais variáveis listadas acima (`NANO_SERVER_HMAC_SECRET`, `NANO_ACCOUNTS_JSON`, `TURNSTILE_*`, etc.).
4. Na primeira requisição em produção, o módulo `app/lib/db.ts` criará automaticamente todas as tabelas (`schema.sql`) no seu banco Turso e fará o *seed* das contas de `NANO_ACCOUNTS_JSON`.

## 2. Execução Local

```bash
cd nano
npm install
npm run dev
```
