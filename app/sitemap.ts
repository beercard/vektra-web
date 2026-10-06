import type { MetadataRoute } from "next"
import { allProjects } from "./trabajos/data"

const baseUrl = "https://vektra.digital"

export default function sitemap(): MetadataRoute.Sitemap {
  // Rutas principales con prioridad alta
  const mainRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/trabajos`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/precios`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sobre-nosotros`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]

  // Páginas de servicios individuales (ES)
  const serviceRoutes: MetadataRoute.Sitemap = [
    "/servicios/diseno-web",
    "/servicios/tienda-online",
    "/servicios/marketing-digital",
    "/servicios/seo",
    "/servicios/apps",
    "/servicios/agentes-ia",
    "/servicios/diseno-ui-ux",
    "/servicios/automatizacion",
    "/servicios/mantenimiento-web",
    "/servicios/soporte-tecnico",
    "/servicios/erp",
    "/servicios/crm",
    "/servicios/alquileres",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  // Herramientas
  const toolRoutes: MetadataRoute.Sitemap = [
    "/herramientas/calculadora-ads",
    "/herramientas/calculadora-roi",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  // Páginas legales
  const legalRoutes: MetadataRoute.Sitemap = [
    "/politica-de-privacidad",
    "/politica-de-cookies",
    "/aviso-legal",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }))

  // Versión en inglés - principales
  const enMainRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ]

  // Versión en inglés - servicios
  const enServiceRoutes: MetadataRoute.Sitemap = [
    "/en/services/web-design",
    "/en/services/online-store",
    "/en/services/digital-marketing",
    "/en/services/seo",
    "/en/services/apps",
    "/en/services/ai-agents",
    "/en/services/ui-ux-design",
    "/en/services/automation",
    "/en/services/web-maintenance",
    "/en/services/technical-support",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  // Herramientas EN
  const enToolRoutes: MetadataRoute.Sitemap = [
    "/en/tools/ads-calculator",
    "/en/tools/roi-calculator",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }))

  // Proyectos dinámicos
  const projectEntries: MetadataRoute.Sitemap = allProjects.map((project) => ({
    url: `${baseUrl}/trabajos/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [
    ...mainRoutes,
    ...serviceRoutes,
    ...toolRoutes,
    ...legalRoutes,
    ...enMainRoutes,
    ...enServiceRoutes,
    ...enToolRoutes,
    ...projectEntries,
  ]
}
