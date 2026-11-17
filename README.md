# Site Nanoquímica — Workspace

## Produção na Vercel com Turso (libSQL)

O projeto está configurado para utilizar o **Turso (`@libsql/client`)** como banco de dados serverless persistente.

1. No painel da **Vercel** (**Settings → Environment Variables**) ou localmente em **`nano/.env.local`**, defina:
   - `TURSO_DATABASE_URL` (ex.: `libsql://seu-banco-usuario.turso.io`)
   - `TURSO_AUTH_TOKEN` (token gerado no painel do Turso ou via `turso db tokens create`)
   - `NANO_ACCOUNTS_JSON` com as contas administrativas e seus salts/hashes `PBKDF2-SHA512`
   - `NANO_SERVER_HMAC_SECRET`, `NANO_DUMMY_PASSWORD_SALT`, `NANO_DUMMY_PASSWORD_HASH`
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` e `TURNSTILE_HOSTNAMES` (incluindo `site-nano.vercel.app`)
2. Consulte `nano/README.md` para o exemplo completo de todas as variáveis de ambiente.
