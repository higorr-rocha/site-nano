import Image from "next/image";
import Link from "next/link";
import capa from "./images/capa.png";
import historia1 from "./images/historia_1.png";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import { categories } from "./solucoes/catalogo";

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#f5f2eb] pt-20 text-[#24298D]">
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

      <section id="empresa" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">
          Sobre a Nanoquímica
        </p>
        <h1 className="text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
          Química que transforma processos.
        </h1>
        <div className="mt-6 max-w-4xl space-y-4 text-base leading-8 text-slate-600 sm:text-lg">
          <p>
            Unimos conhecimento técnico, inovação e proximidade para entregar soluções químicas que fazem a indústria avançar.
          </p>
          <p>
            Da escolha do produto ao acompanhamento da aplicação, nossa equipe trabalha ao lado do seu negócio para gerar mais eficiência, qualidade e segurança.
          </p>
          <div className="pt-2">
            <Link href="/solucoes" className="inline-flex items-center gap-3 font-bold text-[#24298D] hover:text-[#FF8200]">
              Conheça nossa atuação <span className="text-2xl">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section id="produtos-setores" className="bg-[#24298D] px-6 py-20 text-white lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">
              Nanoquímica
            </p>
            <h2 className="text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl lg:whitespace-nowrap lg:text-[42px] xl:text-5xl">
              Produtos químicos para usinas e indústrias
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/solucoes/${category.slug}`}
                className="group overflow-hidden rounded-2xl bg-[#FAF8F3] text-[#24298D] shadow-[0_16px_50px_rgba(0,0,0,0.2)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#24298D]/10">
                  <Image
                    src={category.image}
                    alt={`Produtos para ${category.title}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-7">
                  <h3 className="text-2xl font-bold">{category.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{category.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-bold text-[#FF8200]">
                    Ver produtos <span className="text-xl">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="visita-tecnica" className="bg-[#ede9df] px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 rounded-3xl bg-[#FAF8F3] p-8 shadow-[0_16px_50px_rgba(36,41,141,0.08)] sm:p-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="relative aspect-[655/538] w-full overflow-hidden rounded-2xl bg-[#d8e8fa] shadow-[0_12px_35px_rgba(36,41,141,0.1)]">
            <Image
              src={historia1}
              alt="Visita técnica Nanoquímica"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">
              Agende sua
            </p>
            <h2 className="text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              Visita técnica
            </h2>
            <p className="mt-6 text-justify text-base leading-8 text-slate-600 sm:text-lg">
              Quando os clientes enfrentam desafios em seus processos, a Nanoquímica oferece assistência personalizada por meio de visitas técnicas no local. Nossa equipe altamente qualificada realiza uma análise detalhada, identificando as raízes do problema e fornecendo soluções eficazes e econômicas. Além disso, oferecemos orientação e treinamento para capacitar os clientes a lidar com desafios futuros. Com nosso compromisso com a excelência técnica e o serviço excepcional, garantimos a satisfação total de nossos clientes em todas as etapas.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contato"
                className="inline-flex items-center gap-3 rounded-full bg-[#FF8200] px-6 py-4 text-sm font-bold text-white transition-colors hover:bg-[#FF8200]/85"
              >
                Entrar em contato <span className="text-lg">→</span>
              </Link>
              <a
                href="https://api.whatsapp.com/send?phone=5505516982100266"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#24298D] px-6 py-4 text-sm font-bold text-[#24298D] transition-colors hover:bg-[#24298D] hover:text-white"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-[4px] bg-[#24298D] px-6 py-14 text-white lg:px-10 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          <article className="flex flex-col justify-between rounded-2xl bg-white/10 p-8 lg:p-10">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">
                Excelência Nanoquímica
              </p>
              <h2 className="text-3xl font-black leading-tight tracking-[-0.03em] sm:text-4xl">
                Certificações
              </h2>
              <p className="mt-4 text-base leading-7 text-white/80">
                Atuamos com todas as licenças, alvarás e certificações exigidas pelos órgãos reguladores para garantir total segurança, conformidade e qualidade no fornecimento de insumos químicos.
              </p>
            </div>
            <Link
              href="/certificacoes"
              className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-[#FF8200] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#FF8200]/85"
            >
              Saiba mais <span>→</span>
            </Link>
          </article>

          <article className="flex flex-col justify-between rounded-2xl bg-white/10 p-8 text-white lg:p-10">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">
                Conheça
              </p>
              <h2 className="text-3xl font-black leading-tight tracking-[-0.03em] sm:text-4xl">
                A Nanoquímica
              </h2>
              <p className="mt-4 text-base leading-7 text-white/80">
                Você que busca qualidade e variedade em produtos para sua indústria, aqui você encontra.
              </p>
            </div>
            <Link
              href="/empresa"
              className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-[#FF8200] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#FF8200]/85"
            >
              Saiba mais <span>→</span>
            </Link>
          </article>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
