import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";

const socialLinks: { label: string; href: string; icon: IconType }[] = [
  { label: "Instagram", href: "https://www.instagram.com/nano.quimica", icon: FaInstagram },
  { label: "LinkedIn", href: "https://linkedin.com/company/nanoqu%C3%ADmica", icon: FaLinkedinIn },
  { label: "Facebook", href: "https://www.facebook.com/pensenanoquimica", icon: FaFacebookF },
  { label: "YouTube", href: "https://www.youtube.com/@nanoquímica", icon: FaYoutube },
];

const MAPS_URL = "https://www.google.com/maps?saddr=My+Location&daddr=Rua+Rua+Alexandre+Magnusson%2C+2100%0ADistrito+Industrial+%0APrad%C3%B3polis+SP.";

export default function SiteFooter() {
  return (
    <footer className="border-t-2 border-black bg-[#24298D] text-white">
      <div className="mx-auto max-w-6xl px-6 py-6 lg:px-10 lg:py-7">
        <div className="grid items-start gap-6 text-center sm:grid-cols-2 lg:grid-cols-4 sm:gap-8">
          <div id="localizacao" className="flex flex-col items-center">
            <h2 className="text-sm font-black uppercase tracking-[0.16em] text-[#FF8200]">
              Localização
            </h2>
            <address className="mt-3 max-w-xs not-italic text-sm leading-6 text-white/80">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[#FF8200] hover:underline"
              >
                Rua Alexandre Magnusson, 2100
                <br />
                Distrito Industrial Pradópolis SP
              </a>
            </address>
          </div>

          <div className="flex flex-col items-center">
            <h2 className="text-sm font-black uppercase tracking-[0.16em] text-[#FF8200]">
              Contato
            </h2>
            <div className="mt-3 flex flex-col items-center gap-1.5 text-sm leading-6">
              <a
                href="mailto:vendas@nanoquimica.com.br"
                className="w-fit text-white/80 transition-colors hover:text-[#FF8200]"
              >
                vendas@nanoquimica.com.br
              </a>
              <a
                href="tel:+551639811515"
                className="w-fit text-white/80 transition-colors hover:text-[#FF8200]"
              >
                +55 (16) 3981-1515
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h2 className="text-sm font-black uppercase tracking-[0.16em] text-[#FF8200]">
              Seções
            </h2>
            <div className="mx-auto mt-3 grid w-fit translate-x-3 grid-cols-2 gap-x-0 gap-y-1 text-left text-xs leading-5 sm:text-sm lg:translate-x-6">
              <Link href="/" className="text-white/80 transition-colors hover:text-[#FF8200]">
                Início
              </Link>
              <Link href="/certificacoes" className="text-white/80 transition-colors hover:text-[#FF8200]">
                Certificações
              </Link>
              <Link href="/empresa" className="text-white/80 transition-colors hover:text-[#FF8200]">
                Empresa
              </Link>
              <Link href="/novidades" className="text-white/80 transition-colors hover:text-[#FF8200]">
                Novidades
              </Link>
              <Link href="/solucoes" className="text-white/80 transition-colors hover:text-[#FF8200]">
                Soluções
              </Link>
              <Link href="/trabalhe-conosco" className="whitespace-nowrap text-white/80 transition-colors hover:text-[#FF8200]">
                Trabalhe Conosco
              </Link>
              <Link href="/contato" className="text-white/80 transition-colors hover:text-[#FF8200]">
                Contato
              </Link>
              <Link href="/politica-de-privacidade" className="text-white/80 transition-colors hover:text-[#FF8200]">
                Privacidade
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h2 className="text-sm font-black uppercase tracking-[0.16em] text-[#FF8200]">
              Redes
            </h2>
            <div className="mt-3 flex items-center justify-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Nanoquímica no ${social.label}`}
                  title={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:border-[#FF8200] hover:bg-[#FF8200] hover:text-white"
                >
                  <social.icon aria-hidden="true" className="h-4 w-4" />
                </a>
              ))}
            </div>
            <p className="mt-2.5 text-xs font-semibold text-white/75">
              Use Nano, a Nano resolve.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center gap-2 border-t border-white/20 pt-4 text-xs text-white/60 sm:flex-row sm:justify-center sm:gap-6">
          <p>© 2026 Nanoquímica. Soluções que movem a indústria.</p>
          <p>Ciência, parceria e conhecimento.</p>
        </div>
      </div>
    </footer>
  );
}
