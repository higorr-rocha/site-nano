"use client";

import Script from "next/script";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    }
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export default function AcessoLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaStatus, setCaptchaStatus] = useState<
    "waiting" | "success" | "error" | "expired"
  >("waiting");
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);
  const turnstileToken = useRef<string | null>(null);

  const [challenge, setChallenge] = useState<{
    challengeNonce: string;
    challengeTimestamp: number;
    challengeSignature: string;
  } | null>(null);

  const fetchFreshChallenge = async () => {
    try {
      const res = await fetch(`/api/seguranca/desafio?t=${Date.now()}`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (data.ok) {
        const nextChallenge = {
          challengeNonce: data.challengeNonce,
          challengeTimestamp: data.challengeTimestamp,
          challengeSignature: data.challengeSignature,
        };
        setChallenge(nextChallenge);
        return nextChallenge;
      }
    } catch {
      // ignore
    }
    return null;
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchFreshChallenge();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const initializeTurnstile = useCallback(() => {
    if (!window.turnstile || !turnstileContainerRef.current || turnstileWidgetId.current) {
      return;
    }

    turnstileWidgetId.current = window.turnstile.render(turnstileContainerRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      action: "login",
      callback: (token) => {
        turnstileToken.current = token;
        setCaptchaStatus("success");
      },
      "expired-callback": () => {
        turnstileToken.current = null;
        setCaptchaStatus("expired");
      },
      "error-callback": () => {
        turnstileToken.current = null;
        setCaptchaStatus("error");
      },
    });
  }, []);

  const handleTurnstileLoad = () => {
    initializeTurnstile();
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      initializeTurnstile();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [initializeTurnstile]);

  useEffect(() => {
    return () => {
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
    };
  }, []);

  const getTurnstileToken = (): string => {
    initializeTurnstile();

    if (captchaStatus !== "success" || !turnstileToken.current) {
      throw new Error("CAPTCHA_INVALID");
    }

    return turnstileToken.current;
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const captchaToken = getTurnstileToken();
      const activeChallenge = (await fetchFreshChallenge()) || challenge;

      const res = await fetch("/api/acesso/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({
          email: String(email),
          password: String(password),
          turnstileToken: captchaToken,
          challengeNonce: activeChallenge?.challengeNonce,
          challengeTimestamp: activeChallenge?.challengeTimestamp,
          challengeSignature: activeChallenge?.challengeSignature,
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.ok) {
        setErrorMsg(result.error || "Credenciais inválidas.");
        turnstileToken.current = null;
        setCaptchaStatus("waiting");
        if (turnstileWidgetId.current) {
          window.turnstile?.reset(turnstileWidgetId.current);
        }
        await fetchFreshChallenge();
      } else {
        router.push("/acesso");
        router.refresh();
      }
    } catch (error) {
      if (error instanceof Error && error.message === "CAPTCHA_INVALID") {
        setErrorMsg("Captcha inválido. Aguarde a validação e tente novamente.");
      } else {
        setErrorMsg("Não foi possível autenticar. Verifique suas credenciais e tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#f5f2eb] pt-20 text-[#24298D]">
      {TURNSTILE_SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
          onLoad={handleTurnstileLoad}
        />
      )}
      <SiteHeader />

      <section className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
        <div className="rounded-3xl border border-slate-200 bg-[#FAF8F3] p-8 shadow-[0_20px_60px_rgba(36,41,141,0.12)] sm:p-10">
          <h1 className="text-2xl font-black tracking-[-0.03em] text-[#24298D] sm:text-3xl">
            Acesso Corporativo
          </h1>

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

            <div ref={turnstileContainerRef} aria-hidden="true" />

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#24298D] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#FF8200] disabled:opacity-60"
            >
              {loading ? "Autenticando..." : "Autenticar"}
            </button>
          </form>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
