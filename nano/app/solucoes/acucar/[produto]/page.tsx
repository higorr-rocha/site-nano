import { notFound } from "next/navigation";
import Link from "next/link";
import ProductBreadcrumb from "../../../components/ProductBreadcrumb";
import ProductDetailSections from "../../../components/ProductDetailSections";
import ProductIntro from "../../../components/ProductIntro";
import ProductTitle from "../../../components/ProductTitle";
import SiteFooter from "../../../components/SiteFooter";
import SiteHeader from "../../../components/SiteHeader";
import { productsByCategory } from "../../catalogo";

type ProductPageProps = {
  params: Promise<{ produto: string }>;
};

export function generateStaticParams() {
  return productsByCategory.acucar.map(({ slug: produto }) => ({ produto }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { produto } = await params;
  const product = productsByCategory.acucar.find(({ slug }) => slug === produto);

  if (!product) notFound();

  const { title, image, secondaryImage, details } = product;

  return (
    <main className="min-h-screen bg-[#f5f2eb] pt-20 text-[#24298D]">
      <SiteHeader activePage="solucoes" />
      <ProductBreadcrumb category="Açúcar" categoryHref="/solucoes/acucar" />
      <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
        <Link href="/solucoes/acucar" className="text-sm font-bold text-[#FF8200] hover:text-[#24298D]">
          ← Voltar para Açúcar
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
