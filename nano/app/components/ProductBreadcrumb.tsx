import SiteBreadcrumb from "./SiteBreadcrumb";

type ProductBreadcrumbProps = {
  category: string;
  categoryHref: string;
};

export default function ProductBreadcrumb({ category, categoryHref }: ProductBreadcrumbProps) {
  return <SiteBreadcrumb items={[
    { label: "Home", href: "/" },
    { label: "Produtos", href: "/solucoes" },
    { label: category, href: categoryHref },
  ]} />;
}
