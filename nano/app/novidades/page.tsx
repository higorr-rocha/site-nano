import Image from "next/image";
import Link from "next/link";
import acucarAcido from "../images/produtos/acucar/acido-fosforico-purificado-bloco-1.webp";
import SiteBreadcrumb from "../components/SiteBreadcrumb";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata = {
  title: "Novidades | Nanoquímica",
  description: "Fique por dentro das novidades e conteúdos técnicos com a Nanoquímica.",
};

export default function NovidadesPage() {
  return (
    <main className="min-h-screen bg-[#f5f2eb] pt-20 text-[#24298D]">
      <SiteHeader activePage="novidades" />
      <SiteBreadcrumb items={[{ label: "Home", href: "/" }, { label: "Novidades" }]} />

      <section className="bg-[#24298D] px-6 py-12 text-white lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#FF8200]">
            Fique por dentro com a Nanoquímica
          </p>
          <h1 className="text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
            Novidades
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/80">
            Artigos técnicos, curiosidades e inovações em produtos químicos para o setor sucroenergético e industrial.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <article className="grid items-center gap-10 overflow-hidden rounded-2xl bg-[#FAF8F3] p-6 shadow-[0_16px_50px_rgba(36,41,141,0.08)] sm:p-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative aspect-[655/538] w-full overflow-hidden rounded-2xl bg-[#24298D]/10">
            <Image
              src={acucarAcido}
              alt="Curiosidades sobre o ácido fosfórico purificado"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">
              Artigo Técnico • Setor Sucroenergético
            </p>
            <h2 className="text-2xl font-black leading-tight tracking-[-0.03em] text-[#24298D] sm:text-3xl">
              Curiosidades sobre o ácido fosfórico purificado
            </h2>
            <p className="mt-4 text-justify text-sm leading-7 text-slate-600 sm:text-base">
              Confira algumas curiosidades a respeito do ácido fosfórico purificado e compreenda de que maneira a clarificação do caldo com NanoPhós Purificado melhora a qualidade e a produtividade da sua usina.
            </p>
            <Link
              href="/novidades/curiosidades-sobre-o-acido-fosforico-purificado"
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#FF8200] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#FF8200]/85"
            >
              VER MAIS <span>→</span>
            </Link>
          </div>
        </article>
      </section>

      <SiteFooter />
    </main>
  );
}
