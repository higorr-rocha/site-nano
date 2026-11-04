import Image from "next/image";
import Link from "next/link";
import acucarAcido from "../../images/produtos/acucar/acido-fosforico-purificado-bloco-1.webp";
import acucarDescriptionImage from "../../images/produtos/acucar/descricao/produto_a_1.webp";
import ProductTitle from "../../components/ProductTitle";
import SiteBreadcrumb from "../../components/SiteBreadcrumb";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";

export const metadata = {
  title: "Curiosidades sobre o ácido fosfórico purificado | Nanoquímica",
  description:
    "Confira algumas curiosidades a respeito do ácido fosfórico purificado (NanoPhós Purificado) na clarificação do caldo.",
};

const faqs = [
  {
    question: "1. O QUE É O NANOPHÓS, OU ÁCIDO FOSFÓRICO PURIFICADO?",
    answer:
      "Trata-se de um composto químico submetido a rigorosos processos de purificação, assegurando alta qualidade e ausência de contaminantes para várias utilizações industriais, como a fabricação de açúcar.",
  },
  {
    question: "2. QUAL É O PAPEL ESPECÍFICO DO NANOPHÓS NA CLARIFICAÇÃO DO CALDO?",
    answer:
      "O Nanophós funciona como um agente de precipitação. Ele reage para produzir fosfato de cálcio, que aglomera e remove impurezas orgânicas e corantes, assegurando um líquido mais limpo antes da evaporação.",
  },
  {
    question: "3. QUAL É A VANTAGEM DO NANOPHÓS EM COMPARAÇÃO COM OUTROS ÁCIDOS FOSFÓRICOS?",
    answer:
      "O NanoPhós é notável por sua elevada pureza e eficácia, o que o torna particularmente apropriado para usos que exigem um alto nível de pureza, como na indústria alimentícia (açúcar).",
  },
];

