import Image from "next/image";
import type { IconType } from "react-icons";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa6";
import capa from "./images/capa.png";
import logo from "./images/logo.png";

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

const socialLinks: { label: string; href: string; icon: IconType }[] = [
  { label: "Instagram", href: "https://www.instagram.com/nano.quimica/", icon: FaInstagram },
  { label: "LinkedIn", href: "https://linkedin.com/company/nanoqu%C3%ADmica", icon: FaLinkedinIn },
  /*{ label: "WhatsApp", href: "https://wa.me/", icon: FaWhatsapp },*/
  { label: "Facebook", href: "https://www.facebook.com/", icon: FaFacebookF },
  { label: "YouTube", href: "https://www.youtube.com/@nanoqu%C3%ADmica", icon: FaYoutube },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#f7f9fc] text-[#09246f]">
      <header className="relative z-20 border-b border-slate-200 bg-white shadow-[0_4px_20px_rgba(9,36,111,0.08)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <a href="#" className="flex items-center gap-2" aria-label="Nanoquímica - início">
            <span className="relative h-12 w-48 overflow-hidden" aria-hidden="true">
              <Image
                src={logo}
                alt=""
                width={245}
                height={245}
                className="absolute left-[-27px] top-[-103px] max-w-none"
              />
            </span>
          </a>

          <nav className="hidden items-center gap-9 text-sm font-semibold md:flex">
            <a className="transition-colors hover:text-[#ff7b0b]" href="#">Início</a>
            <a className="transition-colors hover:text-[#ff7b0b]" href="#empresa">Empresa</a>
            <a className="transition-colors hover:text-[#ff7b0b]" href="#solucoes">Produtos</a>
            <a className="transition-colors hover:text-[#ff7b0b]" href="#contato">Serviços</a>
            <a className="transition-colors hover:text-[#ff7b0b]" href="#contato">Logística</a>
            <a className="transition-colors hover:text-[#ff7b0b]" href="#contato">Canais</a>
            <a className="transition-colors hover:text-[#ff7b0b]" href="#contato">Contato</a>
          </nav>

          <a
            href="#contato"
            className="rounded-full bg-[#09246f] px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition-transform hover:scale-105"
          >
            Fale conosco
          </a>
        </div>
      </header>

      <section className="relative isolate aspect-[1920/780] w-full bg-[#d8e8fa]">
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
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#ff7b0b]">Sobre a Nanoquímica</p>
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
          <a href="#solucoes" className="inline-flex items-center gap-3 font-bold text-[#09246f] hover:text-[#ff7b0b]">
            Conheça nossa atuação <span className="text-2xl">→</span>
          </a>
        </div>
      </section>

      <section id="solucoes" className="bg-[#09246f] px-6 py-20 text-white lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#ff8a1b]">Como podemos ajudar</p>
              <h2 className="max-w-xl text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
                Soluções para cada etapa da sua operação.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-blue-100">
              Tecnologia e suporte para diferentes segmentos da indústria.
            </p>
          </div>

          <div className="grid gap-3 rounded-2xl bg-blue-300/30 p-1 md:grid-cols-3">
            {solutions.map((solution) => (
              <div key={solution.number} className="group relative min-h-72">
                <article className="absolute inset-0 bg-[#12337f] p-8">
                  <span className="text-5xl font-black leading-none text-[#ff9b43]">{solution.number}</span>
                  <h3 className="mt-12 text-2xl font-bold">{solution.title}</h3>
                </article>

                <article className="absolute inset-0 z-10 flex translate-y-3 scale-95 flex-col bg-[#ff7b0b] p-8 opacity-0 shadow-2xl transition-all duration-300 group-hover:translate-y-[-14px] group-hover:scale-105 group-hover:opacity-100">
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
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#ff7b0b]">Vamos conversar</p>
          <h2 className="max-w-2xl text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
            Conte com a Nanoquímica para encontrar a melhor solução.
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-[0_16px_50px_rgba(9,36,111,0.08)]">
          <p className="text-lg font-semibold text-[#09246f]">Fale com o nosso time técnico</p>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Tire dúvidas, solicite uma proposta ou descubra a solução ideal para o seu processo.
          </p>
          <a
            href="mailto:contato@nanoquimica.com.br"
            className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#ff7b0b] px-6 py-4 font-bold text-white transition-colors hover:bg-[#e76700]"
          >
            Entrar em contato <span className="ml-3 text-xl">→</span>
          </a>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p className="font-semibold text-[#09246f]">NANOQUÍMICA</p>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Nanoquímica no ${social.label}`}
                title={social.label}
                className="text-[#ff7b0b] transition-transform hover:scale-110 hover:text-[#09246f]"
              >
                <social.icon aria-hidden="true" className="h-5 w-5" />
              </a>
            ))}
          </div>
          <p>© 2026 Nanoquímica. Soluções que movem a indústria.</p>
        </div>
      </footer>
    </main>
  );
}
