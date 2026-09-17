import { readFile, writeFile, mkdir } from "fs/promises"
import path from "path"
import { blogPosts } from "@/app/blog/data"
import { blogPosts as blogPostsEn } from "@/app/en/blog/data"
import { allProjects } from "@/app/trabajos/data"
import { initialTestimonials, Testimonial } from "@/app/testimonials/data"

export type BlogPost = (typeof blogPosts)[number]
export type Project = (typeof allProjects)[number]
export { type Testimonial }

export type StorageData = {
  blogPosts: BlogPost[]
  blogPostsEn?: BlogPost[]
  projects: Project[]
  blogCategories: string[]
  projectCategories: string[]
  testimonials: Testimonial[]
}

const getStoragePath = () => {
  const dir = process.env.STORAGE_DIR || process.cwd()
  return path.join(dir, "data-storage.json")
}
const fallbackStoragePath = () => path.join(process.cwd(), "data-storage.json")

const buildSeedData = (): StorageData => ({
  blogPosts,
  blogPostsEn: blogPostsEn || [],
  projects: allProjects,
  blogCategories: Array.from(new Set(blogPosts.map((item) => item.category))),
  projectCategories: Array.from(new Set(allProjects.map((item) => item.categoryLabel))),
  testimonials: initialTestimonials,
})

const parseDate = (value?: string) => {
  if (!value) return null
  const [day, month, year] = value.split(".")
  if (!day || !month || !year) return null
  return new Date(Number(year), Number(month) - 1, Number(day))
}

const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()
  return `${day}.${month}.${year}`
}

const addDays = (date: Date, days: number) => new Date(date.getTime() + days * 24 * 60 * 60 * 1000)

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate())

const hasCustomContent = (post: BlogPost) => {
  const raw = post.contentRaw
  if (!raw) return false
  return Object.values(raw).some((value) => typeof value === "string" && value.trim().length > 0)
}

const buildExpandedContent = (post: BlogPost) => {
  const category = post.category || "Negocio digital"
  const profiles: Record<
    string,
    {
      focus: string
      channels: string[]
      metrics: string[]
      risks: string[]
      tools: string[]
    }
  > = {
    "E-commerce": {
      focus: "conversiones, logística y medios de pago locales",
      channels: ["Tienda propia", "Marketplaces", "WhatsApp Business", "Email marketing"],
      metrics: ["tasa de conversión", "ticket promedio", "CAC", "recompra"],
      risks: ["catálogos desordenados", "checkout lento", "falta de medios de pago locales"],
      tools: ["Tiendanube", "WooCommerce", "Mercado Pago", "Meta Ads"],
    },
    "Marketing digital": {
      focus: "adquisición, automatización y optimización de campañas",
      channels: ["Google Ads", "Meta Ads", "Email automation", "SEO"],
      metrics: ["ROAS", "CTR", "CPL", "tasa de conversión"],
      risks: ["segmentación amplia", "creativos sin test", "landing sin propuesta clara"],
      tools: ["Google Ads", "Meta Business Suite", "HubSpot", "Mailchimp"],
    },
    SEO: {
      focus: "visibilidad orgánica y autoridad de marca",
      channels: ["Contenido", "Optimización técnica", "Link building", "SEO local"],
      metrics: ["posiciones", "tráfico orgánico", "CTR orgánico", "visitas locales"],
      risks: ["contenido sin intención", "sitio lento", "errores de indexación"],
      tools: ["Search Console", "GA4", "Ahrefs", "Screaming Frog"],
    },
    "Desarrollo web": {
      focus: "experiencia de usuario, performance y escalabilidad",
      channels: ["UX/UI", "Optimización técnica", "Contenido", "Analítica"],
      metrics: ["Core Web Vitals", "tiempo de carga", "tasa de rebote", "conversiones"],
      risks: ["arquitectura confusa", "contenido pobre", "código sin optimizar"],
      tools: ["Next.js", "Figma", "Lighthouse", "Vercel"],
    },
    "Agentes IA": {
      focus: "automatización y eficiencia operativa",
      channels: ["Atención al cliente", "Soporte interno", "Ventas", "Postventa"],
      metrics: ["tiempo de respuesta", "resolución", "satisfacción", "ahorro de costos"],
      risks: ["flujos mal definidos", "datos desactualizados", "sin supervisión"],
      tools: ["WhatsApp API", "OpenAI", "CRM", "Zapier"],
    },
    Apps: {
      focus: "retención de usuarios y experiencia móvil",
      channels: ["iOS", "Android", "PWA", "Notificaciones push"],
      metrics: ["retención", "engagement", "instalaciones", "sesiones"],
      risks: ["onboarding confuso", "latencia", "pocas actualizaciones"],
      tools: ["React Native", "Flutter", "Firebase", "Expo"],
    },
  }

  const profile = profiles[category] ?? {
    focus: "estrategia digital y crecimiento sostenido",
    channels: ["Contenido", "Publicidad", "Optimización", "Automatización"],
    metrics: ["conversión", "retención", "tráfico", "ingresos"],
    risks: ["falta de foco", "medición débil", "propuesta confusa"],
    tools: ["Analytics", "CRM", "Email marketing", "SEO técnico"],
  }

  return [
    {
      heading: "Introducción",
      paragraphs: [
        post.description,
        `En este artículo repasamos cómo abordar ${post.title.toLowerCase()} con foco en ${category.toLowerCase()}, priorizando ${profile.focus} para empresas de todo el mundo.`,
      ],
    },
    {
      heading: "Panorama y contexto global",
      paragraphs: [
        "El comportamiento de los usuarios a nivel global exige claridad en precios, medios de pago confiables y tiempos de respuesta rápidos.",
        "Alinear mensaje, propuesta y experiencia evita fricciones y mejora la captación de clientes desde el primer contacto.",
      ],
      bullets: [
        "Preferencias de pago según el mercado",
        "Expectativas de respuesta en WhatsApp",
        "Competencia creciente en canales digitales",
      ],
    },
    {
      heading: "Estrategia paso a paso",
      paragraphs: [
        "Ordenar el plan por impacto facilita ejecutar primero lo que genera ventas o leads.",
        "Cada etapa debe medirse con indicadores simples para ajustar rápido.",
      ],
      bullets: [
        "Definir objetivo y audiencia ideal",
        "Optimizar la propuesta y el mensaje principal",
        "Implementar canales de adquisición",
        "Medir y ajustar semanalmente",
      ],
    },
    {
      heading: "Canales y tácticas recomendadas",
      paragraphs: [
        "Elegí los canales que mejor convierten según tu tipo de negocio y presupuesto disponible.",
      ],
      bullets: profile.channels,
    },
    {
      heading: "Herramientas y recursos clave",
      paragraphs: [
        "Apoyarte en herramientas probadas reduce tiempos de implementación y mejora la calidad del resultado.",
      ],
      bullets: profile.tools,
    },
    {
      heading: "Métricas para seguir el rendimiento",
      paragraphs: [
        "Sin medición no hay optimización. Definí un panel simple y revisalo cada semana.",
      ],
      bullets: profile.metrics,
    },
    {
      heading: "Errores comunes a evitar",
      paragraphs: [
        "Los resultados se frenan cuando se ejecuta sin foco o sin control de calidad.",
      ],
      bullets: profile.risks,
    },
    {
      heading: "Checklist de implementación",
      bullets: [
        "Definir propuesta y mensaje principal",
        "Configurar medición con eventos clave",
        "Optimizar velocidad y experiencia móvil",
        "Validar embudos de conversión",
        "Crear un calendario de contenido",
      ],
    },
    {
      heading: "Conclusión",
      paragraphs: [
        `Aplicar una estrategia clara para ${post.title.toLowerCase()} mejora el crecimiento y la previsibilidad del negocio.`,
        "Si necesitás acelerar resultados, podés combinar optimización técnica, contenido y campañas para ganar tracción más rápido.",
      ],
    },
  ]
}

