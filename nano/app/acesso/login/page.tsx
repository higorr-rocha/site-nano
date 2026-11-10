"use client";

import Script from "next/script";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";

// Cloudflare Turnstile Invisible Sitekey (configurable via NEXT_PUBLIC_TURNSTILE_SITE_KEY)
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

export default function AcessoLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [serverSigVerified, setServerSigVerified] = useState(false);

  const [challenge, setChallenge] = useState<{
    challengeNonce: string;
    challengeTimestamp: number;
    challengeSignature: string;
  } | null>(null);

  const loadChallenge = async () => {
    try {
      const res = await fetch("/api/seguranca/desafio", { cache: "no-store" });
      const sigHeader = res.headers.get("X-Server-Signature");
      const data = await res.json();
      if (data.ok && sigHeader && sigHeader === data._auth?.serverSignature) {
        setServerSigVerified(true);
        setChallenge({
          challengeNonce: data.challengeNonce,
          challengeTimestamp: data.challengeTimestamp,
          challengeSignature: data.challengeSignature,
        });
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadChallenge();
    }, 0);
    (window as unknown as Record<string, unknown>).onTurnstileSuccess = (token: string) => {
      if (token) setTurnstileToken(token);
    };

    return () => window.clearTimeout(timer);
  }, []);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      let activeChallenge = challenge;
      if (!activeChallenge) {
        const resC = await fetch("/api/seguranca/desafio", { cache: "no-store" });
        activeChallenge = await resC.json();
      }

      const res = await fetch("/api/acesso/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(email),
          password: String(password),
          turnstileToken,
          challengeNonce: activeChallenge?.challengeNonce,
          challengeTimestamp: activeChallenge?.challengeTimestamp,
          challengeSignature: activeChallenge?.challengeSignature,
        }),
      });

      const responseSig = res.headers.get("X-Server-Signature");
      const result = await res.json();

      if (!responseSig || responseSig !== result._auth?.serverSignature) {
        setErrorMsg("Falha na verificação de assinatura criptográfica da resposta do servidor.");
        await loadChallenge();
        setLoading(false);
        return;
      }

      if (!res.ok || !result.ok) {
        setErrorMsg(result.error || "Credenciais inválidas.");
        await loadChallenge();
      } else {
        router.push("/acesso");
        router.refresh();
      }
    } catch {
      setErrorMsg("Erro de comunicação segura com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#f5f2eb] pt-20 text-[#24298D]">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
      />
      <SiteHeader />

      <section className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
        <div className="rounded-3xl border border-slate-200 bg-[#FAF8F3] p-8 shadow-[0_20px_60px_rgba(36,41,141,0.12)] sm:p-10">
          <div className="mb-6 flex items-center justify-between">
            <span className="rounded-full bg-[#24298D] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
              Área Restrita • /acesso
            </span>
            <span className="text-[11px] font-bold text-emerald-700">
              {serverSigVerified ? "Assinatura HMAC Ativa" : "Conexão Protegida"}
            </span>
          </div>

          <h1 className="text-2xl font-black tracking-[-0.03em] text-[#24298D] sm:text-3xl">
            Acesso Corporativo
          </h1>
          <p className="mt-2 text-xs leading-5 text-slate-600">
            Autenticação exclusiva via servidor com controle de escopo por conta. O cadastro público de contas é desabilitado.
          </p>

          {errorMsg && (
            <div
              role="alert"
              className="mt-5 rounded-xl border border-red-300 bg-red-50 p-3.5 text-xs font-bold leading-5 text-red-700"
            >
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-xs font-bold text-[#24298D]">
                E-mail Corporativo
              </label>
              <input
                type="email"
                required
                autoComplete="username"
                maxLength={120}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="setor@nanoquimica.com.br"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-[#24298D] outline-none focus:border-[#FF8200]"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-[#24298D]">
                Senha de Acesso
              </label>
              <input
                type="password"
                required
                autoComplete="current-password"
                maxLength={128}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-[#24298D] outline-none focus:border-[#FF8200]"
              />
            </div>

            {/* Cloudflare Turnstile Invisible Widget */}
            <div
              className="cf-turnstile"
              data-sitekey={TURNSTILE_SITE_KEY}
              data-size="invisible"
              data-callback="onTurnstileSuccess"
            />

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#24298D] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#FF8200] disabled:opacity-60"
            >
              {loading ? "Verificando no servidor..." : "Autenticar no Painel →"}
            </button>
          </form>

          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 text-[11px] leading-5 text-slate-600">
            <p className="font-black uppercase tracking-[0.1em] text-[#24298D]">
              Proteção Ativa no Servidor:
            </p>
            <ul className="mt-1.5 list-disc space-y-1 pl-4">
              <li>Cloudflare Turnstile (Modo Invisível) + Rate Limit anti-força bruta</li>
              <li>Assinatura HMAC-SHA256 no desafio de envio e na resposta</li>
              <li>Bloqueio via servidor contra bypass de URL e isolamento por setor</li>
            </ul>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
