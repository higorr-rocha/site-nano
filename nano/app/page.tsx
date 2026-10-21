import Image from "next/image";
import Link from "next/link";
import capa from "./images/capa.png";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

const solutions = [
  {
    number: "01",
    title: "Tratamento de água",
    description:
      "Produtos desenvolvidos para melhorar a eficiência e a segurança de cada etapa do tratamento.",
  },
  {
    number: "02",
    title: "Higienização industrial",
    description:
      "Soluções de alta performance para ambientes mais limpos, produtivos e em conformidade.",
  },
  {
    number: "03",
    title: "Processos personalizados",
    description:
      "Análise técnica e formulações sob medida para os desafios específicos da sua operação.",
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#f7f9fc] pt-20 text-[#24298D]">
      <SiteHeader activePage="home" />

      <section className="relative isolate aspect-[1920/780] w-full bg-[#24298D]/10">
        <Image
          src={capa}
          alt="Soluções químicas Nanoquímica para a indústria"
          fill
          priority
          sizes="100vw"
          className="object-contain object-center"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/10 via-transparent to-transparent" />
      </section>

      <section id="empresa" className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1fr_1.2fr] lg:px-10 lg:py-28">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">Sobre a Nanoquímica</p>
          <h1 className="max-w-lg text-4xl font-black leading-[1.05] tracking-[-0.04em] sm:text-5xl">
            Química que transforma processos.
          </h1>
        </div>

        <div className="max-w-2xl space-y-6 text-lg leading-8 text-slate-600">
          <p>
            Unimos conhecimento técnico, inovação e proximidade para entregar soluções químicas que fazem a indústria avançar.
          </p>
          <p>
            Da escolha do produto ao acompanhamento da aplicação, nossa equipe trabalha ao lado do seu negócio para gerar mais eficiência, qualidade e segurança.
          </p>
          <Link href="#solucoes" className="inline-flex items-center gap-3 font-bold text-[#24298D] hover:text-[#FF8200]">
            Conheça nossa atuação <span className="text-2xl">→</span>
          </Link>
        </div>
      </section>

      <section id="solucoes" className="bg-[#24298D] px-6 py-20 text-white lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">Como podemos ajudar</p>
              <h2 className="max-w-xl text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
                Soluções para cada etapa da sua operação.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-white/80">
              Tecnologia e suporte para diferentes segmentos da indústria.
            </p>
          </div>

          <div className="grid gap-3 rounded-2xl bg-white/20 p-1 md:grid-cols-3">
            {solutions.map((solution) => (
              <div key={solution.number} className="group relative min-h-72">
                <article className="absolute inset-0 bg-[#24298D] p-8">
                  <span className="text-5xl font-black leading-none text-[#FF8200]">{solution.number}</span>
                  <h3 className="mt-12 text-2xl font-bold">{solution.title}</h3>
                </article>

                <article className="absolute inset-0 z-10 flex translate-y-3 scale-95 flex-col bg-[#FF8200] p-8 opacity-0 shadow-2xl transition-all duration-300 group-hover:translate-y-[-14px] group-hover:scale-105 group-hover:opacity-100">
                  <span className="text-5xl font-black leading-none text-white/80">{solution.number}</span>
                  <h3 className="mt-8 text-2xl font-bold">{solution.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-white">{solution.description}</p>
                  <a
                    href="#contato"
                    className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-bold transition-colors hover:bg-white/25"
                  >
                    Saiba mais <span>→</span>
                  </a>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contato" className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-28">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">Vamos conversar</p>
          <h2 className="max-w-2xl text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
            Conte com a Nanoquímica para encontrar a melhor solução.
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-[0_16px_50px_rgba(9,36,111,0.08)]">
          <p className="text-lg font-semibold text-[#24298D]">Fale com o nosso time técnico</p>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Tire dúvidas, solicite uma proposta ou descubra a solução ideal para o seu processo.
          </p>
          <a
            href="mailto:contato@nanoquimica.com.br"
            className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#FF8200] px-6 py-4 font-bold text-white transition-colors hover:bg-[#FF8200]/85"
          >
            Entrar em contato <span className="ml-3 text-xl">→</span>
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