const normalizeBlogPosts = (posts: BlogPost[]) => {
  const baseDate = startOfDay(new Date())
  const unscheduled = posts.filter((post) => !post.publishedAt)
  const ordered = [...unscheduled].sort((a, b) => {
    const dateA = parseDate(a.date)?.getTime() ?? 0
    const dateB = parseDate(b.date)?.getTime() ?? 0
    return dateA - dateB
  })
  const scheduleMap = new Map<number, string>()
  ordered.forEach((post, index) => {
    scheduleMap.set(post.id, formatDate(addDays(baseDate, index * 4)))
  })

  return posts.map((post) => {
    const shouldGenerate = !post.contentGenerated && !hasCustomContent(post)
    const scheduledDate = post.publishedAt || scheduleMap.get(post.id)
    return {
      ...post,
      publishedAt: scheduledDate,
      content: shouldGenerate ? buildExpandedContent(post) : post.content,
      contentGenerated: shouldGenerate ? true : post.contentGenerated,
    }
  })
}

const normalizeStorage = async (data: StorageData) => {
  const normalizedPosts = normalizeBlogPosts(data.blogPosts)
  const next: StorageData = {
    ...data,
    blogPosts: normalizedPosts,
  }
  if (JSON.stringify(next) !== JSON.stringify(data)) {
    await safeWrite(getStoragePath(), JSON.stringify(next, null, 2))
  }
  return next
}

const safeWrite = async (filePath: string, content: string) => {
  try {
    await mkdir(path.dirname(filePath), { recursive: true })
    await writeFile(filePath, content, "utf-8")
  } catch {
    // If persistent dir fails, fall back to project directory
    const fallback = fallbackStoragePath()
    if (filePath !== fallback) {
      await writeFile(fallback, content, "utf-8")
    }
  }
}

export const readStorage = async (): Promise<StorageData> => {
  const storagePath = getStoragePath()
  try {
    const raw = await readFile(storagePath, "utf-8")
    const data = JSON.parse(raw) as StorageData
    return await normalizeStorage(data)
  } catch {
    // If persistent path fails, also try fallback
    const fallback = fallbackStoragePath()
    if (storagePath !== fallback) {
      try {
        const raw = await readFile(fallback, "utf-8")
        const data = JSON.parse(raw) as StorageData
        return await normalizeStorage(data)
      } catch { /* continue to seed */ }
    }
    const seed = buildSeedData()
    await safeWrite(storagePath, JSON.stringify(seed, null, 2))
    return await normalizeStorage(seed)
  }
}

export const writeStorage = async (data: StorageData) => {
  const storagePath = getStoragePath()
  await safeWrite(storagePath, JSON.stringify(data, null, 2))
}
