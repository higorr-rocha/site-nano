"use client";

import { useState, type FormEvent } from "react";

const ufs = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];

const MAPS_URL = "https://www.google.com/maps?saddr=My+Location&daddr=Rua+Rua+Alexandre+Magnusson%2C+2100%0ADistrito+Industrial+%0APrad%C3%B3polis+SP.";

export default function ContactFormBlock() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-2xl bg-white p-8 shadow-[0_16px_50px_rgba(9,36,111,0.08)]">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">
          Tem interesse?
        </p>
        <h2 className="text-2xl font-black leading-tight tracking-[-0.03em] text-[#24298D] sm:text-3xl">
          Fale com nosso time
        </h2>
        <p className="mt-2 text-xs text-slate-500">
          Em breve retornaremos o contato <span className="font-semibold text-[#FF8200]">*Campos obrigatórios</span>
        </p>

        {submitted ? (
          <div className="mt-6 rounded-xl bg-[#24298D]/5 p-6 text-sm leading-6 text-[#24298D]">
            <p className="font-bold">Mensagem enviada com sucesso!</p>
            <p className="mt-2 text-slate-600">
              Em breve retornaremos o contato.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-4 inline-flex rounded-full bg-[#FF8200] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#FF8200]/85"
            >
              Enviar nova mensagem
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-bold text-[#24298D]">Nome*</label>
                <input
                  type="text"
                  required
                  placeholder="Nome*"
                  className="w-full rounded-xl border border-slate-200 bg-[#f7f9fc] px-4 py-3 text-sm text-[#24298D] outline-none transition focus:border-[#FF8200]"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-[#24298D]">Empresa*</label>
                <input
                  type="text"
                  required
                  placeholder="Empresa*"
                  className="w-full rounded-xl border border-slate-200 bg-[#f7f9fc] px-4 py-3 text-sm text-[#24298D] outline-none transition focus:border-[#FF8200]"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-bold text-[#24298D]">Email*</label>
                <input
                  type="email"
                  required
                  placeholder="Email*"
                  className="w-full rounded-xl border border-slate-200 bg-[#f7f9fc] px-4 py-3 text-sm text-[#24298D] outline-none transition focus:border-[#FF8200]"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-[#24298D]">Telefone</label>
                <input
                  type="tel"
                  placeholder="Telefone"
                  className="w-full rounded-xl border border-slate-200 bg-[#f7f9fc] px-4 py-3 text-sm text-[#24298D] outline-none transition focus:border-[#FF8200]"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_140px]">
              <div>
                <label className="mb-1 block text-xs font-bold text-[#24298D]">Cidade</label>
                <input
                  type="text"
                  placeholder="Cidade"
                  className="w-full rounded-xl border border-slate-200 bg-[#f7f9fc] px-4 py-3 text-sm text-[#24298D] outline-none transition focus:border-[#FF8200]"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-[#24298D]">Estado (UF)</label>
                <select
                  defaultValue="SP"
                  className="w-full rounded-xl border border-slate-200 bg-[#f7f9fc] px-4 py-3 text-sm text-[#24298D] outline-none transition focus:border-[#FF8200]"
                >
                  {ufs.map((uf) => (
                    <option key={uf} value={uf}>
                      {uf}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-[#24298D]">Mensagem*</label>
              <textarea
                required
                rows={4}
                placeholder="Mensagem*"
                className="w-full rounded-xl border border-slate-200 bg-[#f7f9fc] px-4 py-3 text-sm text-[#24298D] outline-none transition focus:border-[#FF8200]"
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#FF8200] px-6 py-4 text-sm font-bold text-white transition-colors hover:bg-[#FF8200]/85"
            >
              Enviar mensagem <span className="ml-3 text-xl">→</span>
            </button>
          </form>
        )}
      </div>

      <div className="flex flex-col justify-between rounded-2xl bg-[#24298D] p-8 text-white shadow-[0_16px_50px_rgba(9,36,111,0.12)]">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">
            Mais contatos
          </p>
          <h2 className="text-2xl font-black leading-tight sm:text-3xl">
            Ou utilize as opções abaixo
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/80">
            Ligue ou envie um e-mail
          </p>

          <div className="mt-8 space-y-6 border-t border-white/15 pt-6 text-sm">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#FF8200]">Telefone:</p>
              <a href="tel:+551639811515" className="mt-1 block text-base font-bold text-white hover:text-[#FF8200]">
                +55 (16) 3981-1515
              </a>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#FF8200]">Email:</p>
              <a
                href="mailto:vendas@nanoquimica.com.br"
                className="mt-1 block text-base font-bold text-white hover:text-[#FF8200]"
              >
                vendas@nanoquimica.com.br
              </a>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#FF8200]">Endereço:</p>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block leading-6 text-white/85 transition-colors hover:text-[#FF8200] hover:underline"
              >
                Rua Alexandre Magnusson, 2100
                <br />
                Distrito Industrial Pradópolis SP
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl bg-white/10 p-5">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#FF8200]">
            Excelência Técnica
          </p>
          <p className="mt-1 text-sm font-semibold text-white">
            Use Nano, a Nano resolve.
          </p>
        </div>
      </div>
    </div>
  );
}
