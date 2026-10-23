import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ProductBreadcrumb from "../../../components/ProductBreadcrumb";
import ProductIntro from "../../../components/ProductIntro";
import ProductTitle from "../../../components/ProductTitle";
import SiteFooter from "../../../components/SiteFooter";
import SiteHeader from "../../../components/SiteHeader";
import { productsByCategory } from "../../catalogo";

type ProductPageProps = { params: Promise<{ produto: string }> };

export function generateStaticParams() {
  return productsByCategory.industria.map(({ slug: produto }) => ({ produto }));
}

export default async function IndustriaProductPage({ params }: ProductPageProps) {
  const { produto } = await params;
  const product = productsByCategory.industria.find(({ slug }) => slug === produto);
  if (!product) notFound();

  const { title, image, descriptionImage } = product;
  const isFirstProduct = produto === "acido-fosforico-purificado-nanophos";

  return (
    <main className="min-h-screen bg-[#f7f9fc] pt-20 text-[#24298D]">
      <SiteHeader activePage="solucoes" />
      <ProductBreadcrumb category="Indústria" categoryHref="/solucoes/industria" />
      <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
        <Link href="/solucoes/industria" className="text-sm font-bold text-[#FF8200] hover:text-[#24298D]">← Voltar para Indústria</Link>
      </div>
      <ProductTitle title={title} />
      <ProductIntro title={title} description="Solução química para apoiar a eficiência, a segurança e a qualidade dos processos industriais." image={isFirstProduct ? descriptionImage : image} />
      {isFirstProduct && (
        <div className="mx-auto max-w-7xl space-y-12 px-4 pb-14 text-justify sm:px-6 lg:px-8 lg:pb-20">
        <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">Características e aplicações</p>
            <h2 className="text-2xl font-black sm:text-3xl">Ácido Fosfórico Purificado</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">O Nanophós Purificado é um composto químico de alta pureza utilizado em diferentes processos industriais. Sua qualidade e versatilidade apoiam aplicações que exigem controle, clarificação e desempenho consistente.</p>
          </div>
          <Image src={descriptionImage} alt={`Descrição de ${title}`} className="aspect-[655/538] w-full rounded-2xl object-cover" sizes="(min-width: 1024px) 40vw, 100vw" />
        </section>
        <section className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Image src={descriptionImage} alt={`Benefícios de ${title}`} className="aspect-[655/538] w-full rounded-2xl object-cover" sizes="(min-width: 1024px) 40vw, 100vw" />
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">Benefícios</p>
            <h2 className="text-2xl font-black sm:text-3xl">Pureza e versatilidade</h2>
            <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">A alta pureza e a versatilidade do produto apoiam diferentes segmentos industriais, oferecendo desempenho consistente em aplicações que exigem qualidade e controle.</p>
          </div>
        </section>
        </div>
      )}
      <SiteFooter />
    </main>
  );
}
