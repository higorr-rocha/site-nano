import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ProductBreadcrumb from "../../../components/ProductBreadcrumb";
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

  const { title, image, descriptionImage } = product;
  const isNanophos = produto === "acido-fosforico-purificado-nanophos";
  const description = isNanophos
    ? "O Nanophós Purificado (Ácido Fosfórico Purificado) é um composto químico de extrema importância em diversas indústrias, sendo amplamente utilizado em aplicações que vão desde a produção de fertilizantes até a clarificação de açúcar. Neste conteúdo preparado pela Nanoquimica, apresentaremos informações essenciais sobre o Ácido Fosfórico Purificado, nosso NANOPHÓS PURIFICADO, abordando suas características, usos e relevância nos setores industriais."
    : "Solução desenvolvida para apoiar a eficiência, o controle e a qualidade dos processos de produção de açúcar.";

  return (
    <main className="min-h-screen bg-[#f7f9fc] pt-20 text-[#24298D]">
      <SiteHeader activePage="solucoes" />
      <ProductBreadcrumb category="Açúcar" categoryHref="/solucoes/acucar" />
      <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
        <Link href="/solucoes/acucar" className="text-sm font-bold text-[#FF8200] hover:text-[#24298D]">← Voltar para Açúcar</Link>
      </div>
      <ProductTitle title={title} />
      <ProductIntro title={title} description={description} image={isNanophos ? descriptionImage : image} />

      {isNanophos && (
        <div className="pb-14 lg:pb-20">
          <section className="bg-[#f1f2f5] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="mx-auto max-w-7xl">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">Características do</p>
              <h2 className="text-2xl font-black leading-tight tracking-[-0.03em] text-[#24298D] sm:text-3xl">
                Ácido Fosfórico Purificado
              </h2>
              <p className="mt-4 max-w-6xl text-justify text-sm leading-7 text-slate-600 sm:text-base">
                Neste conteúdo também vamos trazer as principais características do Nanophós Purificado (Ácido Fosfórico Purificado), um tipo específico de ácido fosfórico que passa por rigorosos processos de purificação, resultando em um produto de alta qualidade, livre de impurezas e contaminantes. Sua pureza é essencial para garantir o desempenho ideal nas aplicações em que é utilizado.
              </p>
            </div>
          </section>

          <section className="bg-[#24298D] px-4 py-12 text-white sm:px-6 lg:px-8 lg:py-16">
            <div className="mx-auto max-w-7xl">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">Aplicações e</p>
              <h2 className="text-2xl font-black leading-tight sm:text-3xl">Usos</h2>
              <div className="mt-7 grid gap-x-8 gap-y-7 text-justify text-xs leading-6 text-white/85 sm:text-sm md:grid-cols-3">
                {[
                  ["Indústria de fertilizantes:", "O Nanophós Purificado (Ácido Fosfórico Purificado) é um componente fundamental na produção de fertilizantes fosfatados. Sua capacidade de fornecer fósforo de maneira solúvel em água torna-o essencial para o crescimento saudável das plantas e aumento da produtividade agrícola."],
                  ["Clarificação de açúcar:", "Na indústria açucareira, o Nanophós Purificado (Ácido Fosfórico Purificado) é amplamente empregado na clarificação do caldo de cana, removendo impurezas e corantes, resultando em um açúcar de alta qualidade e pureza."],
                  ["Galvanoplastia (decapagem de metal):", "Nas usinas e indústrias que trabalham com metais, o ácido fosfórico é usado para realizar a decapagem, ou seja, a remoção de óxidos e impurezas das superfícies metálicas, preparando-as para processos de revestimento ou tratamentos posteriores."],
                  ["Indústria de couro:", "O Nanophós Purificado (Ácido Fosfórico Purificado) é empregado no processo de curtimento de couro, contribuindo para a remoção de resíduos e substâncias indesejadas, resultando em couro de qualidade superior."],
                  ["Biodiesel:", "Na produção de biodiesel, o ácido fosfórico é usado como catalisador em reações específicas de transesterificação, que transformam óleos vegetais em biodiesel."],
                ].map(([heading, text]) => (
                  <div key={heading}>
                    <h3 className="font-bold text-white underline">{heading}</h3>
                    <p className="mt-2">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8 lg:py-16">
            <Image src={descriptionImage} alt="Benefícios e diferenciais do Ácido Fosfórico Purificado" className="aspect-[655/538] w-full rounded-2xl object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">Benefícios e</p>
              <h2 className="text-2xl font-black leading-tight text-[#24298D] sm:text-3xl">diferenciais</h2>
              <div className="mt-4 space-y-4 text-justify text-sm leading-7 text-slate-600 sm:text-base">
                <p>Uma das principais vantagens do Nanophós Purificado (Ácido Fosfórico Purificado) é sua alta capacidade de clarificação, tornando-o especialmente adequado para aplicações que requerem um alto grau de pureza.</p>
                <p>Outro ponto relevante é sua versatilidade, pois atende às demandas de diversos segmentos industriais, desde a agricultura até a indústria em geral. Sua pureza e eficácia o colocam distante da categoria de produtos de qualidade inferior.</p>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl border-t border-slate-200 px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">Considerações</p>
            <h2 className="text-2xl font-black leading-tight text-[#24298D] sm:text-3xl">Finais</h2>
            <div className="mt-6 grid gap-7 text-justify text-sm leading-7 text-slate-600 sm:text-base lg:grid-cols-2">
              <div className="space-y-5">
                <p>O Nanophós Purificado (Ácido Fosfórico Purificado) é um componente essencial em muitos processos industriais, desempenhando um papel fundamental na clarificação, purificação e produção de diversos produtos. Sua relevância é evidente nos mercados de fertilizantes, açúcar, couro, alimentos e biodiesel, entre outros.</p>
                <p>Se você busca um produto de alta pureza e qualidade, capaz de atender às demandas de aplicações críticas, o Nanophós Purificado fornecido pela Nanoquímica é a escolha ideal.</p>
              </div>
              <div className="space-y-5">
                <p>Com experiência e excelência na produção química, a empresa oferece soluções confiáveis e eficientes para as indústrias que necessitam do melhor desempenho em seus processos.</p>
                <p>Conte com a Nanoquímica para obter o Ácido Fosfórico Purificado que sua empresa precisa. Entre em contato conosco e descubra como nossos produtos podem impulsionar o sucesso do seu negócio.</p>
              </div>
            </div>
          </section>
        </div>
      )}

      <SiteFooter />
    </main>
  );
}
