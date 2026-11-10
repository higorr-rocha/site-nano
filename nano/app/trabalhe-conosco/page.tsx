"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import SiteBreadcrumb from "../components/SiteBreadcrumb";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

const ufs = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];

const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];
const ALLOWED_MIMES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const jobs = [
  {
    number: "01",
    title: "Vaga Analista da Qualidade",
    functions: [
      "Realizar inspeções e auditorias de qualidade em processos, produtos e serviços;",
      "Elaborar, revisar e controlar procedimentos, instruções de trabalho e documentos do Sistema de Gestão da Qualidade;",
      "Acompanhar indicadores de desempenho e propor ações de melhoria contínua;",
      "Monitorar não conformidades e implementar ações corretivas e preventivas;",
      "Acompanhar auditorias internas e externas de certificação;",
      "Ministrar treinamentos relacionados à Gestão da Qualidade;",
      "Garantir o atendimento aos requisitos legais, normativos e exigências dos clientes;",
      "Controlar licenças e documentações de produtos controlados.",
    ],
    prerequisites: [
      "Ensino superior completo em Engenharia, Administração, Gestão da Qualidade ou áreas correlatas;",
      "Experiência com Sistema de Gestão da Qualidade (ISO 9001);",
      "Conhecimento em licenças e órgãos reguladores, como MAPA, CETESB, IBAMA, Polícia Civil, Polícia Federal e Exército.",
    ],
    differentials: [
      "Formação ou curso de Auditor Interno;",
      "Experiência em empresas do segmento químico.",
    ],
  },
  {
    number: "02",
    title: "Vaga Analista de Logística",
    functions: [
      "Planejar e organizar a logística de coleta e entrega de produtos;",
      "Elaborar e acompanhar rotas e atividades dos motoristas;",
      "Controlar revisões, multas, documentações e demais processos relacionados à frota da empresa;",
      "Realizar cotações e negociações de fretes;",
      "Acompanhar indicadores e apoiar a melhoria dos processos logísticos.",
    ],
    prerequisites: [
      "Curso técnico ou superior em Logística, Administração ou áreas correlatas.",
    ],
    differentials: [
      "Experiência em empresas do segmento químico.",
    ],
  },
];

