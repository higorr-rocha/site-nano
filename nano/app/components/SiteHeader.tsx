import Image from "next/image";
import Link from "next/link";
import logo from "../images/logo.png";

type SiteHeaderProps = {
  activePage?: "home" | "empresa";
};

const navItems = [
  { label: "Início", href: "/", page: "home" as const },
  { label: "Empresa", href: "/empresa", page: "empresa" as const },
  { label: "Produtos", href: "/#solucoes" },
  { label: "Serviços", href: "/#contato" },
  { label: "Logística", href: "/#contato" },
  { label: "Canais", href: "/#contato" },
  { label: "Contato", href: "/#contato" },
];

export default function SiteHeader({ activePage }: SiteHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white shadow-[0_4px_20px_rgba(36,41,141,0.08)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex h-12 items-center gap-2" aria-label="Nanoquímica - início">
          <span className="relative flex h-12 w-48 items-center overflow-hidden" aria-hidden="true">
            <Image
              src={logo}
              alt=""
              width={245}
              height={245}
              className="absolute left-[-27px] top-[-95px] max-w-none"
            />
          </span>
        </Link>

        <nav className="hidden h-12 items-center gap-9 text-sm font-semibold md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              className={
                item.page && item.page === activePage
                  ? "text-[#FF8200]"
                  : "transition-colors hover:text-[#FF8200]"
              }
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#contato"
          className="rounded-full bg-[#24298D] px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition-transform hover:scale-105"
        >
          Fale conosco
        </Link>
      </div>
    </header>
  );
}
