import Image from "next/image";
import Link from "next/link";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import industriaImage from "../../images/list-industria.webp";

export const metadata = { title: "Soluções para indústria | Nanoquímica" };

export default function IndustriaPage() {
  return (
    <main className="min-h-screen bg-[#f7f9fc] pt-20 text-[#24298D]">
      <SiteHeader activePage="solucoes" />
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:px-10 lg:py-24">
        <div>
          <Link href="/solucoes" className="font-bold text-[#FF8200]">← Soluções</Link>
          <p className="mb-4 mt-10 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">Categoria</p>
          <h1 className="text-5xl font-black tracking-[-0.04em] sm:text-6xl">Indústria</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Estamos organizando o catálogo de soluções para indústria. Em breve, você encontrará aqui os produtos e detalhes técnicos da categoria.
          </p>
        </div>
        <Image src={industriaImage} alt="Soluções para indústria" className="w-full rounded-2xl" />
      </section>
      <SiteFooter />
    </main>
  );
}
