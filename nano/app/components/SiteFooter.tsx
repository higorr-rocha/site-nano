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

export default function SiteFooter() {
  return (
    <footer className="bg-[#24298D] text-white">
      <div className="mx-auto max-w-5xl px-6 py-8 lg:px-10 lg:py-10">
        <div className="grid gap-8 text-center sm:grid-cols-3 sm:gap-10">
          <div id="localizacao">
            <h2 className="text-sm font-black uppercase tracking-[0.16em] text-[#FF8200]">
              Localização
            </h2>
            <address className="mx-auto mt-5 max-w-xs not-italic text-sm leading-7 text-white/80">
              Rua Alexandre Magnusson, 2100
              <br />
              Distrito Industrial Pradópolis SP
            </address>
          </div>

          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.16em] text-[#FF8200]">
              Contato
            </h2>
            <div className="mt-5 flex flex-col items-center gap-3 text-sm leading-6">
              <a
                href="mailto:contato@nanoquimica.com.br"
                className="w-fit text-white/80 transition-colors hover:text-[#FF8200]"
              >
                contato@nanoquimica.com.br
              </a>
              <a
                href="tel:+551639811515"
                className="w-fit text-white/80 transition-colors hover:text-[#FF8200]"
              >
                +55 (16) 3981-1515
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.16em] text-[#FF8200]">
              Redes
            </h2>
            <div className="mt-5 flex items-center justify-center gap-3">
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
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 border-t border-white/20 pt-5 text-xs text-white/60 sm:flex-row sm:justify-center sm:gap-6">
          <p>© 2026 Nanoquímica. Soluções que movem a indústria.</p>
          <p>Ciência, parceria e conhecimento.</p>
        </div>
      </div>
    </footer>
  );
}
