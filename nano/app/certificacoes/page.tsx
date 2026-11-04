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
    number: "01",
    title: "ALVARÁ FUNCIONAMENTO E LICENÇA SANITÁRIA",
    agency: "Vigilância Sanitária / Município de Pradópolis - SP",
    description:
      "Autorização oficial de funcionamento e conformidade sanitária para fabricação, armazenamento e distribuição de produtos químicos.",
  },
  {
    number: "02",
    title: "ALVARÁ POLÍCIA CIVIL",
    agency: "Polícia Civil do Estado de São Paulo",
    description:
      "Licenciamento e regularidade junto à Divisão de Produtos Controlados da Polícia Civil para operações químicas industriais.",
  },
  {
    number: "03",
    title: "AUTO DE VISTORIA DO CORPO DE BOMBEIROS",
    agency: "Corpo de Bombeiros (AVCB)",
    description:
      "Certificação que atesta o cumprimento rigoroso de todas as normas de segurança operacional e prevenção contra incêndios nas instalações.",
  },
  {
    number: "04",
    title: "CERTIFICADO DE LICENÇA DE FUNCIONAMENTO - CLF - POLÍCIA FEDERAL",
    agency: "Polícia Federal",
    description:
      "Habilitação regular para atividades com insumos e produtos químicos fiscalizados pela Polícia Federal.",
  },
  {
    number: "05",
    title: "CERTIFICADO DE REGISTRO DE ESTABELECIMENTO - MAPA",
    agency: "Ministério da Agricultura e Pecuária (MAPA)",
    description:
      "Registro oficial de estabelecimento junto ao MAPA, assegurando padrão de qualidade para atendimento ao setor agroindustrial e sucroenergético.",
  },
  {
    number: "06",
    title: "CERTIFICADO DE REGULARIDADE - CR - IBAMA",
    agency: "IBAMA",
    description:
      "Comprovação de conformidade ambiental junto ao Cadastro Técnico Federal de Atividades Potencialmente Poluidoras.",
  },
  {
    number: "07",
    title: "CERTIFICADO KOSHER",
    agency: "Certificação Internacional Kosher",
    description:
      "Atestado de pureza e conformidade dos insumos químicos para aplicação na produção de açúcar e alimentos segundo padrões internacionais.",
  },
  {
    number: "08",
    title: "CERTIFICADO REGISTRO - EXÉRCITO",
    agency: "Exército Brasileiro",
    description:
      "Certificado de Registro (CR) que autoriza o manuseio e comercialização de produtos químicos controlados pelo Exército.",
  },
  {
    number: "09",
    title: "LICENÇA DE OPERAÇÃO - CETESB",
    agency: "CETESB - Companhia Ambiental do Estado de São Paulo",
    description:
      "Licenciamento ambiental de operação garantindo processos sustentáveis e controle ambiental em todas as etapas produtivas.",
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
              key={cert.number}
              className="flex flex-col justify-between rounded-2xl bg-[#FAF8F3] p-8 shadow-[0_12px_35px_rgba(36,41,141,0.08)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-black text-[#FF8200]">{cert.number}</span>
                </div>
                <h2 className="mt-6 text-lg font-black leading-snug text-[#24298D]">
                  {cert.title}
                </h2>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[#FF8200]">
                  {cert.agency}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {cert.description}
                </p>
              </div>
              <div className="mt-6 border-t border-slate-200/80 pt-4">
                <a
                  href={`mailto:vendas@nanoquimica.com.br?subject=Solicitação de Certificado - ${encodeURIComponent(cert.title)}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#24298D] hover:text-[#FF8200]"
                >
                  Solicitar cópia documental <span>→</span>
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