export default function TrabalheConoscoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [protocolo, setProtocolo] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [fileWarning, setFileWarning] = useState("");
  const [loading, setLoading] = useState(false);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("SP");
  const [mensagem, setMensagem] = useState("");
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    type: string;
    size: number;
    base64: string;
  } | null>(null);

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
    const timer = window.setTimeout(() => {
      void fetchChallenge();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileWarning("");
    setErrorMsg("");
    const file = e.target.files?.[0];
    if (!file) {
      setSelectedFile(null);
      return;
    }

    const lowerName = file.name.toLowerCase();
    const validExt = ALLOWED_EXTENSIONS.some((ext) => lowerName.endsWith(ext));
    const validMime = ALLOWED_MIMES.includes(file.type);

    if (!validExt || !validMime) {
      setSelectedFile(null);
      e.target.value = "";
      setFileWarning(
        "Aviso: Formato de arquivo não permitido! O currículo deve estar exclusivamente nos formatos PDF (.pdf), DOC (.doc) ou DOCX (.docx)."
      );
      return;
    }

    if (file.size > 1024 * 1024) {
      setSelectedFile(null);
      e.target.value = "";
      setFileWarning("Aviso: O arquivo selecionado excede o tamanho máximo permitido de 1MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedFile({
        name: file.name,
        type: file.type,
        size: file.size,
        base64: typeof reader.result === "string" ? reader.result : "",
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");

    if (!selectedFile) {
      setFileWarning(
        "Anexe um arquivo de currículo válido (.pdf, .doc ou .docx de até 1MB) antes de enviar."
      );
      return;
    }

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

      const res = await fetch("/api/trabalhe-conosco", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: String(nome),
          email: String(email),
          telefone: String(telefone),
          cidade: String(cidade),
          uf: String(uf),
          mensagem: String(mensagem),
          arquivoNome: selectedFile.name,
          arquivoMime: selectedFile.type,
          arquivoTamanhoBytes: selectedFile.size,
          arquivoBase64: selectedFile.base64,
          fingerprintHash,
          challengeNonce: activeChallenge?.challengeNonce,
          challengeTimestamp: activeChallenge?.challengeTimestamp,
          challengeSignature: activeChallenge?.challengeSignature,
        }),
      });

      const result = await res.json();
      if (!res.ok || !result.ok) {
        setErrorMsg(result.error || "Não foi possível enviar sua candidatura.");
        await fetchChallenge();
      } else {
        setProtocolo(result.protocolo || "");
        setSubmitted(true);
        setNome("");
        setEmail("");
        setTelefone("");
        setCidade("");
        setUf("SP");
        setMensagem("");
        setSelectedFile(null);
        await fetchChallenge();
      }
    } catch {
      setErrorMsg("Erro de conexão ao enviar sua candidatura. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f2eb] pt-20 text-[#24298D]">
      <SiteHeader activePage="trabalhe-conosco" />
      <SiteBreadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Contato", href: "/contato" },
          { label: "Trabalhe conosco" },
        ]}
      />

      <section className="bg-[#24298D] px-6 py-8 text-white lg:px-10 lg:py-10">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl">
            Trabalhe conosco
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <h2 className="mb-10 text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl">
          Vagas Disponíveis
        </h2>

        <div className="grid gap-8 lg:grid-cols-2">
          {jobs.map((job) => (
            <article
              key={job.title}
              className="flex flex-col justify-between rounded-2xl bg-white p-8 shadow-[0_16px_50px_rgba(36,41,141,0.08)]"
            >
              <div>
                <span className="text-4xl font-black text-[#FF8200]">{job.number}</span>
                <h3 className="mt-4 text-2xl font-black text-[#24298D]">{job.title}</h3>

                <div className="mt-6">
                  <h4 className="text-sm font-black uppercase tracking-[0.15em] text-[#FF8200]">
                    Função
                  </h4>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
                    {job.functions.map((fn) => (
                      <li key={fn}>{fn}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-black uppercase tracking-[0.15em] text-[#FF8200]">
                    Pré-requisitos:
                  </h4>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
                    {job.prerequisites.map((req) => (
                      <li key={req}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-black uppercase tracking-[0.15em] text-[#FF8200]">
                    Diferenciais:
                  </h4>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
                    {job.differentials.map((dif) => (
                      <li key={dif}>{dif}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="candidatura" className="mx-auto max-w-4xl px-6 pb-20 lg:px-10 lg:pb-28">
        <div className="rounded-2xl bg-white p-8 shadow-[0_16px_50px_rgba(9,36,111,0.08)] sm:p-10">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">
            Tem interesse?
          </p>
          <h2 className="text-2xl font-black leading-tight tracking-[-0.03em] text-[#24298D] sm:text-3xl">
            Gostaria de entrar para o nosso time?
          </h2>
          <p className="mt-2 text-xs text-slate-500">
            Em breve retornaremos o contato <span className="font-semibold text-[#FF8200]">*Campos obrigatórios</span>
          </p>

          {fileWarning && (
            <div
              role="alert"
              className="mt-4 rounded-xl border border-amber-400 bg-amber-50 p-4 text-xs font-bold leading-5 text-amber-900"
            >
              {fileWarning}
            </div>
          )}

          {errorMsg && (
            <div
              role="alert"
              className="mt-4 rounded-xl border border-red-300 bg-red-50 p-4 text-xs font-bold leading-5 text-red-700"
            >
              {errorMsg}
            </div>
          )}

          {submitted ? (
            <div className="mt-6 rounded-xl bg-[#24298D]/5 p-6 text-sm leading-6 text-[#24298D]">
              <p className="font-bold">Currículo enviado e registrado no painel administrativo!</p>
              <p className="mt-2 text-slate-600">
                Sua candidatura foi armazenada com segurança para avaliação do RH ({protocolo ? `Protocolo: ${protocolo}` : "Registrado"}).
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 inline-flex rounded-full bg-[#FF8200] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#FF8200]/85"
              >
                Enviar nova candidatura
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
                    className="w-full rounded-xl border border-slate-200 bg-[#f5f2eb] px-4 py-3 text-sm text-[#24298D] outline-none focus:border-[#FF8200]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-[#24298D]">Email*</label>
                  <input
                    type="email"
                    required
                    maxLength={120}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email*"
                    className="w-full rounded-xl border border-slate-200 bg-[#f5f2eb] px-4 py-3 text-sm text-[#24298D] outline-none focus:border-[#FF8200]"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-xs font-bold text-[#24298D]">Telefone</label>
                  <input
                    type="tel"
                    maxLength={40}
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="Telefone"
                    className="w-full rounded-xl border border-slate-200 bg-[#f5f2eb] px-4 py-3 text-sm text-[#24298D] outline-none focus:border-[#FF8200]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-[#24298D]">Cidade</label>
                  <input
                    type="text"
                    maxLength={80}
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    placeholder="Cidade"
                    className="w-full rounded-xl border border-slate-200 bg-[#f5f2eb] px-4 py-3 text-sm text-[#24298D] outline-none focus:border-[#FF8200]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-[#24298D]">Estado (UF)</label>
                  <select
                    value={uf}
                    onChange={(e) => setUf(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-[#f5f2eb] px-4 py-3 text-sm text-[#24298D] outline-none focus:border-[#FF8200]"
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
                <label className="mb-1 block text-xs font-bold text-[#24298D]">
                  Currículo* (Apenas PDF, DOC ou DOCX — Tamanho máximo: 1MB)
                </label>
                <input
                  type="file"
                  required
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileChange}
                  className="w-full rounded-xl border border-slate-200 bg-[#f5f2eb] px-4 py-2.5 text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-[#24298D] file:px-4 file:py-2 file:text-xs file:font-bold file:text-white hover:file:bg-[#FF8200]"
                />
                {selectedFile && (
                  <p className="mt-1.5 text-xs font-semibold text-emerald-700">
                    Arquivo validado: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                  </p>
                )}
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
                  className="w-full rounded-xl border border-slate-200 bg-[#f5f2eb] px-4 py-3 text-sm text-[#24298D] outline-none focus:border-[#FF8200]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-full bg-[#FF8200] px-6 py-4 text-sm font-bold text-white transition-colors hover:bg-[#FF8200]/85 disabled:opacity-60"
              >
                {loading ? "Validando e enviando..." : "Enviar candidatura"}{" "}
                <span className="ml-3 text-xl">→</span>
              </button>
            </form>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
