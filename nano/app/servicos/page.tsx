import Image from "next/image";
import Link from "next/link";
import historia1 from "../images/historia_1.png";
import historia2 from "../images/historia_2.png";
import ContactFormBlock from "../components/ContactFormBlock";
import SiteBreadcrumb from "../components/SiteBreadcrumb";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata = {
  title: "Visita Técnica e Serviços | Nanoquímica",
  description:
    "Assistência técnica personalizada por meio de visitas técnicas no local para usinas e indústrias.",
};

const pilaresVisita = [
  {
    number: "01",
    title: "Análise detalhada no local",
    description:
      "Nossa equipe altamente qualificada realiza diagnósticos completos diretamente na sua planta industrial, identificando as raízes dos desafios operacionais.",
  },
  {
    number: "02",
    title: "Soluções eficazes e econômicas",
    description:
      "Desenvolvemos recomendações técnicas sob medida para otimizar o consumo de insumos, corrigir desvios de processo e elevar o rendimento produtivo.",
  },
  {
    number: "03",
    title: "Orientação e treinamento",
    description:
      "Capacitamos as equipes operacionais dos nossos clientes com boas práticas de dosagem, manuseio e controle para lidar com desafios futuros com segurança.",
  },
];

export default function ServicosPage() {
  return (
    <main className="min-h-screen bg-[#f7f9fc] pt-20 text-[#24298D]">
      <SiteHeader activePage="servicos" />
      <SiteBreadcrumb items={[{ label: "Home", href: "/" }, { label: "Visita Técnica" }]} />

      <section className="bg-[#24298D] px-6 py-12 text-white lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#FF8200]">
            Agende sua
          </p>
          <h1 className="text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
            Visita técnica
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/80">
            Excelência técnica, acompanhamento presencial e soluções personalizadas em todas as etapas do seu processo industrial.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:py-24">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">
            Assistência personalizada
          </p>
          <h2 className="text-2xl font-black leading-tight tracking-[-0.04em] text-[#24298D] sm:text-3xl">
            Acompanhamento técnico especializado na sua indústria
          </h2>
          <p className="mt-5 text-justify text-sm leading-7 text-slate-600 sm:text-base">
            Quando os clientes enfrentam desafios em seus processos, a Nanoquímica oferece assistência personalizada por meio de visitas técnicas no local. Nossa equipe altamente qualificada realiza uma análise detalhada, identificando as raízes do problema e fornecendo soluções eficazes e econômicas.
          </p>
          <p className="mt-4 text-justify text-sm leading-7 text-slate-600 sm:text-base">
            Além disso, oferecemos orientação e treinamento para capacitar os clientes a lidar com desafios futuros. Com nosso compromisso com a excelência técnica e o serviço excepcional, garantimos a satisfação total de nossos clientes em todas as etapas.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://api.whatsapp.com/send?phone=5505516982100266"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-[#FF8200] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#FF8200]/85"
            >
              Agendar Visita pelo WhatsApp <span>→</span>
            </a>
            <Link
              href="/solucoes"
              className="inline-flex items-center gap-2 rounded-full border border-[#24298D] px-6 py-3.5 text-sm font-bold text-[#24298D] transition-colors hover:bg-[#24298D] hover:text-white"
            >
              Conhecer linha de produtos
            </Link>
          </div>
        </div>

        <div className="relative aspect-[655/538] w-full overflow-hidden rounded-2xl shadow-[0_12px_35px_rgba(36,41,141,0.08)]">
          <Image
            src={historia1}
            alt="Equipe técnica da Nanoquímica em atendimento"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </section>

      <section className="bg-white px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">
              Como atuamos
            </p>
            <h2 className="text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl">
              Etapas da nossa visita técnica.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {pilaresVisita.map((pilar, idx) => (
              <article
                key={pilar.number}
                className={`rounded-2xl p-8 ${
                  idx === 1
                    ? "bg-[#24298D] text-white"
                    : idx === 2
                    ? "bg-[#FF8200] text-white"
                    : "bg-[#f7f9fc] text-[#24298D]"
                }`}
              >
                <p className={`text-5xl font-black ${idx === 2 ? "text-white/80" : "text-[#FF8200]"}`}>
                  {pilar.number}
                </p>
                <h3 className="mt-8 text-2xl font-bold">{pilar.title}</h3>
                <p
                  className={`mt-4 text-sm leading-7 ${
                    idx === 0 ? "text-slate-600" : "text-white/90"
                  }`}
                >
                  {pilar.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-[1fr_1fr] lg:px-10 lg:py-20">
        <div className="relative aspect-[655/538] w-full overflow-hidden rounded-2xl shadow-[0_12px_35px_rgba(36,41,141,0.08)]">
          <Image
            src={historia2}
            alt="Laboratório e controle de qualidade Nanoquímica"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">
            Compromisso Nanoquímica
          </p>
          <h2 className="text-2xl font-black leading-tight tracking-[-0.03em] text-[#24298D] sm:text-3xl">
            Use Nano, a Nano resolve.
          </h2>
          <p className="mt-4 text-justify text-sm leading-7 text-slate-600 sm:text-base">
            Você que busca qualidade e variedade em produtos para sua indústria, aqui você encontra. Nosso time acompanha de perto o desempenho de cada aplicação em usinas de açúcar, destilarias de etanol e indústrias em geral.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10 lg:pb-28">
        <ContactFormBlock />
      </section>

      <SiteFooter />
    </main>
  );
}
