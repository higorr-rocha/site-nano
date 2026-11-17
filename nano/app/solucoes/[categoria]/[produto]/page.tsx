import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductBreadcrumb from "../../../components/ProductBreadcrumb";
import ProductDetailSections from "../../../components/ProductDetailSections";
import ProductIntro from "../../../components/ProductIntro";
import ProductTitle from "../../../components/ProductTitle";
import SiteFooter from "../../../components/SiteFooter";
import SiteHeader from "../../../components/SiteHeader";
import { categories, productsByCategory } from "../../catalogo";

type ProductPageProps = {
  params: Promise<{ categoria: string; produto: string }>;
};

export function generateStaticParams() {
  const paramsList: { categoria: string; produto: string }[] = [];
  for (const cat of categories) {
    const products = productsByCategory[cat.slug] || [];
    for (const prod of products) {
      paramsList.push({
        categoria: cat.slug,
        produto: prod.slug,
      });
    }
  }
  return paramsList;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { categoria, produto } = await params;
  const cat = categories.find(({ slug }) => slug === categoria);
  const prod = productsByCategory[categoria]?.find(({ slug }) => slug === produto);

  if (!cat || !prod) {
    return { title: "Produto | Nanoquímica" };
  }

  const description =
    prod.details.introParagraphs[0]?.slice(0, 160) ||
    `${prod.title} — Soluções químicas Nanoquímica para ${cat.title}.`;

  return {
    title: `${prod.title} | ${cat.title} | Nanoquímica`,
    description,
    openGraph: {
      title: `${prod.title} | Nanoquímica`,
      description,
      type: "article",
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { categoria, produto } = await params;
  const cat = categories.find(({ slug }) => slug === categoria);
  const product = productsByCategory[categoria]?.find(
    ({ slug }) => slug === produto
  );

  if (!cat || !product) {
    notFound();
  }

  const { title, image, secondaryImage, details } = product;

  return (
    <main className="min-h-screen bg-[#f5f2eb] pt-20 text-[#24298D]">
      <SiteHeader activePage="solucoes" />
      <ProductBreadcrumb
        category={cat.title}
        categoryHref={`/solucoes/${cat.slug}`}
      />
      <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
        <Link
          href={`/solucoes/${cat.slug}`}
          className="text-sm font-bold text-[#FF8200] hover:text-[#24298D]"
        >
          ← Voltar para {cat.title}
        </Link>
      </div>
      <ProductTitle title={title} />
      <ProductIntro
        title={title}
        paragraphs={details.introParagraphs}
        introHeading={details.introHeading}
        ctaText={details.ctaText}
        image={image}
      />
      <ProductDetailSections
        title={title}
        secondaryImage={secondaryImage}
        details={details}
      />
      <SiteFooter />
    </main>
  );
}
