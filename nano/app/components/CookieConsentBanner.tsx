"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export async function computeBrowserFingerprint(): Promise<{
  fingerprintHash: string;
  language: string;
  timezone: string;
  screenResolution: string;
  platform: string;
}> {
  const language = typeof navigator !== "undefined" ? navigator.language || "pt-BR" : "pt-BR";
  const timezone =
    typeof Intl !== "undefined"
      ? Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Sao_Paulo"
      : "America/Sao_Paulo";
  const screenResolution =
    typeof window !== "undefined" && window.screen
      ? `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`
      : "unknown";
  const platform =
    typeof navigator !== "undefined"
      ? `${navigator.platform || "web"}|cores:${navigator.hardwareConcurrency || 0}`
      : "web";
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  const raw = `${ua}|${language}|${timezone}|${screenResolution}|${platform}`;

  if (typeof window !== "undefined" && window.crypto && window.crypto.subtle) {
    try {
      const msgBuffer = new TextEncoder().encode(raw);
      const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const fingerprintHash = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
        .slice(0, 32);
      return { fingerprintHash, language, timezone, screenResolution, platform };
    } catch {
      // fallback below
    }
  }

  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    hash = (hash << 5) - hash + raw.charCodeAt(i);
    hash |= 0;
  }
  const fingerprintHash = "fp_" + Math.abs(hash).toString(16).padStart(16, "0");
  return { fingerprintHash, language, timezone, screenResolution, platform };
}

/**
 * Sincroniza o registro de consentimento/fingerprint com o banco de dados Turso
 * exclusivamente quando o usuário interage ativamente com um formulário (prevenção à fraude, Art. 7º, IX da LGPD).
 */
export async function syncTelemetryConsentOnFormSubmit(): Promise<string> {
  const fpData = await computeBrowserFingerprint();
  let analyticsAccepted = false;

  try {
    const saved = localStorage.getItem("nanoquimica_cookie_consent_v2");
    if (saved) {
      const parsed = JSON.parse(saved) as { analyticsAccepted?: boolean };
      analyticsAccepted = Boolean(parsed.analyticsAccepted);
    }
    localStorage.setItem("nanoquimica_browser_fp", fpData.fingerprintHash);
  } catch {
    // ignore storage restrictions
  }

  const payload = {
    essentialAccepted: true,
    analyticsAccepted,
    fingerprintHash: fpData.fingerprintHash,
    language: fpData.language,
    timezone: fpData.timezone,
    screenResolution: fpData.screenResolution,
    platform: fpData.platform,
    savedAt: new Date().toISOString(),
  };

  try {
    await fetch("/api/telemetria/consentimento", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // ignore network errors during background consent sync
  }

  return fpData.fingerprintHash;
}

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [gaGranted, setGaGranted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("nanoquimica_cookie_consent_v2");
      if (!saved) {
        setIsVisible(true);
      } else {
        const parsed = JSON.parse(saved) as { analyticsAccepted?: boolean };
        if (parsed.analyticsAccepted) {
          setGaGranted(true);
        }
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  // No banner de cookies, a preferência fica salva apenas localmente no navegador (localStorage).
  // O envio ao banco de dados ocorre somente quando o visitante utiliza um formulário do site.
  const persistConsentLocally = async (mode: "all" | "reject" | "custom") => {
    const analyticsAccepted =
      mode === "all" ? true : mode === "reject" ? false : analyticsEnabled;

    const fpData = await computeBrowserFingerprint();

    const payload = {
      essentialAccepted: true,
      analyticsAccepted,
      fingerprintHash: fpData.fingerprintHash,
      language: fpData.language,
      timezone: fpData.timezone,
      screenResolution: fpData.screenResolution,
      platform: fpData.platform,
      savedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem("nanoquimica_cookie_consent_v2", JSON.stringify(payload));
      localStorage.setItem("nanoquimica_browser_fp", fpData.fingerprintHash);
    } catch {
      // ignore localStorage restrictions
    }

    setGaGranted(analyticsAccepted);
    setIsVisible(false);
    setIsCustomizing(false);
  };

  return (
    <>
      {gaGranted && GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'analytics_storage': 'granted',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
              });
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {isVisible && (
        <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6">
          <div className="mx-auto max-w-6xl rounded-2xl border border-slate-300 bg-[#FAF8F3] p-5 text-[#24298D] shadow-[0_-8px_35px_rgba(36,41,141,0.18)] sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#FF8200]" />
                  <h2 className="text-sm font-black uppercase tracking-[0.14em] text-[#24298D]">
                    Aviso de Cookies e Segurança
                  </h2>
                </div>
                <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
                  Armazenamos localmente sua preferência de privacidade e utilizamos verificações essenciais de segurança ao enviar formulários, além de métricas analíticas opcionais via Google Analytics. Consulte nossa{" "}
                  <Link href="/politica-de-privacidade" className="font-bold text-[#FF8200] underline hover:text-[#24298D]">
                    Política de Privacidade
                  </Link>
                  .
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsCustomizing((prev) => !prev)}
                  className="rounded-full border border-[#24298D] px-4 py-2.5 text-xs font-bold text-[#24298D] transition-colors hover:bg-[#24298D]/10"
                >
                  {isCustomizing ? "Fechar opções" : "Personalizar"}
                </button>
                <button
                  type="button"
                  onClick={() => void persistConsentLocally("reject")}
                  className="rounded-full border border-slate-400 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-100"
                >
                  Rejeitar opcionais
                </button>
                <button
                  type="button"
                  onClick={() => void persistConsentLocally("all")}
                  className="rounded-full bg-[#FF8200] px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#FF8200]/85"
                >
                  Aceitar tudo
                </button>
              </div>
            </div>

            {isCustomizing && (
              <div className="mt-5 border-t border-slate-200 pt-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label
                    htmlFor="cookie-essential-checkbox"
                    className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4"
                  >
                    <div>
                      <span className="block text-xs font-black text-[#24298D]">
                        1. Cookies Essenciais e Segurança de Formulários (Obrigatório)
                      </span>
                      <span className="mt-1 block text-[11px] leading-4 text-slate-500">
                        Mantém sua escolha salva localmente no navegador e protege o envio de formulários contra abusos automatizados.
                      </span>
                    </div>
                    <input
                      id="cookie-essential-checkbox"
                      type="checkbox"
                      checked
                      disabled
                      className="mt-0.5 h-4 w-4 accent-[#24298D]"
                    />
                  </label>

                  <label
                    htmlFor="cookie-analytics-checkbox"
                    className="flex cursor-pointer items-start justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4"
                  >
                    <div>
                      <span className="block text-xs font-black text-[#24298D]">
                        2. Google Analytics (Métricas de Navegação)
                      </span>
                      <span className="mt-1 block text-[11px] leading-4 text-slate-500">
                        Ativa o Google Analytics (GA4) com IP anonimizado para medir páginas visitadas e desempenho do site.
                      </span>
                    </div>
                    <input
                      id="cookie-analytics-checkbox"
                      type="checkbox"
                      checked={analyticsEnabled}
                      onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                      className="mt-0.5 h-4 w-4 accent-[#FF8200]"
                    />
                  </label>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => void persistConsentLocally("custom")}
                    className="rounded-full bg-[#24298D] px-5 py-2 text-xs font-bold text-white transition-colors hover:bg-[#24298D]/90"
                  >
                    Salvar preferências
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
