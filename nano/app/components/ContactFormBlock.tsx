"use client";

import { useEffect, useState, type FormEvent } from "react";

const ufs = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];

const MAPS_URL = "https://www.google.com/maps?saddr=My+Location&daddr=Rua+Rua+Alexandre+Magnusson%2C+2100%0ADistrito+Industrial+%0APrad%C3%B3polis+SP.";

export default function ContactFormBlock() {
  const [submitted, setSubmitted] = useState(false);
  const [protocolo, setProtocolo] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [nome, setNome] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("SP");
  const [mensagem, setMensagem] = useState("");

  const [challenge, setChallenge] = useState<{
    challengeNonce: string;
    challengeTimestamp: number;
    challengeSignature: string;
  } | null>(null);

  const fetchChallenge = async () => {
    try {
      const res = await fetch("/api/seguranca/desafio");
      const data = await res.json();
      if (data.ok) {
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
    fetchChallenge();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      let activeChallenge = challenge;
      if (!activeChallenge) {
        const cRes = await fetch("/api/seguranca/desafio");
        activeChallenge = await cRes.json();
      }

      let fingerprintHash = "";
      try {
        fingerprintHash = localStorage.getItem("nanoquimica_browser_fp") || "";
      } catch {
        // ignore
      }

      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: String(nome),
          empresa: String(empresa),
          email: String(email),
          telefone: String(telefone),
          cidade: String(cidade),
          uf: String(uf),
          mensagem: String(mensagem),
          fingerprintHash,
          challengeNonce: activeChallenge?.challengeNonce,
          challengeTimestamp: activeChallenge?.challengeTimestamp,
          challengeSignature: activeChallenge?.challengeSignature,
        }),
      });

      const result = await res.json();
      if (!res.ok || !result.ok) {
        setErrorMsg(result.error || "Não foi possível enviar sua mensagem.");
        await fetchChallenge();
      } else {
        setProtocolo(result.protocolo || "");
        setSubmitted(true);
        setNome("");
        setEmpresa("");
        setEmail("");
        setTelefone("");
        setCidade("");
        setUf("SP");
        setMensagem("");
        await fetchChallenge();
      }
    } catch {
      setErrorMsg("Erro de comunicação com o servidor. Tente novamente.");
    } finally {
      setLoading(false);
    }
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

        {errorMsg && (
          <div className="mt-4 rounded-xl border border-red-300 bg-red-50 p-4 text-xs font-bold text-red-700">
            {errorMsg}
          </div>
        )}

        {submitted ? (
          <div className="mt-6 rounded-xl bg-[#24298D]/5 p-6 text-sm leading-6 text-[#24298D]">
            <p className="font-bold">Mensagem enviada e registrada no painel administrativo!</p>
            <p className="mt-2 text-slate-600">
              Seus dados foram encaminhados com segurança para a seção de Contatos ({protocolo ? `Protocolo: ${protocolo}` : "Registrado"}).
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
                  maxLength={120}
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome*"
                  className="w-full rounded-xl border border-slate-200 bg-[#f5f2eb] px-4 py-3 text-sm text-[#24298D] outline-none transition focus:border-[#FF8200]"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-[#24298D]">Empresa*</label>
                <input
                  type="text"
                  required
                  maxLength={120}
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                  placeholder="Empresa*"
                  className="w-full rounded-xl border border-slate-200 bg-[#f5f2eb] px-4 py-3 text-sm text-[#24298D] outline-none transition focus:border-[#FF8200]"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-bold text-[#24298D]">Email*</label>
                <input
                  type="email"
                  required
                  maxLength={120}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email*"
                  className="w-full rounded-xl border border-slate-200 bg-[#f5f2eb] px-4 py-3 text-sm text-[#24298D] outline-none transition focus:border-[#FF8200]"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-[#24298D]">Telefone</label>
                <input
                  type="tel"
                  maxLength={40}
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="Telefone"
                  className="w-full rounded-xl border border-slate-200 bg-[#f5f2eb] px-4 py-3 text-sm text-[#24298D] outline-none transition focus:border-[#FF8200]"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_140px]">
              <div>
                <label className="mb-1 block text-xs font-bold text-[#24298D]">Cidade</label>
                <input
                  type="text"
                  maxLength={80}
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  placeholder="Cidade"
                  className="w-full rounded-xl border border-slate-200 bg-[#f5f2eb] px-4 py-3 text-sm text-[#24298D] outline-none transition focus:border-[#FF8200]"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-[#24298D]">Estado (UF)</label>
                <select
                  value={uf}
                  onChange={(e) => setUf(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f5f2eb] px-4 py-3 text-sm text-[#24298D] outline-none transition focus:border-[#FF8200]"
                >
                  {ufs.map((itemUf) => (
                    <option key={itemUf} value={itemUf}>
                      {itemUf}
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
                maxLength={2000}
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                placeholder="Mensagem*"
                className="w-full rounded-xl border border-slate-200 bg-[#f5f2eb] px-4 py-3 text-sm text-[#24298D] outline-none transition focus:border-[#FF8200]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#FF8200] px-6 py-4 text-sm font-bold text-white transition-colors hover:bg-[#FF8200]/85 disabled:opacity-60"
            >
              {loading ? "Enviando..." : "Enviar mensagem"}
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
            Nanoquímica. Use Nano, a Nano resolve.
          </p>
        </div>
      </div>
    </div>
  );
}
