import Image, { type StaticImageData } from "next/image";
import type { ProductDetailContent } from "../solucoes/catalogo";

type ProductDetailSectionsProps = {
  title: string;
  secondaryImage?: StaticImageData;
  details: ProductDetailContent;
};

export default function ProductDetailSections({
  title,
  secondaryImage,
  details,
}: ProductDetailSectionsProps) {
  return (
    <div className="pb-14 lg:pb-20">
      {details.featuresTitle && (
        <section className="bg-[#ede9df] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-black leading-tight tracking-[-0.03em] text-[#24298D] sm:text-3xl">
              {details.featuresTitle}
            </h2>
            {details.featuresParagraphs && (
              <div className="mt-4 max-w-6xl space-y-4 text-justify text-sm leading-7 text-slate-600 sm:text-base">
                {details.featuresParagraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            )}
            {details.featuresBullets && (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600 sm:text-base">
                {details.featuresBullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {details.gridTitle && details.gridItems && (
        <section className="bg-[#24298D] px-4 py-12 text-white sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-black leading-tight sm:text-3xl">
              {details.gridTitle}
            </h2>
            {details.gridIntro && (
              <p className="mt-3 text-sm leading-6 text-white/85 sm:text-base">
                {details.gridIntro}
              </p>
            )}
            <div
              className={`mt-7 grid gap-x-8 gap-y-7 text-justify text-xs leading-6 text-white/85 sm:text-sm ${
                details.gridItems.length === 1
                  ? "md:grid-cols-1"
                  : details.gridItems.length === 2 || details.gridItems.length === 4
                  ? "md:grid-cols-2"
                  : "md:grid-cols-3"
              }`}
            >
              {details.gridItems.map(([heading, text]) => (
                <div key={heading}>
                  <h3 className="font-bold text-white underline">{heading}</h3>
                  {text && <p className="mt-2">{text}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {details.highlightTitle && (
        secondaryImage ? (
          <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8 lg:py-16">
            <div className="relative aspect-[655/538] w-full overflow-hidden rounded-2xl shadow-[0_12px_35px_rgba(36,41,141,0.08)]">
              <Image
                src={secondaryImage}
                alt={`${details.highlightTitle} - ${title}`}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            <div>
              <h2 className="text-2xl font-black leading-tight text-[#24298D] sm:text-3xl">
                {details.highlightTitle}
              </h2>
              {details.highlightParagraphs && (
                <div className="mt-4 space-y-4 text-justify text-sm leading-7 text-slate-600 sm:text-base">
                  {details.highlightParagraphs.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              )}
            </div>
          </section>
        ) : (
          <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <h2 className="text-2xl font-black leading-tight text-[#24298D] sm:text-3xl">
              {details.highlightTitle}
            </h2>
            {details.highlightParagraphs && (
              <div className="mt-4 max-w-6xl space-y-4 text-justify text-sm leading-7 text-slate-600 sm:text-base">
                {details.highlightParagraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            )}
            {details.highlightItems && (
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {details.highlightItems.map(([heading, text]) => (
                  <div key={heading} className="rounded-2xl bg-white p-6 shadow-[0_8px_25px_rgba(36,41,141,0.06)]">
                    <h3 className="font-bold text-[#24298D]">{heading}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )
      )}

      {details.conclusionTitle && (
        <section className="mx-auto max-w-7xl border-t border-slate-200 px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
          <h2 className="text-2xl font-black leading-tight text-[#24298D] sm:text-3xl">
            {details.conclusionTitle}
          </h2>
          <div className="mt-6 grid gap-7 text-justify text-sm leading-7 text-slate-600 sm:text-base lg:grid-cols-2">
            <div className="space-y-5">
              {(details.conclusionLeft || []).map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            <div className="space-y-5">
              {(details.conclusionRight || []).map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
