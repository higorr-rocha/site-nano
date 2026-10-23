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
  return productsByCategory.etanol.map(({ slug: produto }) => ({ produto }));
}

export default async function EtanolProductPage({ params }: ProductPageProps) {
  const { produto } = await params;
  const product = productsByCategory.etanol.find(({ slug }) => slug === produto);
  if (!product) notFound();

  const { title, image, descriptionImage } = product;
  const isFirstProduct = produto === "anti-incrustante-de-coluna";

  return (
    <main className="min-h-screen bg-[#f7f9fc] pt-20 text-[#24298D]">
      <SiteHeader activePage="solucoes" />
      <ProductBreadcrumb category="Etanol" categoryHref="/solucoes/etanol" />
      <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
        <Link href="/solucoes/etanol" className="text-sm font-bold text-[#FF8200] hover:text-[#24298D]">← Voltar para Etanol</Link>
      </div>
      <ProductTitle title={title} />
      <ProductIntro title={title} description="Solução desenvolvida para apoiar a eficiência, o controle e a qualidade dos processos de produção de etanol." image={isFirstProduct ? descriptionImage : image} />
      {isFirstProduct && (
        <div className="mx-auto max-w-7xl space-y-12 px-4 pb-14 text-justify sm:px-6 lg:px-8 lg:pb-20">
        <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">Características e aplicações</p>
            <h2 className="text-2xl font-black sm:text-3xl">Anti-incrustante de coluna</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">Produto desenvolvido para auxiliar no controle da formação de incrustações em colunas e equipamentos do processo de produção de etanol. Sua aplicação contribui para preservar a eficiência operacional, reduzir paradas e manter a qualidade do processo.</p>
          </div>
          <Image src={descriptionImage} alt={`Descrição de ${title}`} className="aspect-[655/538] w-full rounded-2xl object-cover" sizes="(min-width: 1024px) 40vw, 100vw" />
        </section>
        <section className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Image src={descriptionImage} alt={`Benefícios de ${title}`} className="aspect-[655/538] w-full rounded-2xl object-cover" sizes="(min-width: 1024px) 40vw, 100vw" />
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">Benefícios</p>
            <h2 className="text-2xl font-black sm:text-3xl">Mais eficiência no processo</h2>
            <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">O uso adequado do anti-incrustante contribui para manter a operação estável e reduzir a necessidade de intervenções, apoiando ganhos de eficiência e maior disponibilidade dos equipamentos.</p>
          </div>
        </section>
        </div>
      )}
      <SiteFooter />
    </main>
  );
}
