import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type SiteBreadcrumbProps = {
  items: BreadcrumbItem[];
};

export default function SiteBreadcrumb({ items }: SiteBreadcrumbProps) {
  return (
    <section className="border-b border-slate-200 bg-white px-4 py-2 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] text-slate-500 sm:text-xs">
          {items.map((item, index) => (
            <span key={item.label} className="flex items-center gap-x-1.5">
              {index > 0 && <span aria-hidden="true" className="text-slate-400">›</span>}
              {item.href ? <Link href={item.href} className="hover:text-[#FF8200]">{item.label}</Link> : <span className="font-bold">{item.label}</span>}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}
