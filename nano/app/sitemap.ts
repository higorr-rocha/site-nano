import type { MetadataRoute } from "next";
import { categories, productsByCategory } from "./solucoes/catalogo";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://site-nano.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/empresa`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/solucoes`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/certificacoes`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/novidades`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    {
      url: `${BASE_URL}/novidades/curiosidades-sobre-o-acido-fosforico-purificado`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    { url: `${BASE_URL}/trabalhe-conosco`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/contato`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${BASE_URL}/politica-de-privacidade`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/solucoes/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const productRoutes: MetadataRoute.Sitemap = categories.flatMap((cat) =>
    (productsByCategory[cat.slug] || []).map((prod) => ({
      url: `${BASE_URL}/solucoes/${cat.slug}/${prod.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }))
  );

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
