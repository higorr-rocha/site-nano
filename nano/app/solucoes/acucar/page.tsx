import Image from "next/image";
import Link from "next/link";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import { productImage, sugarProducts } from "../catalogo";

export const metadata = {
  title: "Soluções para açúcar | Nanoquímica",
  description: "Produtos Nanoquímica para a produção de açúcar.",
};

export default function AcucarPage() {
  return (
    <main className="min-h-screen bg-[#f7f9fc] pt-20 text-[#24298D]">
      <SiteHeader activePage="solucoes" />
      <section className="bg-[#24298D] px-6 py-14 text-white lg:px-10 lg:py-18">
        <div className="mx-auto max-w-7xl">
          <Link href="/solucoes" className="text-sm font-bold text-[#FF8200] hover:text-white">← Soluções</Link>
          <p className="mb-4 mt-8 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">Categoria</p>
          <h1 className="text-5xl font-black tracking-[-0.04em] sm:text-6xl">Açúcar</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">
            Produtos para apoiar o controle, a eficiência e a qualidade do processo produtivo.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sugarProducts.map(([slug, title]) => (
            <Link key={slug} href={`/solucoes/acucar/${slug}`} className="group overflow-hidden rounded-2xl bg-white shadow-[0_12px_35px_rgba(36,41,141,0.08)]">
              <div className="relative aspect-[7/5] overflow-hidden bg-[#24298D]/10">
                <Image
                  src={productImage}
                  alt={title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h2 className="text-lg font-bold leading-7">{title}</h2>
                <span className="mt-4 inline-flex font-bold text-[#FF8200]">Ver produto →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
