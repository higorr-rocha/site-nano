import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "../../../components/SiteFooter";
import SiteHeader from "../../../components/SiteHeader";
import { detailImage, sugarProducts } from "../../catalogo";

type ProductPageProps = {
  params: Promise<{ produto: string }>;
};

export function generateStaticParams() {
  return sugarProducts.map(([produto]) => ({ produto }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { produto } = await params;
  const product = sugarProducts.find(([slug]) => slug === produto);

  if (!product) notFound();

  const [, title] = product;

  return (
    <main className="min-h-screen bg-[#f7f9fc] pt-20 text-[#24298D]">
      <SiteHeader activePage="solucoes" />
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-24">
        <div>
          <Link href="/solucoes/acucar" className="font-bold text-[#FF8200]">← Produtos de açúcar</Link>
          <p className="mb-4 mt-10 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">Produto</p>
          <h1 className="text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">{title}</h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Solução desenvolvida para apoiar a eficiência e a qualidade dos processos da indústria. Consulte nossa equipe técnica para conhecer a aplicação ideal e as especificações deste produto.
          </p>
          <a
            href="mailto:contato@nanoquimica.com.br"
            className="mt-8 inline-flex rounded-full bg-[#FF8200] px-6 py-4 font-bold text-white hover:bg-[#FF8200]/85"
          >
            Falar com a equipe
          </a>
        </div>
        <Image src={detailImage} alt={title} priority className="w-full rounded-2xl" />
      </section>
      <SiteFooter />
    </main>
  );
}
