"use client"

import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n"
import { blogPosts, blogPostsEn } from "../blog/data"
import { allProjects } from "../trabajos/data"
import { initialTestimonials, Testimonial } from "../testimonials/data"

const ADMIN_SESSION_KEY = "vektra-admin-session"
const ADMIN_CREDENTIALS = {
  username: "vektradm",
  password: "bio1994S.",
}

type BlogContentSection = {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
  image?: string
}

type BlogPost = {
  id: number
  title: string
  description: string
  category: string
  date: string
  publishedAt?: string
  image: string
  hasImageTop: boolean
  slug: string
  categories: string[]
  content: BlogContentSection[]
  gallery?: string[]
  seoTitle?: string
  seoDescription?: string
  keywords?: string[]
  contentRaw?: {
    intro?: string
    introImage?: string
    considerations?: string
    considerationsImage?: string
    strategy?: string
    strategyImage?: string
    bestPractices?: string
    bestPracticesImage?: string
    errors?: string
    errorsImage?: string
    conclusion?: string
    conclusionImage?: string
  }
}

type Project = {
  id: number
  title: string
  category: string
  categoryLabel: string
  date: string
  description: string
  image: string
  slug: string
  gallery?: string[]
  client?: string
  views?: number
  searchVolume?: number
  autoSearchVolume?: boolean
  website?: {
    label: string
    url: string
  }
}

type SectionKey =
  | "overview"
  | "blog-list"
  | "blog-new"
  | "blog-categories"
  | "projects-list"
  | "projects-new"
  | "projects-categories"
  | "testimonials-list"
  | "testimonials-new"

const buildContent = (title: string, category: string, description: string): BlogContentSection[] => [
  {
    heading: "Introducción",
    paragraphs: [
      description,
      `En este artículo exploramos los puntos clave de ${title.toLowerCase()} con foco en ${category.toLowerCase()}, para que puedas aplicar estrategias efectivas sin importar en qué país te encuentres.`,
    ],
  },
  {
    heading: "Qué necesitas considerar",
    paragraphs: [
      "Definí objetivos claros, el público ideal y la propuesta de valor antes de elegir herramientas o canales.",
      "Evaluá presupuesto, tiempos y recursos internos para priorizar acciones con impacto real.",
    ],
    bullets: [
      "Objetivos medibles y alineados al negocio",
      "Investigación de keywords y demanda",
      "Experiencia del usuario y velocidad",
      "Medición con analítica confiable",
    ],
  },
  {
    heading: "Estrategia paso a paso",
    paragraphs: [
      "Ordená las acciones por impacto y velocidad de implementación para lograr resultados sostenibles.",
      "Medí cada etapa con indicadores simples y ajustá el plan según los datos.",
    ],
    bullets: [
      "Diagnóstico del punto de partida",
      "Definición de propuesta y audiencia",
      "Optimización técnica y contenido",
      "Distribución en canales clave",
    ],
  },
  {
    heading: "Buenas prácticas recomendadas",
    paragraphs: [
      "La consistencia en el contenido y el rendimiento técnico son clave para competir en mercados locales.",
      "Integrar SEO on-page, UX y automatización mejora conversiones y reduce costos.",
    ],
  },
  {
    heading: "Errores comunes a evitar",
    paragraphs: [
      "Invertir en acciones aisladas sin una estrategia global reduce el retorno y frena el crecimiento.",
      "Publicar sin análisis previo de la demanda o sin un plan de medición termina generando esfuerzo sin resultados.",
    ],
  },
  {
    heading: "Conclusión",
    paragraphs: [
      "Aplicar una estrategia sólida en cada etapa del embudo aumenta la visibilidad y la captación de clientes.",
      "Si querés acelerar resultados, podés combinar contenido, publicidad y optimización técnica en un mismo plan.",
    ],
  },
]

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")

const formatCategoryLabel = (value: string) =>
  value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())

const loadStorage = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") {
    return fallback
  }

  const stored = window.localStorage.getItem(key)
  if (!stored) {
    return fallback
  }

  try {
    return JSON.parse(stored)
  } catch {
    return fallback
  }
}

const toParagraphs = (value?: string) =>
  value
    ? value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean)
    : []

const buildCustomContent = (form: {
  title: string
  category: string
  description: string
  intro?: string
  introImage?: string
  considerations?: string
  considerationsImage?: string
  strategy?: string
  strategyImage?: string
  bestPractices?: string
  bestPracticesImage?: string
  errors?: string
  errorsImage?: string
  conclusion?: string
  conclusionImage?: string
}) => {
  const sections: BlogContentSection[] = []

  const introText = form.intro || form.description
  if (introText || form.introImage) {
    sections.push({ heading: "Introducción", paragraphs: toParagraphs(introText), image: form.introImage })
  }

  if (form.considerations || form.considerationsImage) {
    sections.push({ heading: "Qué necesitas considerar", paragraphs: toParagraphs(form.considerations), image: form.considerationsImage })
  }

  if (form.strategy || form.strategyImage) {
    sections.push({ heading: "Estrategia paso a paso", paragraphs: toParagraphs(form.strategy), image: form.strategyImage })
  }

  if (form.bestPractices || form.bestPracticesImage) {
    sections.push({ heading: "Buenas prácticas recomendadas", paragraphs: toParagraphs(form.bestPractices), image: form.bestPracticesImage })
  }

  if (form.errors || form.errorsImage) {
    sections.push({ heading: "Errores comunes a evitar", paragraphs: toParagraphs(form.errors), image: form.errorsImage })
  }

  if (form.conclusion || form.conclusionImage) {
    sections.push({ heading: "Conclusión", paragraphs: toParagraphs(form.conclusion), image: form.conclusionImage })
  }

  return sections.length > 0 ? sections : buildContent(form.title, form.category, form.description)
}

