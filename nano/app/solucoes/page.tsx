import Image from "next/image";
import Link from "next/link";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import SiteBreadcrumb from "../components/SiteBreadcrumb";
import { categories } from "./catalogo";

export const metadata = {
  title: "Soluções | Nanoquímica",
  description: "Conheça as soluções da Nanoquímica para açúcar, etanol e indústria.",
};

export default function SolucoesPage() {
  return (
    <main className="min-h-screen bg-[#f5f2eb] pt-20 text-[#24298D]">
      <SiteHeader activePage="solucoes" />
      <SiteBreadcrumb items={[{ label: "Home", href: "/" }, { label: "Produtos" }]} />
      <section className="bg-[#24298D] px-6 py-8 text-white lg:px-10 lg:py-10">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#FF8200]">Nosso catálogo</p>
          <h1 className="text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl lg:whitespace-nowrap">
            Soluções para cada etapa da sua operação.
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-16 lg:grid-cols-3 lg:px-10 lg:py-24">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/solucoes/${category.slug}`}
            className="group overflow-hidden rounded-2xl bg-white shadow-[0_16px_50px_rgba(36,41,141,0.08)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[#24298D]/10">
              <Image
                src={category.image}
                alt={`Soluções para ${category.title}`}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-7">
              <h2 className="text-2xl font-bold">{category.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{category.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-bold text-[#FF8200]">
                Conheça as soluções <span className="text-xl">→</span>
              </span>
            </div>
          </Link>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
