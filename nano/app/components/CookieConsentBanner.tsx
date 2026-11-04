"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [prefs, setPrefs] = useState({
    necessary: true,
    performance: true,
    functional: true,
    advertising: false,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("nanoquimica_cookie_consent");
      if (!saved) {
        const timer = window.setTimeout(() => setIsVisible(true), 0);
        return () => window.clearTimeout(timer);
      }
    } catch {
      const timer = window.setTimeout(() => setIsVisible(true), 0);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const saveConsent = (mode: "all" | "reject" | "custom") => {
    const payload =
      mode === "all"
        ? { necessary: true, performance: true, functional: true, advertising: true, mode }
        : mode === "reject"
        ? { necessary: true, performance: false, functional: false, advertising: false, mode }
        : { ...prefs, mode };
    try {
      localStorage.setItem("nanoquimica_cookie_consent", JSON.stringify(payload));
    } catch {
      // ignore storage errors in restricted iframes
    }
    setIsVisible(false);
    setIsCustomizing(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6">
      <div className="mx-auto max-w-6xl rounded-2xl border border-slate-300 bg-[#FAF8F3] p-5 text-[#24298D] shadow-[0_-8px_35px_rgba(36,41,141,0.18)] sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#FF8200]" />
              <h2 className="text-sm font-black uppercase tracking-[0.14em] text-[#24298D]">
                Controle sua Privacidade e Cookies
              </h2>
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
              Utilizamos cookies necessários, de desempenho, funcionalidade e publicidade para melhorar a sua experiência de navegação e analisar o tráfego do site, em conformidade com a LGPD. Você pode aceitar todos, rejeitar os não essenciais ou personalizar suas escolhas. Consulte nossa{" "}
              <Link href="/politica-de-privacidade" className="font-bold text-[#FF8200] underline hover:text-[#24298D]">
                Política de Privacidade
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsCustomizing((prev) => !prev)}
              className="rounded-full border border-[#24298D] px-4 py-2.5 text-xs font-bold text-[#24298D] transition-colors hover:bg-[#24298D]/10"
            >
              {isCustomizing ? "Fechar opções" : "Personalizar"}
            </button>
            <button
              type="button"
              onClick={() => saveConsent("reject")}
              className="rounded-full border border-slate-400 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-100"
            >
              Rejeitar
            </button>
            <button
              type="button"
              onClick={() => saveConsent("all")}
              className="rounded-full bg-[#FF8200] px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#FF8200]/85"
            >
              Aceitar tudo
            </button>
          </div>
        </div>

        {isCustomizing && (
          <div className="mt-5 border-t border-slate-200 pt-5">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <label className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3.5">
                <div>
                  <span className="block text-xs font-black text-[#24298D]">Cookies Necessários</span>
                  <span className="mt-1 block text-[11px] leading-4 text-slate-500">
                    Essenciais para o funcionamento e segurança do site. Sempre ativos.
                  </span>
                </div>
                <input type="checkbox" checked disabled className="mt-0.5 h-4 w-4 accent-[#24298D]" />
              </label>

              <label className="flex cursor-pointer items-start justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3.5">
                <div>
                  <span className="block text-xs font-black text-[#24298D]">Cookies de Desempenho</span>
                  <span className="mt-1 block text-[11px] leading-4 text-slate-500">
                    Ajudam a entender como os visitantes interagem com o site de forma anônima.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.performance}
                  onChange={(e) => setPrefs({ ...prefs, performance: e.target.checked })}
                  className="mt-0.5 h-4 w-4 accent-[#FF8200]"
                />
              </label>

              <label className="flex cursor-pointer items-start justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3.5">
                <div>
                  <span className="block text-xs font-black text-[#24298D]">Cookies de Funcionalidade</span>
                  <span className="mt-1 block text-[11px] leading-4 text-slate-500">
                    Memorizam preferências de navegação e escolhas do usuário.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.functional}
                  onChange={(e) => setPrefs({ ...prefs, functional: e.target.checked })}
                  className="mt-0.5 h-4 w-4 accent-[#FF8200]"
                />
              </label>

              <label className="flex cursor-pointer items-start justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3.5">
                <div>
                  <span className="block text-xs font-black text-[#24298D]">Cookies de Publicidade</span>
                  <span className="mt-1 block text-[11px] leading-4 text-slate-500">
                    Direcionam conteúdos e anúncios relevantes conforme seus interesses.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.advertising}
                  onChange={(e) => setPrefs({ ...prefs, advertising: e.target.checked })}
                  className="mt-0.5 h-4 w-4 accent-[#FF8200]"
                />
              </label>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => saveConsent("custom")}
                className="rounded-full bg-[#24298D] px-5 py-2 text-xs font-bold text-white transition-colors hover:bg-[#24298D]/90"
              >
                Salvar preferências
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