export default function CuriosidadesAcidoFosforicoPage() {
  return (
    <main className="min-h-screen bg-[#f5f2eb] pt-20 text-[#24298D]">
      <SiteHeader activePage="novidades" />
      <SiteBreadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Novidades", href: "/novidades" },
          { label: "Curiosidades sobre o ácido fosfórico purificado" },
        ]}
      />
      <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
        <Link href="/novidades" className="text-sm font-bold text-[#FF8200] hover:text-[#24298D]">
          ← Voltar para Novidades
        </Link>
      </div>

      <ProductTitle title="Curiosidades sobre o ácido fosfórico purificado" />

      <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-16">
        <div className="flex flex-col justify-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">
            Ácido Fosfórico Purificado na Clarificação do Caldo
          </p>
          <h2 className="text-2xl font-black leading-tight tracking-[-0.04em] text-[#24298D] sm:text-3xl">
            Eficiência para o Açúcar de Alta Qualidade
          </h2>
          <div className="mt-4 space-y-4 text-justify text-sm leading-7 text-slate-600 sm:text-base">
            <p>
              No setor sucroenergético, a procura por açúcar de alta pureza e a melhoria da eficiência operacional são desafios permanentes. A etapa de clarificação do caldo de cana é fundamental para eliminar impurezas e corantes, e o êxito desse processo depende da qualidade dos insumos utilizados.
            </p>
            <p>
              Um componente essencial desse processo é o NanoPhós Purificado, nome comercial do Ácido Fosfórico Purificado produzido pela Nanoquímica, que proporciona a pureza necessária para um desempenho ideal.
            </p>
            <p>
              Compreenda de que maneira a clarificação do caldo com NanoPhós Purificado (ácido fosfórico purificado) melhora a qualidade e a produtividade da sua usina.
            </p>
          </div>
        </div>
        <div className="relative aspect-[655/538] w-full overflow-hidden rounded-2xl shadow-[0_12px_35px_rgba(36,41,141,0.08)]">
          <Image
            src={acucarAcido}
            alt="Ácido Fosfórico Purificado na Clarificação do Caldo"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 55vw, 100vw"
          />
        </div>
      </section>

      <div className="pb-14 lg:pb-20">
        <section className="bg-[#ede9df] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">
              Importância na Clarificação
            </p>
            <h2 className="text-2xl font-black leading-tight tracking-[-0.03em] text-[#24298D] sm:text-3xl">
              Por que usar ácido fosfórico purificado na clarificação?
            </h2>
            <div className="mt-4 max-w-6xl space-y-4 text-justify text-sm leading-7 text-slate-600 sm:text-base">
              <p>
                O produto final é diretamente afetado pela qualidade do agente clarificante. O NanoPhós Purificado é submetido a processos de purificação rigorosos, o que resulta em um produto de alta qualidade, isento de impurezas e contaminantes. Essa pureza é essencial para prevenir a contaminação do caldo por elementos indesejados.
              </p>
              <p>
                Na indústria açucareira, utiliza-se amplamente o NanoPhós Purificado para a clarificação do caldo, devido à sua capacidade de:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong>Remoção de impurezas:</strong> Ele limpa o caldo, removendo as partículas suspensas e as impurezas mais finas que prejudicam a pureza e a cor do açúcar.
                </li>
                <li>
                  <strong>Reduzir Corantes:</strong> Contribui para a diminuição da coloração do caldo, gerando um produto mais claro e puro.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-[#24298D] px-4 py-12 text-white sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">
              Diferenciais de Processo
            </p>
            <h2 className="text-2xl font-black leading-tight sm:text-3xl">
              Benefícios na qualidade do açúcar e na estabilidade do processo
            </h2>
            <div className="mt-7 grid gap-x-8 gap-y-7 text-justify text-xs leading-6 text-white/85 sm:text-sm md:grid-cols-3">
              <div>
                <h3 className="font-bold text-white underline">Qualidade do Açúcar:</h3>
                <p className="mt-2">
                  O produto final é um açúcar de alta pureza e qualidade, resultado da remoção eficaz de corantes e impurezas.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-white underline">Eficiência e Estabilidade:</h3>
                <p className="mt-2">
                  Aprimora o processo de sedimentação, tornando-o mais ágil e confiável, o que ajuda a aumentar a vazão operacional.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-white underline">Consistência:</h3>
                <p className="mt-2">
                  Pureza e eficácia do NanoPhós asseguram um desempenho superior e confiável para aplicações críticas, levando a uma padronização da qualidade.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8 lg:py-16">
          <div className="relative aspect-[655/538] w-full overflow-hidden rounded-2xl shadow-[0_12px_35px_rgba(36,41,141,0.08)]">
            <Image
              src={acucarDescriptionImage}
              alt="Etapas do processo de clarificação com NanoPhós"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">
              Etapas do processo
            </p>
            <h2 className="text-2xl font-black leading-tight text-[#24298D] sm:text-3xl">
              Onde o ácido agrega mais valor
            </h2>
            <div className="mt-4 space-y-4 text-justify text-sm leading-7 text-slate-600 sm:text-base">
              <p>
                A floculação é otimizada com o uso do NanoPhós Purificado. A adição de leite de cal geralmente estimula a formação de fosfato de cálcio. Sua função é limpar o caldo, transformando as impurezas (tanto orgânicas quanto inorgânicas) em flocos que podem ser facilmente removidos.
              </p>
              <p>
                Essa reação otimiza a separação, assegurando uma elevada capacidade de clarificação do produto. É nesse estágio do processo que o NanoPhós assegura a base para uma sedimentação ou flotação eficaz, reduzindo perdas e aumentando a pureza.
              </p>
              <h3 className="pt-2 text-lg font-black text-[#24298D]">
                Segurança empregada — Boas práticas de manuseio e armazenagem
              </h3>
              <p>
                A segurança e a preservação da qualidade do insumo são essenciais. Para assegurar a eficácia do NanoPhós Purificado em seu processo, é fundamental cumprir as normas de segurança: consulte sempre a Ficha de Segurança (FDS) disponibilizada pela Nanoquímica. O produto deve ser manipulado com os EPIs apropriados. Armazene-o em um local seco, fresco e ventilado, a fim de preservar a integridade do NanoPhós e manter sua pureza e eficácia no processo de clarificação.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl border-t border-slate-300 px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#FF8200]">
            Dúvidas Técnicas
          </p>
          <h2 className="text-2xl font-black leading-tight text-[#24298D] sm:text-3xl">
            Perguntas frequentes do setor sucroenergético
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-2xl bg-[#FAF8F3] p-6 shadow-[0_12px_35px_rgba(36,41,141,0.06)]">
                <h3 className="text-sm font-black text-[#24298D]">{faq.question}</h3>
                <p className="mt-3 text-justify text-sm leading-6 text-slate-600">{faq.answer}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-[#24298D] p-8 text-white">
            <p className="text-sm leading-7 text-white/90 sm:text-base">
              O NanoPhós Purificado da Nanoquímica vai além de um simples componente; é um aliado estratégico para as usinas que almejam excelência em qualidade e eficiência. Sua elevada pureza e eficácia o tornam a opção perfeita para aplicações críticas, como a clarificação do caldo. Aproveite a experiência e a excelência da Nanoquímica para adquirir o NanoPhós Purificado, que irá clarificar o caldo e impulsionar o sucesso do seu negócio.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/solucoes/acucar/acido-fosforico-purificado-nanophos"
                className="inline-flex items-center gap-2 rounded-full bg-[#FF8200] px-6 py-3 text-sm font-bold text-white hover:bg-[#FF8200]/85"
              >
                Ver página do produto NanoPhós <span>→</span>
              </Link>
              <Link
                href="/contato"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-bold text-white hover:bg-white/10"
              >
                Entrar em contato
              </Link>
            </div>
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
