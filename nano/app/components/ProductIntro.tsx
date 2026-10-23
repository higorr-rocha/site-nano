import Image, { type StaticImageData } from "next/image";

type ProductIntroProps = {
  title: string;
  description: string;
  image: StaticImageData;
};

export default function ProductIntro({ title, description, image }: ProductIntroProps) {
  return (
    <section className="mx-auto grid max-w-7xl items-stretch gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-16">
      <div className="flex flex-col">
        <h2 className="text-2xl font-black leading-tight tracking-[-0.04em] text-[#24298D] sm:text-3xl">
          Aplicações, benefícios e mercado
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-6 text-justify text-slate-600 sm:text-base sm:leading-7">{description}</p>
        <div className="mt-10 max-w-xl">
          <h2 className="text-xl font-black text-[#24298D]">Tem interesse?</h2>
          <p className="mt-3 text-sm leading-6 text-justify text-slate-600 sm:text-base">
            Fale com um de nossos especialistas para sanar todas as suas dúvidas sobre nossos produtos e solicite um orçamento.
          </p>
          <a
            href={`mailto:contato@nanoquimica.com.br?subject=Orçamento - ${encodeURIComponent(title)}`}
            className="mt-5 inline-flex rounded-full bg-[#FF8200] px-5 py-3 text-sm font-bold text-white hover:bg-[#FF8200]/85"
          >
            Orçamento
          </a>
        </div>
      </div>
      <div className="relative aspect-[655/538] overflow-hidden rounded-2xl">
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
