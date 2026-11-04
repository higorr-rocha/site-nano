import Image from "next/image";
import Link from "next/link";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import SiteBreadcrumb from "../../components/SiteBreadcrumb";
import { productsByCategory } from "../catalogo";

export const metadata = { title: "Soluções para indústria | Nanoquímica" };

export default function IndustriaPage() {
  return (
    <main className="min-h-screen bg-[#f5f2eb] pt-20 text-[#24298D]">
      <SiteHeader activePage="solucoes" />
      <SiteBreadcrumb items={[{ label: "Home", href: "/" }, { label: "Produtos", href: "/solucoes" }, { label: "Indústria" }]} />
      <section className="bg-[#24298D] px-6 py-7 text-white lg:px-10 lg:py-10">
        <div className="mx-auto max-w-7xl">
          <Link href="/solucoes" className="text-sm font-bold text-[#FF8200] hover:text-white">← Voltar para produtos</Link>
          <div className="text-center">
            <p className="mb-2 mt-4 text-xs font-bold uppercase tracking-[0.2em] text-[#FF8200]">Categoria</p>
            <h1 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">Indústria</h1>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {productsByCategory.industria.map(({ slug, title, image }) => (
            <Link key={slug} href={`/solucoes/industria/${slug}`} className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_12px_35px_rgba(36,41,141,0.08)]">
              <div className="relative aspect-[700/480] overflow-hidden bg-[#24298D]/10">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-5">
                <h2 className="text-base font-bold leading-6">{title}</h2>
                <span className="mt-3 inline-flex text-sm font-bold text-[#FF8200]">Ver produto →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
