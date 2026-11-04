import ContactFormBlock from "../components/ContactFormBlock";
import SiteBreadcrumb from "../components/SiteBreadcrumb";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata = {
  title: "Fale Conosco | Nanoquímica",
  description:
    "Fale com especialistas da Nanoquímica, empresa especializada em produtos químicos para o setor sucroenergético.",
};

export default function ContatoPage() {
  return (
    <main className="min-h-screen bg-[#f5f2eb] pt-20 text-[#24298D]">
      <SiteHeader activePage="contato" />
      <SiteBreadcrumb items={[{ label: "Home", href: "/" }, { label: "Contato" }]} />

      <section className="bg-[#24298D] px-6 py-8 text-white lg:px-10 lg:py-10">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl">
            Contato
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <ContactFormBlock />
      </section>

      <SiteFooter />
    </main>
  );
}
