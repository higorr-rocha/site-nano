import { FaDownload } from "react-icons/fa6";
import SiteBreadcrumb from "../components/SiteBreadcrumb";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata = {
  title: "Nossas Certificações | Nanoquímica",
  description:
    "Conheça as licenças e certificados que comprovam a excelência e conformidade da Nanoquímica.",
};

const certifications = [
  {
    title: "ALVARÁ FUNCIONAMENTO E LICENÇA SANITÁRIA",
    agency: "Vigilância Sanitária / Município de Pradópolis - SP",
    description:
      "Autorização oficial de funcionamento e conformidade sanitária para fabricação, armazenamento e distribuição de produtos químicos.",
    file: "alvara-funcionamento-e-licenca-sanitaria.pdf",
  },
  {
    title: "ALVARÁ POLÍCIA CIVIL",
    agency: "Polícia Civil do Estado de São Paulo",
    description:
      "Licenciamento e regularidade junto à Divisão de Produtos Controlados da Polícia Civil para operações químicas industriais.",
    file: "alvara-policia-civil-venc-31122025.pdf",
  },
  {
    title: "AUTO DE VISTORIA DO CORPO DE BOMBEIROS",
    agency: "Corpo de Bombeiros (AVCB)",
    description:
      "Certificação que atesta o cumprimento rigoroso de todas as normas de segurança operacional e prevenção contra incêndios nas instalações.",
    file: "auto-de-vistoria-do-corpo-de-bombeiros.pdf",
  },
  {
    title: "CERTIFICADO DE LICENÇA DE FUNCIONAMENTO - CLF - POLÍCIA FEDERAL",
    agency: "Polícia Federal",
    description:
      "Habilitação regular para atividades com insumos e produtos químicos fiscalizados pela Polícia Federal.",
    file: "certificado-de-licenca-de-funcionamento-clf-policia-federal-.pdf",
  },
  {
    title: "CERTIFICADO DE REGISTRO DE ESTABELECIMENTO - MAPA",
    agency: "Ministério da Agricultura e Pecuária (MAPA)",
    description:
      "Registro oficial de estabelecimento junto ao MAPA, assegurando padrão de qualidade para atendimento ao setor agroindustrial e sucroenergético.",
    file: "certificado-de-registro-de-estabelecimento-mapa-venc-21092026.pdf",
  },
  {
    title: "CERTIFICADO DE REGULARIDADE - CR - IBAMA",
    agency: "IBAMA",
    description:
      "Comprovação de conformidade ambiental junto ao Cadastro Técnico Federal de Atividades Potencialmente Poluidoras.",
    file: "certificado-de-regularidade-cr-ibama-venc-14052025.pdf",
  },
  {
    title: "CERTIFICADO KOSHER",
    agency: "Certificação Internacional Kosher",
    description:
      "Atestado de pureza e conformidade dos insumos químicos para aplicação na produção de açúcar e alimentos segundo padrões internacionais.",
    file: "certificado-kosher.pdf",
  },
  {
    title: "CERTIFICADO REGISTRO - EXÉRCITO",
    agency: "Exército Brasileiro",
    description:
      "Certificado de Registro (CR) que autoriza o manuseio e comercialização de produtos químicos controlados pelo Exército.",
    file: "certificado-registro-exercito.pdf",
  },
  {
    title: "LICENÇA DE OPERAÇÃO - CETESB",
    agency: "CETESB - Companhia Ambiental do Estado de São Paulo",
    description:
      "Licenciamento ambiental de operação garantindo processos sustentáveis e controle ambiental em todas as etapas produtivas.",
    file: "licenca-de-operacao-cetesb.pdf",
  },
];

export default function CertificacoesPage() {
  return (
    <main className="min-h-screen bg-[#f5f2eb] pt-20 text-[#24298D]">
      <SiteHeader activePage="certificacoes" />
      <SiteBreadcrumb items={[{ label: "Home", href: "/" }, { label: "Certificações" }]} />

      <section className="bg-[#24298D] px-6 py-12 text-white lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#FF8200]">
            Nossas licenças e
          </p>
          <h1 className="text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
            Certificados
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/80">
            Excelência Nanoquímica respaldada pelas principais certificações, alvarás e licenças regulatórias do setor químico e agroindustrial.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <article
              key={cert.title}
              className="flex flex-col justify-between rounded-2xl bg-[#FAF8F3] p-8 shadow-[0_12px_35px_rgba(36,41,141,0.08)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div>
                <h2 className="text-lg font-black leading-snug text-[#24298D]">
                  {cert.title}
                </h2>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[#FF8200]">
                  {cert.agency}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {cert.description}
                </p>
              </div>
              <div className="mt-6 flex justify-center border-t border-slate-200/80 pt-5">
                <a
                  href={`/certificados/${cert.file}`}
                  download={cert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Baixar ${cert.title}`}
                  title={`Baixar ${cert.title}`}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#24298D] text-white transition-colors hover:bg-[#FF8200]"
                >
                  <FaDownload className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