const formatDateForInput = (dateStr: string) => {
  if (!dateStr) return ""
  // dd.mm.yyyy -> yyyy-mm-dd
  const parts = dateStr.split(".")
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`
  }
  return dateStr
}

const formatDateFromInput = (dateStr: string) => {
  if (!dateStr) return ""
  // yyyy-mm-dd -> dd.mm.yyyy
  const parts = dateStr.split("-")
  if (parts.length === 3) {
    return `${parts[2]}.${parts[1]}.${parts[0]}`
  }
  return dateStr
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => loadStorage<boolean>(ADMIN_SESSION_KEY, false)
  )
  const [authForm, setAuthForm] = useState({ username: "", password: "" })

  const [authError, setAuthError] = useState("")
  const [uploadFeedback, setUploadFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [activeSection, setActiveSection] = useState<SectionKey>("overview")
  const { language } = useLanguage()
  const blogLanguage = language as "es" | "en"
  const [blogItems, setBlogItems] = useState<BlogPost[]>(blogPosts)
  const [blogItemsEn, setBlogItemsEn] = useState<BlogPost[]>(blogPostsEn)
  const [projectItems, setProjectItems] = useState<Project[]>(allProjects)
  const [editingBlogId, setEditingBlogId] = useState<number | null>(null)
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null)
  const [blogCategoryItems, setBlogCategoryItems] = useState<string[]>(
    Array.from(new Set(blogPosts.map((item) => item.category)))
  )
  const [projectCategoryItems, setProjectCategoryItems] = useState<string[]>(
    Array.from(new Set(allProjects.map((item) => item.categoryLabel)))
  )
  const [blogCategoryDraft, setBlogCategoryDraft] = useState("")
  const [projectCategoryDraft, setProjectCategoryDraft] = useState("")
  
  const [testimonialItems, setTestimonialItems] = useState<Testimonial[]>(initialTestimonials)
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null)
  const [testimonialForm, setTestimonialForm] = useState<Omit<Testimonial, "id">>({
    name: "",
    role: "",
    company: "",
    content: "",
    image: "",
    projectId: "",
    category: "diseno-web",
    language: "es",
  })

  const [blogForm, setBlogForm] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    publishedAt: "",
    image: "",
    hasImageTop: true,
    categories: "",
    seoTitle: "",
    seoDescription: "",
    keywords: "",
    intro: "",
    introImage: "",
    considerations: "",
    considerationsImage: "",
    strategy: "",
    strategyImage: "",
    bestPractices: "",
    bestPracticesImage: "",
    errors: "",
    errorsImage: "",
    conclusion: "",
    conclusionImage: "",
    galleryFiles: [] as string[],
    targetLanguage: "es" as "es" | "en",
  })

  const [projectForm, setProjectForm] = useState({
    title: "",
    category: "",
    categoryLabel: "",
    date: "",
    description: "",
    image: "",
    client: "",
    searchVolume: "",
    autoSearchVolume: false,
    websiteLabel: "",
    websiteUrl: "",
    galleryUrls: "",
    galleryFiles: [] as string[],
  })

  const blogCategories = useMemo(
    () => Array.from(new Set(blogItems.map((item) => item.category))),
    [blogItems]
  )

  const projectCategories = useMemo(
    () => Array.from(new Set(projectItems.map((item) => item.category))),
    [projectItems]
  )

  const navItems = useMemo(
    () => [
      { id: "overview", label: "Resumen" },
      {
        id: "blog",
        label: "Blog",
        children: [
          { id: "blog-list", label: "Entradas" },
          { id: "blog-new", label: "Nueva entrada" },
          { id: "blog-categories", label: "Categorías" },
        ],
      },
      {
        id: "projects",
        label: "Trabajos",
        children: [
          { id: "projects-list", label: "Proyectos" },
          { id: "projects-new", label: "Nuevo proyecto" },
          { id: "projects-categories", label: "Categorías" },
        ],
      },
      {
        id: "testimonials",
        label: "Testimonios",
        children: [
          { id: "testimonials-list", label: "Listado" },
          { id: "testimonials-new", label: "Nuevo testimonio" },
        ],
      },
    ],
    []
  )

  const dashboardStats = useMemo(
    () => [
      { label: "Artículos", value: blogItems.length },
      { label: "Categorías blog", value: blogCategories.length },
      { label: "Proyectos", value: projectItems.length },
      { label: "Categorías trabajos", value: projectCategories.length },
      { label: "Testimonios", value: testimonialItems.length },
    ],
    [blogItems.length, blogCategories.length, projectItems.length, projectCategories.length, testimonialItems.length]
  )

  const persistContent = async (payload: {
    blogPosts: BlogPost[]
    blogPostsEn: BlogPost[]
    projects: Project[]
    blogCategories: string[]
    projectCategories: string[]
    testimonials: Testimonial[]
  }) => {
    try {
      await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    } catch {
      return
    }
  }

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch("/api/admin/content")
        if (!response.ok) return
        const data = await response.json()
        if (data?.blogPosts?.length || data?.projects?.length) {
          setBlogItems(Array.isArray(data.blogPosts) ? data.blogPosts : blogPosts)
          setBlogItemsEn(Array.isArray(data.blogPostsEn) ? data.blogPostsEn : blogPostsEn)
          setProjectItems(Array.isArray(data.projects) ? data.projects : allProjects)
          setTestimonialItems(Array.isArray(data.testimonials) ? data.testimonials : initialTestimonials)
          setBlogCategoryItems(
            Array.isArray(data.blogCategories) && data.blogCategories.length
              ? data.blogCategories
              : Array.from(new Set(blogPosts.map((item) => item.category)))
          )
          setProjectCategoryItems(
            Array.isArray(data.projectCategories) && data.projectCategories.length
              ? data.projectCategories
              : Array.from(new Set(allProjects.map((item) => item.categoryLabel)))
          )
          return
        }
        const seed = {
          blogPosts,
          blogPostsEn,
          projects: allProjects,
          blogCategories: Array.from(new Set(blogPosts.map((item) => item.category))),
          projectCategories: Array.from(new Set(allProjects.map((item) => item.categoryLabel))),
          testimonials: initialTestimonials,
        }
        setBlogItems(seed.blogPosts)
        setBlogItemsEn(seed.blogPostsEn)
        setProjectItems(seed.projects)
        setBlogCategoryItems(seed.blogCategories)
        setProjectCategoryItems(seed.projectCategories)
        setTestimonialItems(seed.testimonials)
        await persistContent(seed)
      } catch {
        return
      }
    }

    loadContent()
  }, [])

  const uploadImages = async (files: File[]) => {
    if (!files.length) return []
    setUploadFeedback(null)
    const collected: string[] = []
    const allErrors: string[] = []
    for (const file of files) {
      const formData = new FormData()
      formData.append("files", file)
      try {
        const response = await fetch("/api/admin/uploads", {
          method: "POST",
          body: formData,
        })
        const data = (await response.json()) as { urls?: string[]; errors?: string[]; error?: string }
        if (!response.ok) {
          allErrors.push(data?.error ?? `Error al subir "${file.name}"`)
          continue
        }
        if (Array.isArray(data?.errors)) {
          allErrors.push(...data.errors)
        }
        if (Array.isArray(data?.urls)) {
          collected.push(...data.urls)
        }
      } catch {
        allErrors.push(`Error de red al subir "${file.name}"`)
      }
    }
    if (allErrors.length) {
      setUploadFeedback({ type: "error", message: allErrors.join(". ") })
    } else if (collected.length) {
      setUploadFeedback({ type: "success", message: `${collected.length} imagen(es) subida(s) correctamente` })
      setTimeout(() => setUploadFeedback(null), 4000)
    }
    return collected
  }

  const handleGalleryUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    const fileList = Array.from(files)
    const nextUrls = await uploadImages(fileList)
    if (nextUrls.length === 0) return
    setProjectForm((prev) => ({ ...prev, galleryFiles: [...prev.galleryFiles, ...nextUrls] }))
  }

  const handleBlogGalleryUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    const fileList = Array.from(files)
    const nextUrls = await uploadImages(fileList)
    if (nextUrls.length === 0) return
    setBlogForm((prev) => ({ ...prev, galleryFiles: [...prev.galleryFiles, ...nextUrls] }))
  }

  const handleBlogImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    const nextUrls = await uploadImages([files[0]])
    if (!nextUrls[0]) return
    setBlogForm((prev) => ({ ...prev, image: nextUrls[0] }))
  }

  const handleProjectImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    const nextUrls = await uploadImages([files[0]])
    if (!nextUrls[0]) return
    setProjectForm((prev) => ({ ...prev, image: nextUrls[0] }))
  }

  const handleSectionImageUpload = async (files: FileList | null, section: string) => {
    if (!files || files.length === 0) return
    const nextUrls = await uploadImages([files[0]])
    if (!nextUrls[0]) return
    setBlogForm((prev) => ({ ...prev, [`${section}Image`]: nextUrls[0] }))
  }

  const handleTestimonialImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    const nextUrls = await uploadImages([files[0]])
    if (!nextUrls[0]) return
    setTestimonialForm((prev) => ({ ...prev, image: nextUrls[0] }))
  }

  const handleTestimonialSubmit = () => {
    if (!testimonialForm.name || !testimonialForm.content || !testimonialForm.category) {
      return
    }

    const payload: Testimonial = {
      id: editingTestimonialId ?? crypto.randomUUID(),
      ...testimonialForm,
    }

    const nextItems = editingTestimonialId
      ? testimonialItems.map((item) => (item.id === editingTestimonialId ? payload : item))
      : [payload, ...testimonialItems]

    setTestimonialItems(nextItems)
    persistContent({
      blogPosts: blogItems,
      blogPostsEn: blogItemsEn,
      projects: projectItems,
      blogCategories: blogCategoryItems,
      projectCategories: projectCategoryItems,
      testimonials: nextItems,
    })
    setEditingTestimonialId(null)
    setTestimonialForm({
      name: "",
      role: "",
      company: "",
      content: "",
      image: "",
      projectId: "",
      category: "diseno-web",
      language: "es",
    })
    setActiveSection("testimonials-list")
  }

  const handleEditTestimonial = (item: Testimonial) => {
    setEditingTestimonialId(item.id)
    setTestimonialForm({
      name: item.name,
      role: item.role,
      company: item.company || "",
      content: item.content,
      image: item.image,
      projectId: item.projectId ?? "",
      category: item.category,
      language: item.language,
    })
    setActiveSection("testimonials-new")
  }

  const handleDeleteTestimonial = (id: string) => {
    const nextItems = testimonialItems.filter((item) => item.id !== id)
    setTestimonialItems(nextItems)
    persistContent({
      blogPosts: blogItems,
      blogPostsEn: blogItemsEn,
      projects: projectItems,
      blogCategories: blogCategoryItems,
      projectCategories: projectCategoryItems,
      testimonials: nextItems,
    })
  }

  const handleLogin = () => {
    if (authForm.username === ADMIN_CREDENTIALS.username && authForm.password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true)
      window.localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(true))
      setAuthError("")
      setAuthForm({ username: "", password: "" })
      return
    }

    setAuthError("Credenciales inválidas")
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    window.localStorage.removeItem(ADMIN_SESSION_KEY)
  }

  const handleBlogSubmit = () => {
    if (!blogForm.title || !blogForm.description || !blogForm.category || !blogForm.date) {
      return
    }

    const categoriesList = blogForm.categories
      ? blogForm.categories.split(",").map((value) => value.trim()).filter(Boolean)
      : [blogForm.category]
    const keywordsList = blogForm.keywords
      ? blogForm.keywords.split(",").map((value) => value.trim()).filter(Boolean)
      : []
    const galleryItems = blogForm.galleryFiles.length ? blogForm.galleryFiles : undefined

    const payload: BlogPost = {
      id: editingBlogId ?? Math.max(0, ...blogItems.map((item) => item.id)) + 1,
      title: blogForm.title,
      description: blogForm.description,
      category: blogForm.category,
      date: blogForm.date,
      publishedAt: blogForm.publishedAt.trim() || undefined,
      image: blogForm.image || "/placeholder.svg?height=300&width=400",
      hasImageTop: blogForm.hasImageTop,
      slug: slugify(blogForm.title),
      categories: categoriesList,
      gallery: galleryItems,
      seoTitle: blogForm.seoTitle.trim() || undefined,
      seoDescription: blogForm.seoDescription.trim() || undefined,
      keywords: keywordsList.length ? keywordsList : undefined,
      content: buildCustomContent({
        title: blogForm.title,
        category: blogForm.category,
        description: blogForm.description,
        intro: blogForm.intro,
        introImage: blogForm.introImage,
        considerations: blogForm.considerations,
        considerationsImage: blogForm.considerationsImage,
        strategy: blogForm.strategy,
        strategyImage: blogForm.strategyImage,
        bestPractices: blogForm.bestPractices,
        bestPracticesImage: blogForm.bestPracticesImage,
        errors: blogForm.errors,
        errorsImage: blogForm.errorsImage,
        conclusion: blogForm.conclusion,
        conclusionImage: blogForm.conclusionImage,
      }),
      contentRaw: {
        intro: blogForm.intro,
        introImage: blogForm.introImage,
        considerations: blogForm.considerations,
        considerationsImage: blogForm.considerationsImage,
        strategy: blogForm.strategy,
        strategyImage: blogForm.strategyImage,
        bestPractices: blogForm.bestPractices,
        bestPracticesImage: blogForm.bestPracticesImage,
        errors: blogForm.errors,
        errorsImage: blogForm.errorsImage,
        conclusion: blogForm.conclusion,
        conclusionImage: blogForm.conclusionImage,
      },
    }

    const nextItems = editingBlogId
      ? (blogForm.targetLanguage === "es" ? blogItems : blogItemsEn).map((item) => (item.id === editingBlogId ? payload : item))
      : [payload, ...(blogForm.targetLanguage === "es" ? blogItems : blogItemsEn)]

    if (blogForm.targetLanguage === "es") {
      setBlogItems(nextItems)
    } else {
      setBlogItemsEn(nextItems)
    }

    const nextCategories = blogCategoryItems.includes(payload.category)
      ? blogCategoryItems
      : [...blogCategoryItems, payload.category]
    setBlogCategoryItems(nextCategories)
    persistContent({
      blogPosts: blogForm.targetLanguage === "es" ? nextItems : blogItems,
      blogPostsEn: blogForm.targetLanguage === "en" ? nextItems : blogItemsEn,
      projects: projectItems,
      blogCategories: nextCategories,
      projectCategories: projectCategoryItems,
      testimonials: testimonialItems,
    })
    setEditingBlogId(null)
    setBlogForm({
      title: "",
      description: "",
      category: "",
      date: "",
      publishedAt: "",
      image: "",
      hasImageTop: true,
      categories: "",
      seoTitle: "",
      seoDescription: "",
      keywords: "",
      intro: "",
      introImage: "",
      considerations: "",
      considerationsImage: "",
      strategy: "",
      strategyImage: "",
      bestPractices: "",
      bestPracticesImage: "",
      errors: "",
      errorsImage: "",
      conclusion: "",
      conclusionImage: "",
      galleryFiles: [],
      targetLanguage: "es",
    })
    setActiveSection("blog-list")
  }

  const handleProjectSubmit = () => {
    if (!projectForm.title || !projectForm.category || !projectForm.date || !projectForm.description) {
      return
    }

    const galleryFromUrls = projectForm.galleryUrls
      ? projectForm.galleryUrls.split("\n").map((item) => item.trim()).filter(Boolean)
      : []
    const combinedGallery = [...projectForm.galleryFiles, ...galleryFromUrls]
    const galleryItems =
      combinedGallery.length > 0
        ? combinedGallery
        : projectForm.image
        ? [projectForm.image]
        : ["/placeholder.jpg"]

    const payload: Project = {
      id: editingProjectId ?? Math.max(0, ...projectItems.map((item) => item.id)) + 1,
      title: projectForm.title,
      category: projectForm.category,
      categoryLabel: projectForm.categoryLabel || formatCategoryLabel(projectForm.category),
      date: projectForm.date,
      description: projectForm.description,
      image: projectForm.image || "/placeholder.jpg",
      slug: slugify(projectForm.title),
      gallery: galleryItems,
      client: projectForm.client || undefined,
      searchVolume: projectForm.searchVolume ? Number(projectForm.searchVolume) : undefined,
      autoSearchVolume: projectForm.autoSearchVolume,
      website: projectForm.websiteUrl
        ? {
            label: projectForm.websiteLabel || projectForm.websiteUrl,
            url: projectForm.websiteUrl,
          }
        : undefined,
    }

    const nextItems = editingProjectId
      ? projectItems.map((item) => (item.id === editingProjectId ? payload : item))
      : [payload, ...projectItems]

    setProjectItems(nextItems)
    const nextCategories = projectCategoryItems.includes(payload.categoryLabel)
      ? projectCategoryItems
      : [...projectCategoryItems, payload.categoryLabel]
    setProjectCategoryItems(nextCategories)
    persistContent({
      blogPosts: blogItems,
      blogPostsEn: blogItemsEn,
      projects: nextItems,
      blogCategories: blogCategoryItems,
      projectCategories: nextCategories,
      testimonials: testimonialItems,
    })
    setEditingProjectId(null)
    setProjectForm({
      title: "",
      category: "",
      categoryLabel: "",
      date: "",
      description: "",
      image: "",
      client: "",
      searchVolume: "",
      autoSearchVolume: false,
      websiteLabel: "",
      websiteUrl: "",
      galleryUrls: "",
      galleryFiles: [],
    })
    setActiveSection("projects-list")
  }

  const handleEditBlog = (item: BlogPost, lang: "es" | "en") => {
    setEditingBlogId(item.id)
    setBlogForm({
      title: item.title,
      description: item.description,
      category: item.category,
      date: item.date,
      publishedAt: item.publishedAt ?? "",
      image: item.image,
      hasImageTop: item.hasImageTop,
      categories: item.categories.join(", "),
      seoTitle: item.seoTitle ?? "",
      seoDescription: item.seoDescription ?? "",
      keywords: item.keywords?.join(", ") ?? "",
      intro: item.contentRaw?.intro ?? "",
      introImage: item.contentRaw?.introImage ?? "",
      considerations: item.contentRaw?.considerations ?? "",
      considerationsImage: item.contentRaw?.considerationsImage ?? "",
      strategy: item.contentRaw?.strategy ?? "",
      strategyImage: item.contentRaw?.strategyImage ?? "",
      bestPractices: item.contentRaw?.bestPractices ?? "",
      bestPracticesImage: item.contentRaw?.bestPracticesImage ?? "",
      errors: item.contentRaw?.errors ?? "",
      errorsImage: item.contentRaw?.errorsImage ?? "",
      conclusion: item.contentRaw?.conclusion ?? "",
      conclusionImage: item.contentRaw?.conclusionImage ?? "",
      galleryFiles: item.gallery ?? [],
      targetLanguage: lang,
    })
    setActiveSection("blog-new")
  }

  const handleEditProject = (item: Project) => {
    setEditingProjectId(item.id)
    setProjectForm({
      title: item.title,
      category: item.category,
      categoryLabel: item.categoryLabel,
      date: item.date,
      description: item.description,
      image: item.image,
      client: item.client ?? "",
      searchVolume: item.searchVolume?.toString() ?? "",
      autoSearchVolume: item.autoSearchVolume ?? false,
      websiteLabel: item.website?.label ?? "",
      websiteUrl: item.website?.url ?? "",
      galleryUrls: item.gallery?.join("\n") ?? "",
      galleryFiles: [],
    })
    setActiveSection("projects-new")
  }

  const handleDeleteBlog = (id: number, lang: "es" | "en") => {
    if (lang === "es") {
      const nextItems = blogItems.filter((item) => item.id !== id)
      setBlogItems(nextItems)
      persistContent({
        blogPosts: nextItems,
        blogPostsEn: blogItemsEn,
        projects: projectItems,
        blogCategories: blogCategoryItems,
        projectCategories: projectCategoryItems,
        testimonials: testimonialItems,
      })
    } else {
      const nextItems = blogItemsEn.filter((item) => item.id !== id)
      setBlogItemsEn(nextItems)
      persistContent({
        blogPosts: blogItems,
        blogPostsEn: nextItems,
        projects: projectItems,
        blogCategories: blogCategoryItems,
        projectCategories: projectCategoryItems,
        testimonials: testimonialItems,
      })
    }
  }

  const handleDeleteProject = (id: number) => {
    const nextItems = projectItems.filter((item) => item.id !== id)
    setProjectItems(nextItems)
    persistContent({
      blogPosts: blogItems,
      blogPostsEn: blogItemsEn,
      projects: nextItems,
      blogCategories: blogCategoryItems,
      projectCategories: projectCategoryItems,
      testimonials: testimonialItems,
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl">
          <div className="space-y-3 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Portal admin</p>
            <h1 className="text-3xl font-bold text-white">Ingreso seguro</h1>
            <p className="text-white/60 text-sm">Accedé con tu usuario administrador</p>
          </div>
          <div className="mt-8 space-y-4">
            <Input
              placeholder="Usuario"
              value={authForm.username}
              onChange={(event) => setAuthForm((prev) => ({ ...prev, username: event.target.value }))}
              className="bg-white/10 border-white/10 text-white placeholder:text-white/50"
            />
            <Input
              placeholder="Contraseña"
              type="password"
              value={authForm.password}
              onChange={(event) => setAuthForm((prev) => ({ ...prev, password: event.target.value }))}
              className="bg-white/10 border-white/10 text-white placeholder:text-white/50"
            />
            {authError ? <p className="text-sm text-red-300">{authError}</p> : null}
            <Button onClick={handleLogin} className="w-full bg-[#00DEC7] text-black hover:bg-[#00DEC7]/90">
              Ingresar
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24">
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-6rem)]">
        <aside className="w-full lg:w-72 bg-slate-950 border-b lg:border-b-0 lg:border-r border-white/10 p-6 space-y-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Vektra</p>
            <h1 className="text-2xl font-semibold">Dashboard admin</h1>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-white/70">Panel principal</p>
            <p className="text-white/40">Gestión de contenidos</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-white/20 bg-white/5 text-white hover:bg-white/10"
          >
            Cerrar sesión
          </Button>
          <div className="rounded-xl border border-white/10 p-4 text-sm text-white/70">
            <p>Usuario activo</p>
            <p className="text-white font-medium">Administrador</p>
          </div>
          <nav className="space-y-4">
            {navItems.map((item) => (
              <div key={item.id} className="space-y-2">
                {item.children ? (
                  <>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">{item.label}</p>
                    <div className="space-y-1">
                      {item.children.map((child) => {
                        const isActive = activeSection === child.id
                        return (
                          <button
                            key={child.id}
                            type="button"
                            onClick={() => setActiveSection(child.id as SectionKey)}
                            className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                              isActive ? "bg-[#00DEC7] text-black" : "text-white/70 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            {child.label}
                          </button>
                        )
                      })}
                    </div>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveSection(item.id as SectionKey)}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                      activeSection === item.id ? "bg-[#00DEC7] text-black" : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </nav>
        </aside>

        <main className="flex-1 bg-slate-900">
          <div className="px-6 py-10 lg:px-10 space-y-10">
            {uploadFeedback && (
              <div
                className={`rounded-lg px-4 py-3 text-sm font-medium flex items-center justify-between ${
                  uploadFeedback.type === "error"
                    ? "bg-red-500/20 text-red-300 border border-red-500/30"
                    : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                }`}
              >
                <span>{uploadFeedback.message}</span>
                <button type="button" onClick={() => setUploadFeedback(null)} className="ml-4 hover:opacity-70">✕</button>
              </div>
            )}
            {activeSection === "overview" && (
              <>
                <div className="flex flex-col gap-3">
                  <h2 className="text-3xl font-semibold">Resumen general</h2>
                  <p className="text-white/60">
                    Controlá el estado del contenido y la producción de cada sección.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                  {dashboardStats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <p className="text-sm text-white/60">{stat.label}</p>
                      <p className="mt-3 text-3xl font-semibold text-white">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeSection === "blog-list" && (
              <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_380px] gap-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold">Entradas del blog</h3>
                      <p className="text-white/60 text-sm">Revisá, editá o eliminá artículos publicados.</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Español */}
                    <div>
                      <h4 className="text-sm font-semibold text-[#00DEC7] uppercase tracking-wider mb-3">Español ({blogItems.length})</h4>
                      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                        {blogItems.map((item) => (
                          <div key={item.id} className="rounded-xl border border-white/10 p-4 bg-slate-950/60">
                            <p className="text-xs text-white/50">{item.date}</p>
                            <p className="text-base font-semibold text-white">{item.title}</p>
                            <p className="text-xs text-[#00DEC7] mt-1">{item.category}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <Button
                                variant="outline"
                                className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                                onClick={() => handleEditBlog(item, "es")}
                              >
                                Editar
                              </Button>
                              <Button
                                variant="destructive"
                                className="bg-red-500 text-white hover:bg-red-500/90"
                                onClick={() => handleDeleteBlog(item.id, "es")}
                              >
                                Eliminar
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Inglés */}
                    <div>
                      <h4 className="text-sm font-semibold text-[#00DEC7] uppercase tracking-wider mb-3">Inglés ({blogItemsEn.length})</h4>
                      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                        {blogItemsEn.map((item) => (
                          <div key={item.id} className="rounded-xl border border-white/10 p-4 bg-slate-950/60">
                            <p className="text-xs text-white/50">{item.date}</p>
                            <p className="text-base font-semibold text-white">{item.title}</p>
                            <p className="text-xs text-[#00DEC7] mt-1">{item.category}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <Button
                                variant="outline"
                                className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                                onClick={() => handleEditBlog(item, "en")}
                              >
                                Editar
                              </Button>
                              <Button
                                variant="destructive"
                                className="bg-red-500 text-white hover:bg-red-500/90"
                                onClick={() => handleDeleteBlog(item.id, "en")}
                              >
                                Eliminar
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
                  <h3 className="text-xl font-semibold">Resumen rápido</h3>
                  <div className="space-y-3 text-sm text-white/70">
                    <div className="rounded-lg border border-white/10 bg-slate-950/60 p-4">
                      <p className="text-white/50 text-xs">Artículos publicados ({blogLanguage.toUpperCase()})</p>
                      <p className="text-2xl font-semibold text-white">{(blogLanguage === "es" ? blogItems : blogItemsEn).length}</p>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-slate-950/60 p-4">
                      <p className="text-white/50 text-xs">Categorías activas</p>
                      <p className="text-lg font-semibold text-white">{blogCategoryItems.length}</p>
                    </div>
                    <Button
                      onClick={() => setActiveSection("blog-new")}
                      className="w-full bg-[#00DEC7] text-black hover:bg-[#00DEC7]/90"
                    >
                      Nueva entrada
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-white/20 bg-white/5 text-white hover:bg-white/10"
                      onClick={() => setActiveSection("blog-categories")}
                    >
                      Administrar categorías
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "blog-new" && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold">Nueva entrada</h3>
                  <p className="text-white/60 text-sm">Completá todos los campos para optimizar el SEO.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                      Idioma del artículo
                    </label>
                    <select
                      value={blogForm.targetLanguage}
                      onChange={(event) => setBlogForm((prev) => ({ ...prev, targetLanguage: event.target.value as "es" | "en" }))}
                      className="h-12 w-full rounded-md border border-white/10 bg-slate-950 px-3 text-sm text-white"
                    >
                      <option value="es">Español</option>
                      <option value="en">Inglés</option>
                    </select>
                  </div>

                  <Input
                    placeholder="Título"
                    value={blogForm.title}
                    onChange={(event) => setBlogForm((prev) => ({ ...prev, title: event.target.value }))}
                    className="bg-slate-950 border-white/10 text-white placeholder:text-white/40"
                  />
                  <div className="space-y-2">
                    <label className="text-xs text-white/60 uppercase tracking-wider">Fecha visible en el artículo</label>
                    <Input
                      type="date"
                      placeholder="Fecha"
                      value={formatDateForInput(blogForm.date)}
                      onChange={(event) => setBlogForm((prev) => ({ ...prev, date: formatDateFromInput(event.target.value) }))}
                      className="bg-slate-950 border-white/10 text-white placeholder:text-white/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/60 uppercase tracking-wider">Fecha de programación (Sistema)</label>
                    <Input
                      type="date"
                      placeholder="Publicación"
                      value={formatDateForInput(blogForm.publishedAt)}
                      onChange={(event) => setBlogForm((prev) => ({ ...prev, publishedAt: formatDateFromInput(event.target.value) }))}
                      className="bg-slate-950 border-white/10 text-white placeholder:text-white/40"
                    />
                  </div>
                  <select
                    value={blogForm.category}
                    onChange={(event) => setBlogForm((prev) => ({ ...prev, category: event.target.value }))}
                    className="h-12 rounded-md border border-white/10 bg-slate-950 px-3 text-sm text-white"
                  >
                    <option value="">Seleccionar categoría</option>
                    {blogCategoryItems.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs text-white/60 uppercase tracking-wider">Categorías relacionadas</label>
                    <div className="flex flex-wrap gap-2">
                      {blogCategoryItems.map((category) => {
                        const selectedCategories = blogForm.categories
                          ? blogForm.categories.split(",").map((c) => c.trim())
                          : []
                        const isSelected = selectedCategories.includes(category)
                        
                        return (
                          <button
                            key={category}
                            type="button"
                            onClick={() => {
                              let nextCategories: string[]
                              if (isSelected) {
                                nextCategories = selectedCategories.filter((c) => c !== category)
                              } else {
                                nextCategories = [...selectedCategories, category]
                              }
                              setBlogForm((prev) => ({ ...prev, categories: nextCategories.join(", ") }))
                            }}
                            className={`px-3 py-1 rounded-full text-xs transition ${
                              isSelected
                                ? "bg-[#00DEC7] text-black"
                                : "bg-white/5 text-white/60 hover:bg-white/10"
                            }`}
                          >
                            {category}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <Input
                    placeholder="SEO title"
                    value={blogForm.seoTitle}
                    onChange={(event) => setBlogForm((prev) => ({ ...prev, seoTitle: event.target.value }))}
                    className="bg-slate-950 border-white/10 text-white placeholder:text-white/40"
                  />
                  <Input
                    placeholder="Palabras clave (separadas por coma)"
                    value={blogForm.keywords}
                    onChange={(event) => setBlogForm((prev) => ({ ...prev, keywords: event.target.value }))}
                    className="bg-slate-950 border-white/10 text-white placeholder:text-white/40"
                  />
                  <Input
                    placeholder="URL de imagen"
                    value={blogForm.image}
                    onChange={(event) => setBlogForm((prev) => ({ ...prev, image: event.target.value }))}
                    className="bg-slate-950 border-white/10 text-white placeholder:text-white/40"
                  />
                  <textarea
                    value={blogForm.seoDescription}
                    onChange={(event) => setBlogForm((prev) => ({ ...prev, seoDescription: event.target.value }))}
                    placeholder="Meta descripción"
                    className="min-h-[120px] rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-white/40 md:col-span-2"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleBlogImageUpload(event.target.files)}
                    className="md:col-span-2 text-sm text-white/70 file:mr-4 file:rounded-md file:border-0 file:bg-[#00DEC7] file:px-4 file:py-2 file:text-sm file:font-medium file:text-black hover:file:bg-[#00DEC7]/90"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(event) => handleBlogGalleryUpload(event.target.files)}
                    className="md:col-span-2 text-sm text-white/70 file:mr-4 file:rounded-md file:border-0 file:bg-[#00DEC7] file:px-4 file:py-2 file:text-sm file:font-medium file:text-black hover:file:bg-[#00DEC7]/90"
                  />
                  <textarea
                    value={blogForm.description}
                    onChange={(event) => setBlogForm((prev) => ({ ...prev, description: event.target.value }))}
                    placeholder="Descripción"
                    className="min-h-[120px] rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-white/40 md:col-span-2"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <textarea
                      value={blogForm.intro}
                      onChange={(event) => setBlogForm((prev) => ({ ...prev, intro: event.target.value }))}
                      placeholder="Introducción"
                      className="min-h-[120px] w-full rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-white/40"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => handleSectionImageUpload(event.target.files, "intro")}
                      className="w-full text-xs text-white/70 file:mr-4 file:rounded-md file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-xs file:font-medium file:text-white hover:file:bg-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <textarea
                      value={blogForm.considerations}
                      onChange={(event) => setBlogForm((prev) => ({ ...prev, considerations: event.target.value }))}
                      placeholder="Qué necesitas considerar"
                      className="min-h-[120px] w-full rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-white/40"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => handleSectionImageUpload(event.target.files, "considerations")}
                      className="w-full text-xs text-white/70 file:mr-4 file:rounded-md file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-xs file:font-medium file:text-white hover:file:bg-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <textarea
                      value={blogForm.strategy}
                      onChange={(event) => setBlogForm((prev) => ({ ...prev, strategy: event.target.value }))}
                      placeholder="Estrategia paso a paso"
                      className="min-h-[120px] w-full rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-white/40"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => handleSectionImageUpload(event.target.files, "strategy")}
                      className="w-full text-xs text-white/70 file:mr-4 file:rounded-md file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-xs file:font-medium file:text-white hover:file:bg-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <textarea
                      value={blogForm.bestPractices}
                      onChange={(event) => setBlogForm((prev) => ({ ...prev, bestPractices: event.target.value }))}
                      placeholder="Buenas prácticas recomendadas"
                      className="min-h-[120px] w-full rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-white/40"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => handleSectionImageUpload(event.target.files, "bestPractices")}
                      className="w-full text-xs text-white/70 file:mr-4 file:rounded-md file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-xs file:font-medium file:text-white hover:file:bg-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <textarea
                      value={blogForm.errors}
                      onChange={(event) => setBlogForm((prev) => ({ ...prev, errors: event.target.value }))}
                      placeholder="Errores comunes a evitar"
                      className="min-h-[120px] w-full rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-white/40"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => handleSectionImageUpload(event.target.files, "errors")}
                      className="w-full text-xs text-white/70 file:mr-4 file:rounded-md file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-xs file:font-medium file:text-white hover:file:bg-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <textarea
                      value={blogForm.conclusion}
                      onChange={(event) => setBlogForm((prev) => ({ ...prev, conclusion: event.target.value }))}
                      placeholder="Conclusión"
                      className="min-h-[120px] w-full rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-white/40"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => handleSectionImageUpload(event.target.files, "conclusion")}
                      className="w-full text-xs text-white/70 file:mr-4 file:rounded-md file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-xs file:font-medium file:text-white hover:file:bg-white/20"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Button onClick={handleBlogSubmit} className="bg-[#00DEC7] text-black hover:bg-[#00DEC7]/90">
                    {editingBlogId ? "Actualizar artículo" : "Crear artículo"}
                  </Button>
                  {editingBlogId && (
                    <Button
                      variant="outline"
                      className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                      onClick={() => {
                        setEditingBlogId(null)
                        setBlogForm({
                          title: "",
                          description: "",
                          category: "",
                          date: "",
                          publishedAt: "",
                          image: "",
                          hasImageTop: true,
                          categories: "",
                          seoTitle: "",
                          seoDescription: "",
                          keywords: "",
                          intro: "",
                          introImage: "",
                          considerations: "",
                          considerationsImage: "",
                          strategy: "",
                          strategyImage: "",
                          bestPractices: "",
                          bestPracticesImage: "",
                          errors: "",
                          errorsImage: "",
                          conclusion: "",
                          conclusionImage: "",
                          galleryFiles: [],
                          targetLanguage: "es",
                        })
                      }}
                    >
                      Cancelar
                    </Button>
                  )}
                </div>
              </div>
            )}

            {activeSection === "blog-categories" && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold">Categorías del blog</h3>
                  <p className="text-white/60 text-sm">Creá y administrá las categorías disponibles.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    placeholder="Nueva categoría"
                    value={blogCategoryDraft}
                    onChange={(event) => setBlogCategoryDraft(event.target.value)}
                    className="bg-slate-950 border-white/10 text-white placeholder:text-white/40"
                  />
                  <Button
                    onClick={() => {
                      const nextValue = blogCategoryDraft.trim()
                      if (!nextValue) return
                      if (!blogCategoryItems.includes(nextValue)) {
                        const nextItems = [...blogCategoryItems, nextValue]
                      setBlogCategoryItems(nextItems)
                      persistContent({
                        blogPosts: blogItems,
                        blogPostsEn: blogItemsEn,
                        projects: projectItems,
                        blogCategories: nextItems,
                        projectCategories: projectCategoryItems,
                        testimonials: testimonialItems,
                      })
                      }
                      setBlogCategoryDraft("")
                    }}
                    className="bg-[#00DEC7] text-black hover:bg-[#00DEC7]/90"
                  >
                    Agregar categoría
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {blogCategoryItems.map((category) => (
                    <div key={category} className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3">
                      <span className="text-sm text-white">{category}</span>
                      <Button
                        variant="outline"
                        className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                        onClick={() => {
                          const nextItems = blogCategoryItems.filter((item) => item !== category)
                          setBlogCategoryItems(nextItems)
                          persistContent({
                            blogPosts: blogItems,
                            blogPostsEn: blogItemsEn,
                            projects: projectItems,
                            blogCategories: nextItems,
                            projectCategories: projectCategoryItems,
                            testimonials: testimonialItems,
                          })
                        }}
                      >
                        Quitar
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "projects-list" && (
              <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_380px] gap-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-semibold">Proyectos</h3>
                    <p className="text-white/60 text-sm">Editá o eliminá trabajos publicados.</p>
                  </div>
                  <div className="space-y-3 max-h-[520px] overflow-y-auto pr-2">
                    {projectItems.map((item) => (
                      <div key={item.id} className="rounded-xl border border-white/10 p-4 bg-slate-950/60">
                        <p className="text-xs text-white/50">{item.date}</p>
                        <p className="text-base font-semibold text-white">{item.title}</p>
                        <p className="text-xs text-[#00DEC7] mt-1">{item.categoryLabel}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <Button
                            variant="outline"
                            className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                            onClick={() => handleEditProject(item)}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="destructive"
                            className="bg-red-500 text-white hover:bg-red-500/90"
                            onClick={() => handleDeleteProject(item.id)}
                          >
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
                  <h3 className="text-xl font-semibold">Acciones rápidas</h3>
                  <div className="space-y-3 text-sm text-white/70">
                    <div className="rounded-lg border border-white/10 bg-slate-950/60 p-4">
                      <p className="text-white/50 text-xs">Proyectos activos</p>
                      <p className="text-2xl font-semibold text-white">{projectItems.length}</p>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-slate-950/60 p-4">
                      <p className="text-white/50 text-xs">Categorías activas</p>
                      <p className="text-lg font-semibold text-white">{projectCategoryItems.length}</p>
                    </div>
                    <Button
                      onClick={() => setActiveSection("projects-new")}
                      className="w-full bg-[#00DEC7] text-black hover:bg-[#00DEC7]/90"
                    >
                      Nuevo proyecto
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-white/20 bg-white/5 text-white hover:bg-white/10"
                      onClick={() => setActiveSection("projects-categories")}
                    >
                      Administrar categorías
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "projects-new" && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold">Nuevo proyecto</h3>
                  <p className="text-white/60 text-sm">Completá la información del trabajo para publicar.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Título"
                    value={projectForm.title}
                    onChange={(event) => setProjectForm((prev) => ({ ...prev, title: event.target.value }))}
                    className="bg-slate-950 border-white/10 text-white placeholder:text-white/40"
                  />
                  <Input
                    placeholder="Fecha (dd.mm.aaaa)"
                    value={projectForm.date}
                    onChange={(event) => setProjectForm((prev) => ({ ...prev, date: event.target.value }))}
                    className="bg-slate-950 border-white/10 text-white placeholder:text-white/40"
                  />
                  <select
                    value={projectForm.categoryLabel}
                    onChange={(event) => {
                      const nextLabel = event.target.value
                      setProjectForm((prev) => ({
                        ...prev,
                        categoryLabel: nextLabel,
                        category: slugify(nextLabel),
                      }))
                    }}
                    className="h-12 rounded-md border border-white/10 bg-slate-950 px-3 text-sm text-white"
                  >
                    <option value="">Seleccionar categoría</option>
                    {projectCategoryItems.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <Input
                    placeholder="Categoría (id)"
                    value={projectForm.category}
                    onChange={(event) => setProjectForm((prev) => ({ ...prev, category: event.target.value }))}
                    className="bg-slate-950 border-white/10 text-white placeholder:text-white/40"
                  />
                  <Input
                    placeholder="URL de imagen"
                    value={projectForm.image}
                    onChange={(event) => setProjectForm((prev) => ({ ...prev, image: event.target.value }))}
                    className="bg-slate-950 border-white/10 text-white placeholder:text-white/40"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleProjectImageUpload(event.target.files)}
                    className="md:col-span-2 text-sm text-white/70 file:mr-4 file:rounded-md file:border-0 file:bg-[#00DEC7] file:px-4 file:py-2 file:text-sm file:font-medium file:text-black hover:file:bg-[#00DEC7]/90"
                  />
                  <Input
                    placeholder="Cliente"
                    value={projectForm.client}
                    onChange={(event) => setProjectForm((prev) => ({ ...prev, client: event.target.value }))}
                    className="bg-slate-950 border-white/10 text-white placeholder:text-white/40"
                  />
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 mb-1">
                      <input
                        type="checkbox"
                        id="autoSearchVolume"
                        checked={projectForm.autoSearchVolume}
                        onChange={(e) => setProjectForm((prev) => ({ ...prev, autoSearchVolume: e.target.checked }))}
                        className="h-4 w-4 rounded border-white/10 bg-slate-950 text-[#00DEC7] focus:ring-[#00DEC7]"
                      />
                      <label htmlFor="autoSearchVolume" className="text-xs text-white/70 select-none">
                        Volumen automático (según visitas)
                      </label>
                    </div>
                    <Input
                      placeholder="Volumen de búsqueda (0-100)"
                      type="number"
                      value={projectForm.searchVolume}
                      onChange={(event) => setProjectForm((prev) => ({ ...prev, searchVolume: event.target.value }))}
                      disabled={projectForm.autoSearchVolume}
                      className={`bg-slate-950 border-white/10 text-white placeholder:text-white/40 ${
                        projectForm.autoSearchVolume ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    />
                  </div>
                  <Input
                    placeholder="Sitio web (label)"
                    value={projectForm.websiteLabel}
                    onChange={(event) => setProjectForm((prev) => ({ ...prev, websiteLabel: event.target.value }))}
                    className="bg-slate-950 border-white/10 text-white placeholder:text-white/40"
                  />
                  <Input
                    placeholder="Sitio web (url)"
                    value={projectForm.websiteUrl}
                    onChange={(event) => setProjectForm((prev) => ({ ...prev, websiteUrl: event.target.value }))}
                    className="bg-slate-950 border-white/10 text-white placeholder:text-white/40"
                  />
                  <textarea
                    placeholder="Galería (URLs separadas por línea)"
                    value={projectForm.galleryUrls}
                    onChange={(event) => setProjectForm((prev) => ({ ...prev, galleryUrls: event.target.value }))}
                    className="min-h-[120px] rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-white/40 md:col-span-2"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(event) => handleGalleryUpload(event.target.files)}
                    className="md:col-span-2 text-sm text-white/70 file:mr-4 file:rounded-md file:border-0 file:bg-[#00DEC7] file:px-4 file:py-2 file:text-sm file:font-medium file:text-black hover:file:bg-[#00DEC7]/90"
                  />
                  <textarea
                    value={projectForm.description}
                    onChange={(event) => setProjectForm((prev) => ({ ...prev, description: event.target.value }))}
                    placeholder="Descripción"
                    className="min-h-[120px] rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-white/40 md:col-span-2"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button onClick={handleProjectSubmit} className="bg-[#00DEC7] text-black hover:bg-[#00DEC7]/90">
                    {editingProjectId ? "Actualizar proyecto" : "Crear proyecto"}
                  </Button>
                  {editingProjectId && (
                    <Button
                      variant="outline"
                      className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                      onClick={() => {
                        setEditingProjectId(null)
                        setProjectForm({
                          title: "",
                          category: "",
                          categoryLabel: "",
                          date: "",
                          description: "",
                          image: "",
                          client: "",
                          searchVolume: "",
                          autoSearchVolume: false,
                          websiteLabel: "",
                          websiteUrl: "",
                          galleryUrls: "",
                          galleryFiles: [],
                        })
                      }}
                    >
                      Cancelar
                    </Button>
                  )}
                </div>
              </div>
            )}

            {activeSection === "projects-categories" && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold">Categorías de trabajos</h3>
                  <p className="text-white/60 text-sm">Sumá nuevas categorías y mantené el listado actualizado.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    placeholder="Nueva categoría"
                    value={projectCategoryDraft}
                    onChange={(event) => setProjectCategoryDraft(event.target.value)}
                    className="bg-slate-950 border-white/10 text-white placeholder:text-white/40"
                  />
                  <Button
                    onClick={() => {
                      const nextValue = projectCategoryDraft.trim()
                      if (!nextValue) return
                      if (!projectCategoryItems.includes(nextValue)) {
                        const nextItems = [...projectCategoryItems, nextValue]
                      setProjectCategoryItems(nextItems)
                      persistContent({
                        blogPosts: blogItems,
                        blogPostsEn: blogItemsEn,
                        projects: projectItems,
                        blogCategories: blogCategoryItems,
                        projectCategories: nextItems,
                        testimonials: testimonialItems,
                      })
                      }
                      setProjectCategoryDraft("")
                    }}
                    className="bg-[#00DEC7] text-black hover:bg-[#00DEC7]/90"
                  >
                    Agregar categoría
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {projectCategoryItems.map((category) => (
                    <div key={category} className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3">
                      <span className="text-sm text-white">{category}</span>
                      <Button
                        variant="outline"
                        className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                        onClick={() => {
                          const nextItems = projectCategoryItems.filter((item) => item !== category)
                          setProjectCategoryItems(nextItems)
                          persistContent({
                            blogPosts: blogItems,
                            blogPostsEn: blogItemsEn,
                            projects: projectItems,
                            blogCategories: blogCategoryItems,
                            projectCategories: nextItems,
                            testimonials: testimonialItems,
                          })
                        }}
                      >
                        Quitar
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "testimonials-list" && (
              <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_380px] gap-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-semibold">Testimonios</h3>
                    <p className="text-white/60 text-sm">Gestioná las opiniones de clientes.</p>
                  </div>
                  <div className="space-y-3 max-h-[520px] overflow-y-auto pr-2">
                    {testimonialItems.map((item) => (
                      <div key={item.id} className="rounded-xl border border-white/10 p-4 bg-slate-950/60">
                        <div className="flex items-center gap-4">
                          {item.image && (
                            <Image src={item.image} alt={item.name} width={40} height={40} className="rounded-full object-cover" />
                          )}
                          <div>
                            <p className="text-base font-semibold text-white">{item.name}</p>
                            <p className="text-xs text-white/50">{item.role}</p>
                          </div>
                        </div>
                        <p className="text-sm text-white/70 mt-2 line-clamp-2">{item.content}</p>
                        <div className="mt-2 flex gap-2">
                          <span className="text-xs bg-white/5 px-2 py-1 rounded text-[#00DEC7]">{item.category}</span>
                          <span className="text-xs bg-white/5 px-2 py-1 rounded text-white/50 uppercase">{item.language}</span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <Button
                            variant="outline"
                            className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                            onClick={() => handleEditTestimonial(item)}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="destructive"
                            className="bg-red-500 text-white hover:bg-red-500/90"
                            onClick={() => handleDeleteTestimonial(item.id)}
                          >
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
                  <h3 className="text-xl font-semibold">Acciones rápidas</h3>
                  <div className="space-y-3 text-sm text-white/70">
                    <div className="rounded-lg border border-white/10 bg-slate-950/60 p-4">
                      <p className="text-white/50 text-xs">Testimonios activos</p>
                      <p className="text-2xl font-semibold text-white">{testimonialItems.length}</p>
                    </div>
                    <Button
                      onClick={() => setActiveSection("testimonials-new")}
                      className="w-full bg-[#00DEC7] text-black hover:bg-[#00DEC7]/90"
                    >
                      Nuevo testimonio
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "testimonials-new" && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold">Nuevo testimonio</h3>
                  <p className="text-white/60 text-sm">Cargá la opinión de un cliente.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Nombre del cliente"
                    value={testimonialForm.name}
                    onChange={(event) => setTestimonialForm((prev) => ({ ...prev, name: event.target.value }))}
                    className="bg-slate-950 border-white/10 text-white placeholder:text-white/40"
                  />
                  <Input
                    placeholder="Rol / Puesto"
                    value={testimonialForm.role}
                    onChange={(event) => setTestimonialForm((prev) => ({ ...prev, role: event.target.value }))}
                    className="bg-slate-950 border-white/10 text-white placeholder:text-white/40"
                  />
                  <Input
                    placeholder="Empresa"
                    value={testimonialForm.company}
                    onChange={(event) => setTestimonialForm((prev) => ({ ...prev, company: event.target.value }))}
                    className="bg-slate-950 border-white/10 text-white placeholder:text-white/40"
                  />
                  <select
                    value={testimonialForm.projectId}
                    onChange={(event) => setTestimonialForm((prev) => ({ ...prev, projectId: event.target.value }))}
                    className="h-12 rounded-md border border-white/10 bg-slate-950 px-3 text-sm text-white"
                  >
                    <option value="">Seleccionar proyecto (opcional)</option>
                    {projectItems.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.title}
                      </option>
                    ))}
                  </select>
                  <select
                    value={testimonialForm.category}
                    onChange={(event) => setTestimonialForm((prev) => ({ ...prev, category: event.target.value as Testimonial["category"] }))}
                    className="h-12 rounded-md border border-white/10 bg-slate-950 px-3 text-sm text-white"
                  >
                    <option value="">Seleccionar categoría</option>
                    {projectCategoryItems.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <select
                    value={testimonialForm.language}
                    onChange={(event) => setTestimonialForm((prev) => ({ ...prev, language: event.target.value as "es" | "en" }))}
                    className="h-12 rounded-md border border-white/10 bg-slate-950 px-3 text-sm text-white"
                  >
                    <option value="es">Español</option>
                    <option value="en">Inglés</option>
                  </select>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleTestimonialImageUpload(event.target.files)}
                    className="md:col-span-2 text-sm text-white/70 file:mr-4 file:rounded-md file:border-0 file:bg-[#00DEC7] file:px-4 file:py-2 file:text-sm file:font-medium file:text-black hover:file:bg-[#00DEC7]/90"
                  />
                  <textarea
                    value={testimonialForm.content}
                    onChange={(event) => setTestimonialForm((prev) => ({ ...prev, content: event.target.value }))}
                    placeholder="Testimonio"
                    className="min-h-[120px] rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-white/40 md:col-span-2"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button onClick={handleTestimonialSubmit} className="bg-[#00DEC7] text-black hover:bg-[#00DEC7]/90">
                    {editingTestimonialId ? "Actualizar testimonio" : "Crear testimonio"}
                  </Button>
                  {editingTestimonialId && (
                    <Button
                      variant="outline"
                      className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                      onClick={() => {
                        setEditingTestimonialId(null)
                        setTestimonialForm({
                          name: "",
                          role: "",
                          company: "",
                          content: "",
                          image: "",
                          projectId: "",
                          category: "diseno-web",
                          language: "es",
                        })
                        setActiveSection("testimonials-list")
                      }}
                    >
                      Cancelar
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
