Site Nano

## Produção na Vercel

O SQLite local não é versionado porque contém dados privados. Em produção, configure
`NANO_ACCOUNTS_JSON` nas variáveis da Vercel com as contas administrativas e seus
salts/hashes PBKDF2, além de incluir `site-nano.vercel.app` em `TURNSTILE_HOSTNAMES`.
