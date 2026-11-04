import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

type ProductIntroProps = {
  title: string;
  paragraphs: string[];
  image: StaticImageData;
  introHeading?: string;
  ctaText?: string;
};

export default function ProductIntro({
  title,
  paragraphs,
  image,
  introHeading = "Aplicações, benefícios e mercado",
  ctaText = "Fale com um de nossos especialistas para sanar todas as suas dúvidas sobre nossos produtos e solicite um orçamento.",
}: ProductIntroProps) {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-16">
      <div className="flex flex-col justify-center">
        <h2 className="text-2xl font-black leading-tight tracking-[-0.04em] text-[#24298D] sm:text-3xl">
          {introHeading}
        </h2>
        <div className="mt-4 max-w-xl space-y-4 text-justify text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
          {paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
        <div className="mt-10 max-w-xl">
          <h2 className="text-xl font-black text-[#24298D]">Tem interesse?</h2>
          <p className="mt-3 text-justify text-sm leading-6 text-slate-600 sm:text-base">
            {ctaText}
          </p>
          <Link
            href="/contato"
            className="mt-5 inline-flex rounded-full bg-[#FF8200] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#FF8200]/85"
          >
            Orçamento
          </Link>
        </div>
      </div>
      <div className="relative aspect-[655/538] w-full overflow-hidden rounded-2xl shadow-[0_12px_35px_rgba(36,41,141,0.08)]">
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 1024px) 55vw, 100vw"
        />
      </div>
    </section>
  );
}
