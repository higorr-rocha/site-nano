"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../images/logo.png";

export type ActivePage =
  | "home"
  | "empresa"
  | "solucoes"
  | "certificacoes"
  | "novidades"
  | "trabalhe-conosco"
  | "contato";

type SiteHeaderProps = {
  activePage?: ActivePage;
};

const navItems: { label: string; href: string; page: ActivePage }[] = [
  { label: "Início", href: "/", page: "home" },
  { label: "Empresa", href: "/empresa", page: "empresa" },
  { label: "Soluções", href: "/solucoes", page: "solucoes" },
  { label: "Certificações", href: "/certificacoes", page: "certificacoes" },
  { label: "Novidades", href: "/novidades", page: "novidades" },
  { label: "Trabalhe Conosco", href: "/trabalhe-conosco", page: "trabalhe-conosco" },
  { label: "Contato", href: "/contato", page: "contato" },
];

export default function SiteHeader({ activePage }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white shadow-[0_4px_20px_rgba(36,41,141,0.08)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-10">
        <Link href="/" className="flex h-12 shrink-0 items-center" aria-label="Nanoquímica - início">
          <span className="relative flex h-14 w-56 items-center overflow-hidden" aria-hidden="true">
            <Image
              src={logo}
              alt=""
              width={245}
              height={245}
              className="absolute left-[-27px] top-[-95px] max-w-none"
            />
          </span>
        </Link>

        <nav className="ml-auto hidden h-12 items-center gap-7 text-sm font-semibold lg:flex xl:gap-9">
          <Link className={activePage === "home" ? "text-[#FF8200]" : "transition-colors hover:text-[#FF8200]"} href="/">
            Início
          </Link>
          <Link className={activePage === "empresa" ? "text-[#FF8200]" : "transition-colors hover:text-[#FF8200]"} href="/empresa">
            Empresa
          </Link>
          <div className="group relative flex h-12 items-center">
            <Link
              className={activePage === "solucoes" ? "text-[#FF8200]" : "transition-colors hover:text-[#FF8200]"}
              href="/solucoes"
            >
              Soluções
            </Link>
            <div className="invisible absolute left-1/2 top-full z-50 w-52 -translate-x-1/2 translate-y-2 rounded-xl border border-slate-200 bg-white p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {["acucar", "etanol", "industria"].map((category) => (
                <Link
                  key={category}
                  href={`/solucoes/${category}`}
                  className="block rounded-lg px-4 py-3 text-sm font-semibold capitalize text-[#24298D] hover:bg-[#24298D]/10 hover:text-[#FF8200]"
                >
                  {category === "acucar" ? "Açúcar" : category === "industria" ? "Indústria" : "Etanol"}
                </Link>
              ))}
            </div>
          </div>
          <Link className={activePage === "certificacoes" ? "text-[#FF8200]" : "transition-colors hover:text-[#FF8200]"} href="/certificacoes">
            Certificações
          </Link>
          <Link className={activePage === "novidades" ? "text-[#FF8200]" : "transition-colors hover:text-[#FF8200]"} href="/novidades">
            Novidades
          </Link>
          <Link className={activePage === "trabalhe-conosco" ? "text-[#FF8200]" : "transition-colors hover:text-[#FF8200]"} href="/trabalhe-conosco">
            Trabalhe Conosco
          </Link>
          <Link className={activePage === "contato" ? "text-[#FF8200]" : "transition-colors hover:text-[#FF8200]"} href="/contato">
            Contato
          </Link>
        </nav>

        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1.5 rounded-full border border-[#24298D] text-[#24298D] lg:hidden"
        >
          <span className="h-0.5 w-5 bg-current" />
          <span className="h-0.5 w-5 bg-current" />
          <span className="h-0.5 w-5 bg-current" />
        </button>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-navigation"
          className="border-t border-slate-200 bg-white px-6 py-4 shadow-lg lg:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  className={`block rounded-lg px-4 py-3 text-sm font-semibold ${
                    item.page === activePage
                      ? "bg-[#24298D] text-white"
                      : "text-[#24298D] hover:bg-[#24298D]/10"
                  }`}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.label === "Soluções" && (
                  <div className="ml-4 border-l border-[#24298D]/20 pl-3">
                    {["acucar", "etanol", "industria"].map((category) => (
                      <Link
                        key={category}
                        href={`/solucoes/${category}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="block rounded-lg px-4 py-2 text-sm text-[#24298D] hover:bg-[#24298D]/10 hover:text-[#FF8200]"
                      >
                        {category === "acucar" ? "Açúcar" : category === "industria" ? "Indústria" : "Etanol"}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
