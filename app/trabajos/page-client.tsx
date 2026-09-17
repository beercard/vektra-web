"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Loading from "./loading"
import { allProjects } from "./data"
import { Project } from "@/lib/storage"

const baseCategories = [
  { id: "todos", label: "Todos" },
  { id: "diseno-web", label: "Diseño web" },
  { id: "tienda-online", label: "Tienda online" },
  { id: "apps", label: "Apps" },
  { id: "marketing-digital", label: "Marketing Digital" },
  { id: "seo", label: "SEO" },
  { id: "agentes-ia", label: "Agentes IA" },
]

const formatCategoryLabel = (value: string) => {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

const ITEMS_PER_PAGE = 12

function TrabajosContent({
  initialProjects,
}: {
  initialProjects: Project[]
}) {
  const searchParams = useSearchParams()
  const initialSearchTerm = searchParams.get("q") || ""
  const initialCategory = searchParams.get("category") || "todos"

  const [projects, setProjects] = useState(initialProjects)
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const syncFromParams = () => {
      setSearchTerm(searchParams.get("q") || "")
      setActiveCategory(searchParams.get("category") || "todos")
      setCurrentPage(1)
    }
    syncFromParams()
  }, [searchParams])
  const categories = useMemo(() => {
    const categoryLabels = new Map(baseCategories.map((category) => [category.id, category.label]))
    const uniqueCategories = Array.from(new Set(projects.map((project: { category: string }) => project.category)))
      .filter((category) => category !== "todos")
    return [
      { id: "todos", label: categoryLabels.get("todos") ?? "Todos" },
      ...uniqueCategories.map((category) => ({
        id: category,
        label: categoryLabels.get(category) ?? formatCategoryLabel(category),
      })),
    ]
  }, [projects])

  const filteredProjects = useMemo(() => {
    return projects.filter((project: { title: string; description: string; category: string }) => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = activeCategory === "todos" || project.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [projects, searchTerm, activeCategory])

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE)
  
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredProjects.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredProjects, currentPage])

  // Distribute projects into 3 columns for masonry effect
  const columns = useMemo(() => {
    const cols: typeof paginatedProjects[] = [[], [], []]
    paginatedProjects.forEach((project, index) => {
      cols[index % 3].push(project)
    })
    return cols
  }, [paginatedProjects])

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
    setCurrentPage(1)
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch("/api/admin/content")
        if (!response.ok) return
        const data = await response.json()
        if (Array.isArray(data?.projects) && data.projects.length) {
          setProjects(data.projects)
        }
      } catch {
        return
      }
    }

    loadContent()
  }, [])

  const renderPaginationNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, "...", currentPage, "...", totalPages)
      }
    }
    
    return pages
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:py-24">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero1.webp')" }}
        />
        <div className="absolute inset-0 bg-black/70" />
        
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Nuestros Trabajos
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Proyectos que hablan por sí solos. Descubrí cómo ayudamos a empresas de todo el mundo a crecer en el mundo digital.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Escribí para comenzar a buscar..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-12 pr-4 py-6 text-base border-gray-200 rounded-full focus:border-[#00DEC7] focus:ring-[#00DEC7]"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-black text-white shadow-lg scale-105"
                    : "bg-white text-black border border-gray-200 hover:border-[#00DEC7] hover:text-[#00DEC7] hover:scale-105"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {paginatedProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No se encontraron proyectos con esos criterios.</p>
              <Button 
                variant="outline" 
                className="mt-4 bg-transparent"
                onClick={() => {
                  setSearchTerm("")
                  setActiveCategory("todos")
                }}
              >
                Limpiar filtros
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {columns.map((column, columnIndex) => (
                  <div key={columnIndex} className="flex flex-col gap-6">
                    {column.map((project, projectIndex) => {
                      // Alternate image position for masonry effect
                      const hasImageTop = (columnIndex + projectIndex) % 2 === 0
                      const animationDelay = (columnIndex * 100) + (projectIndex * 150)

                      return (
                        <article
                          key={project.id}
                          className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-[#00DEC7] hover:shadow-xl hover:-translate-y-2 transition-all duration-500 animate-fade-in-up"
                          style={{ animationDelay: `${animationDelay}ms`, animationFillMode: 'backwards' }}
                        >
                          {/* Image at top for some cards */}
                          {hasImageTop && (
                            <Link
                              href={`/trabajos/${project.slug}`}
                              className="relative overflow-hidden bg-gray-200 block"
                            >
                              {project.image && !project.image.includes("placeholder") ? (
                                <div className="relative aspect-[16/10] overflow-hidden">
                                  <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                </div>
                              ) : (
                                <div className="aspect-[16/10] bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                                  <span className="text-6xl font-bold text-white/30">{project.title.charAt(0)}</span>
                                </div>
                              )}
                            </Link>
                          )}
                          
                          {/* Content */}
                          <div className="p-6">
                            <div className="flex items-center gap-2 text-sm mb-3">
                              <span className="text-gray-500">{project.date}</span>
                              <span className="text-gray-300">|</span>
                              <Link
                                href={`/trabajos?category=${project.category}`}
                                className="text-amber-600 font-medium hover:text-[#00DEC7] transition-colors"
                              >
                                {project.categoryLabel}
                              </Link>
                            </div>
                            
                            <h3 className="text-lg font-bold text-black mb-3 leading-tight">
                              <Link
                                href={`/trabajos/${project.slug}`}
                                className="hover:text-[#00DEC7] transition-colors"
                              >
                                {project.title}
                              </Link>
                            </h3>
                            
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                              {project.description}
                            </p>

                            {/* Image in middle for some cards */}
                            {!hasImageTop && (
                              <Link
                                href={`/trabajos/${project.slug}`}
                                className="relative overflow-hidden rounded-lg mb-4 bg-gray-200 block"
                              >
                                {project.image && !project.image.includes("placeholder") ? (
                                  <div className="relative aspect-[16/10] overflow-hidden">
                                    <Image
                                      src={project.image}
                                      alt={project.title}
                                      fill
                                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                  </div>
                                ) : (
                                  <div className="aspect-[16/10] bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                                    <span className="text-5xl font-bold text-white/30">{project.title.charAt(0)}</span>
                                  </div>
                                )}
                              </Link>
                            )}
                            
                            <Link 
                              href={`/trabajos/${project.slug}`}
                              className="inline-flex items-center gap-1 text-sm font-medium text-black hover:text-[#00DEC7] transition-colors group/link"
                            >
                              Leer mas
                              <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </article>
                      )
                    })}
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-full border border-gray-200 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  
                  {renderPaginationNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={() => typeof page === "number" && setCurrentPage(page)}
                      disabled={page === "..."}
                      className={`min-w-[40px] h-10 rounded-full text-sm font-medium transition-all duration-200 ${
                        page === currentPage
                          ? "bg-[#00DEC7] text-black"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-full border border-gray-200 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}

export default function TrabajosPageClient({ initialProjects }: { initialProjects: Project[] }) {
  return (
    <Suspense fallback={<Loading />}>
      <TrabajosContent initialProjects={initialProjects} />
    </Suspense>
  )
}
