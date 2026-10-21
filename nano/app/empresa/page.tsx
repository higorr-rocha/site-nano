import Image from "next/image";
import Link from "next/link";
import historia1 from "../images/historia_1.png";
import historia2 from "../images/historia_2.png";
import historia3 from "../images/historia_3.png";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata = {
  title: "Nossa história | Nanoquímica",
  description:
    "Conheça a história, a missão, a visão e os valores da Nanoquímica.",
};

const principles = [
  {
    number: "01",
    title: "Entender",
    text: "Entender as necessidades de cada cliente e buscar sua satisfação.",
  },
  {
    number: "02",
    title: "Inovar",
    text: "Investir em inovação tecnológica e na melhoria contínua dos processos.",
  },
  {
    number: "03",
    title: "Valorizar",
    text: "Valorizar as pessoas, incentivando o desenvolvimento pessoal e profissional de cada colaborador.",
  },
];

export default function EmpresaPage() {
  return (
    <main className="overflow-hidden bg-[#f7f9fc] pt-20 text-[#24298D]">
      <SiteHeader activePage="empresa" />

      <section className="relative bg-[#24298D] px-6 py-16 text-white lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">
              Sobre a Nanoquímica
            </p>
            <h1 className="max-w-2xl text-4xl font-black leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Uma história construída com conhecimento e parceria.
            </h1>
          </div>
          <p className="max-w-lg text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
            Mais do que uma empresa de produtos químicos, somos pessoas que acreditam no poder da ciência para transformar o setor agroindustrial.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="relative overflow-hidden rounded-2xl bg-[#d8e8fa]">
            <Image
              src={historia1}
              alt="Equipe e estrutura da Nanoquímica"
              className="h-auto w-full object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">
              A nossa história
            </p>
            <h2 className="max-w-xl text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
              Experiência que se transforma em solução.
            </h2>
            <div className="mt-8 max-w-2xl space-y-5 text-lg leading-8 text-slate-600">
              <p>
                Fundada por profissionais com ampla experiência no segmento químico, a Nanoquímica nasceu com o propósito de unir conhecimento técnico, inovação e proximidade com o cliente. Desde o início, buscamos ir além do fornecimento de produtos, desenvolvendo soluções que contribuam para a eficiência dos processos e melhores resultados.
              </p>
              <p>
                Com uma atuação construída de forma próxima ao mercado, foi consolidando sua presença e ampliando sua capacidade de atender diferentes demandas do setor. Ao longo desse caminho, a empresa manteve como base a confiança nas relações, a atenção às necessidades de cada cliente e o compromisso de evoluir junto com o mercado.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">
              O que nos move
            </p>
            <h2 className="text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
              Um jeito de trabalhar baseado em pessoas.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <article className="rounded-2xl bg-[#f7f9fc] p-8">
              <p className="text-5xl font-black text-[#FF8200]">01</p>
              <h3 className="mt-10 text-2xl font-bold">Missão</h3>
              <p className="mt-4 leading-7 text-slate-600">
                Nosso objetivo futuro é nos posicionarmos como uma empresa líder no mercado, oferecendo soluções eficientes e completas para o agro. Queremos ser reconhecidos como uma marca de referência, capaz de oferecer inovação e qualidade em nossos produtos e serviços, sempre buscando atender às necessidades dos clientes e contribuir para melhores resultados no campo.
              </p>
            </article>
            <article className="rounded-2xl bg-[#24298D] p-8 text-white">
              <p className="text-5xl font-black text-[#FF8200]">02</p>
              <h3 className="mt-10 text-2xl font-bold">Visão</h3>
              <p className="mt-4 leading-7 text-white/80">
                Acreditamos que o crescimento da empresa está diretamente relacionado ao desenvolvimento dos nossos colaboradores. Por isso, buscamos oferecer um ambiente que favoreça o desenvolvimento de habilidades e conhecimentos, promovendo continuamente o aprendizado, a capacitação e o crescimento da nossa equipe.
              </p>
            </article>
            <article className="rounded-2xl bg-[#FF8200] p-8 text-white">
              <p className="text-5xl font-black text-white/80">03</p>
              <h3 className="mt-10 text-2xl font-bold">Valores</h3>
              <p className="mt-4 leading-7 text-white">
                Nossa cultura organizacional é pautada pela ética, honestidade e eficiência em todas as nossas ações. Valorizamos a integridade em nossas relações com clientes, parceiros e colaboradores, buscando sempre qualidade, responsabilidade e melhoria contínua.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-28">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">
            Política de qualidade
          </p>
          <h2 className="max-w-xl text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
            Qualidade em cada relação e em cada processo.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            A Nanoquímica compromete-se a fornecer produtos químicos com qualidade, seguindo princípios que colocam clientes, inovação e pessoas no centro das decisões.
          </p>
          <div className="mt-10 space-y-5">
            {principles.map((principle) => (
              <div key={principle.number} className="flex gap-5 border-t border-slate-200 pt-5">
                <span className="text-sm font-black text-[#FF8200]">{principle.number}</span>
                <div>
                  <h3 className="font-bold">{principle.title}</h3>
                  <p className="mt-1 leading-7 text-slate-600">{principle.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-5">
          <Image
            src={historia2}
            alt="Pesquisa e inovação na Nanoquímica"
            className="w-full rounded-2xl object-cover"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
          <Image
            src={historia3}
            alt="Profissionais da Nanoquímica em seu ambiente de trabalho"
            className="w-full rounded-2xl object-cover"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        </div>
      </section>

      <section className="bg-[#24298D] px-6 py-20 text-white lg:px-10 lg:py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">
              Mais do que uma empresa de produtos químicos
            </p>
            <h2 className="max-w-2xl text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
              Ciência, parceria e conhecimento para transformar.
            </h2>
          </div>
          <Link
            href="/#contato"
            className="inline-flex shrink-0 items-center gap-3 rounded-full bg-[#FF8200] px-6 py-4 font-bold text-white transition-colors hover:bg-[#FF8200]/85"
          >
            Fale com a nossa equipe <span className="text-xl">→</span>
          </Link>
        </div>
        <p className="mx-auto mt-10 max-w-7xl text-lg leading-8 text-white/80">
          Nosso time cresce junto com a empresa, sempre com responsabilidade, respeito e foco em resultados.
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}
