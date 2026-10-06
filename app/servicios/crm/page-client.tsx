"use client"

import { Bot, Columns3, House, Inbox, ListChecks, Receipt, Tags, Zap } from "lucide-react"

import { ProductoVektra, type ProductoVektraData } from "@/components/sections/producto-vektra"
import { DESCUENTO_COMBO, URL_CRM } from "@/lib/productos-vektra"
import { faqsCrm } from "./preguntas"

const data: ProductoVektraData = {
  icono: Inbox,
  rotulo: "Vektra CRM",
  estado: { texto: "Próximamente · lista de espera", disponible: false },
  h1: { antes: "Cada consulta, con dueño y", destacado: "próximo paso", despues: "el CRM omnicanal de Vektra" },
  bajada: (
    <>
      Vektra CRM junta las conversaciones de <strong className="text-white">WhatsApp</strong>, el{" "}
      <strong className="text-white">correo</strong> y los <strong className="text-white">formularios de tu web</strong>, las
      convierte en oportunidades de un embudo y le recuerda a tu equipo qué hacer con cada una. Cuando se cierra la venta, factura y
      cobra con Vektra ERP.
    </>
  ),
  aviso:
    "Vektra CRM todavía no se vende como producto independiente. Lo marcado como \"Ya funciona en Vektra ERP\" existe hoy dentro del ERP; lo marcado como \"Próximamente\" está planificado y no se promete como disponible.",
  ctaPrincipal: { texto: "Sumate a la lista de espera", href: URL_CRM },
  ctaSecundario: { texto: "Pedí una demo", href: "/contacto" },
  heroTarjetas: [
    { icono: Inbox, titulo: "Bandeja", detalle: "omnicanal" },
    { icono: Columns3, titulo: "Embudo", detalle: "por etapas" },
    { icono: Zap, titulo: "Automatizaciones", detalle: "para lo repetitivo" },
    { icono: Receipt, titulo: "Facturación", detalle: "con Vektra ERP" },
  ],
  marquee: [
    { text: "WhatsApp Business oficial", highlight: true },
    { text: "sin conexiones por QR" },
    { text: "Embudo de ventas", highlight: true },
    { text: "cuánta plata hay en juego por etapa" },
    { text: "Tareas con vencimiento", highlight: true },
    { text: "que ninguna consulta se enfríe" },
    { text: "Conectado con Vektra ERP", highlight: true },
    { text: "de la oportunidad a la factura" },
  ],
  beneficios: {
    titulo: "Que ninguna consulta se te enfríe",
    bajada: (
      <>
        Un solo lugar para <strong className="text-black">conversar, seguir y cerrar</strong> cada venta, pensado para equipos
        chicos y medianos.
      </>
    ),
    items: [
      {
        title: "Todo en una bandeja",
        description:
          "Las consultas de cada canal llegan al mismo lugar, con el historial del contacto al lado. Hoy WhatsApp, correo y formularios; Instagram y Facebook, próximamente.",
      },
      {
        title: "Un embudo que se entiende",
        description: "Arrastrás cada oportunidad por sus etapas, ves cuánta plata hay en juego y cuáles se enfriaron.",
      },
      {
        title: "Nadie sin respuesta",
        description: "Reparto entre vendedores, actividades con vencimiento y un resumen diario por correo con lo que toca hoy.",
      },
      {
        title: "Lo repetitivo, automático",
        description:
          "Un agente de IA contesta por WhatsApp lo de siempre y pasa a una persona lo delicado. Los disparadores por etapa están en camino.",
      },
      {
        title: "Números para decidir",
        description: "Pronóstico del embudo, tasa de cierre, motivos de pérdida y ventas por origen, sin armar planillas.",
      },
      {
        title: "De la venta a la factura",
        description:
          "Con Vektra ERP, la oportunidad ganada se vuelve presupuesto, factura con ARCA y cobro sin volver a cargar al cliente.",
      },
    ],
  },
  funciones: {
    titulo: "Qué va a hacer Vektra CRM",
    bajada: "Te mostramos qué ya funciona y qué está planificado, para que sepas exactamente qué esperar.",
    conEstados: true,
    etiquetaHoy: "Ya funciona en Vektra ERP",
    grupos: [
      {
        icono: Inbox,
        titulo: "Bandeja omnicanal",
        items: [
          { texto: "WhatsApp Business con la API oficial, plantillas y estado de entrega", estado: "hoy" },
          { texto: "Formularios web que crean la oportunidad y la reparten", estado: "hoy" },
          { texto: "Correo saliente desde la ficha, con plantillas", estado: "hoy" },
          { texto: "Instagram y Facebook (Messenger) en la misma bandeja", estado: "proximamente" },
          { texto: "Respuestas por correo dentro de la conversación", estado: "proximamente" },
        ],
      },
      {
        icono: Columns3,
        titulo: "Embudos de venta",
        items: [
          { texto: "Tablero por etapas para arrastrar, con el total en juego", estado: "hoy" },
          { texto: "Alertas de oportunidades estancadas o sin próxima acción", estado: "hoy" },
          { texto: "Varios embudos por empresa y vistas guardadas", estado: "proximamente" },
        ],
      },
      {
        icono: Zap,
        titulo: "Automatizaciones",
        items: [
          { texto: "Reparto rotativo de consultas entre vendedores", estado: "hoy" },
          { texto: "Resumen diario por correo con lo vencido y lo de hoy", estado: "hoy" },
          { texto: "Disparadores por etapa y reasignación si nadie responde", estado: "proximamente" },
          { texto: "Respuestas rápidas, mensajes programados y horario de atención", estado: "proximamente" },
        ],
      },
      {
        icono: Bot,
        titulo: "Asistente con IA",
        items: [
          { texto: "Agente de IA en WhatsApp para clientes que ya tenés, con derivación a una persona", estado: "hoy" },
          { texto: "Versión para consultas de venta: calificar y agendar", estado: "proximamente" },
          { texto: "Clasificación de cada consulta para repartirla mejor", estado: "proximamente" },
        ],
      },
      {
        icono: ListChecks,
        titulo: "Tareas y reportes",
        items: [
          { texto: "Llamadas, reuniones y tareas con vencimiento", estado: "hoy" },
          { texto: "Pronóstico, tasa de cierre y motivos de pérdida", estado: "hoy" },
          { texto: "Tiempo de primera respuesta por canal y vendedor", estado: "proximamente" },
          { texto: "App instalable con notificaciones", estado: "proximamente" },
        ],
      },
      {
        icono: Receipt,
        titulo: "Integración con Vektra ERP",
        items: [
          { texto: "Clientes compartidos entre el CRM y el ERP", estado: "hoy" },
          { texto: "Presupuesto desde la oportunidad", estado: "hoy" },
          { texto: "Factura con ARCA y cobranza al ganar la venta", estado: "hoy" },
          { texto: "Saldo del cliente a la vista mientras le contestás", estado: "proximamente" },
        ],
      },
    ],
  },
  pasos: {
    titulo: "Cómo va a funcionar",
    bajada: (
      <>
        <strong className="text-white font-bold">Tres pasos</strong> para que cada consulta termine en una{" "}
        <strong className="text-white font-bold">venta facturada</strong>.
      </>
    ),
    items: [
      {
        step: "01",
        title: "Conectá",
        subtitle: "tus canales",
        description: "Sumás tu WhatsApp Business, el formulario de tu web y tu correo. Instagram y Facebook se suman cuando estén listos.",
      },
      {
        step: "02",
        title: "Las consultas",
        subtitle: "se vuelven oportunidades",
        description: "Cada contacto nuevo entra al embudo con su origen, se reparte entre tu equipo y queda con una próxima acción agendada.",
      },
      {
        step: "03",
        title: "Seguí, cerrá",
        subtitle: "y facturá",
        description: "Conversás, agendás, movés la oportunidad de etapa y, al ganarla, emitís el presupuesto o la factura desde Vektra ERP.",
      },
    ],
  },
  paraQuien: {
    titulo: "¿Para quién es Vektra CRM?",
    bajada: "Para equipos que reciben consultas por varios canales y necesitan que ninguna quede sin seguimiento.",
    items: [
      { titulo: "Inmobiliarias", texto: "Consultas por cada propiedad desde tu web y WhatsApp, con visitas agendadas como actividades." },
      { titulo: "Concesionarias y agencias de autos", texto: "Seguimiento de cada interesado hasta la prueba de manejo y el cierre." },
      { titulo: "Educación e institutos", texto: "Consultas de inscripción por WhatsApp y formularios, repartidas entre el equipo." },
      { titulo: "Salud: consultorios y clínicas", texto: "Pacientes nuevos que escriben por varios canales y necesitan respuesta rápida." },
      { titulo: "Servicios profesionales y agencias", texto: "Propuestas con próxima acción y un embudo claro de lo que está por cerrarse." },
      { titulo: "E-commerce y venta por catálogo", texto: "Consultas de WhatsApp que terminan en presupuesto, factura y cobro con Vektra ERP." },
    ],
  },
  precio: {
    titulo: "Precio de lanzamiento: sumate a la lista de espera",
    texto: "Vektra CRM todavía no tiene precio publicado. Quienes se anotan reciben primero el precio de lanzamiento, en pesos.",
    detalle: `${DESCUENTO_COMBO} % de descuento al combinarlo con otro producto de Vektra.`,
  },
  faqs: faqsCrm,
  faqSubtitulo: "Vektra CRM",
  cierre: {
    titulo: "Anotate en la lista de espera",
    bajada: "Contanos cómo vendés hoy y por qué canales te escriben: vamos a priorizar lo que más nos pidan.",
  },
  complementos: [
    {
      title: "Vektra ERP",
      subtitle: "Disponible · prueba gratis",
      features: ["Facturación electrónica ARCA", "Ventas, stock y compras", "Cobros online", "Impuestos y contabilidad"],
      href: "/servicios/erp",
      icon: Receipt,
    },
    {
      title: "Vektra Alquileres",
      subtitle: "Próximamente · lista de espera",
      features: ["Alquileres temporarios", "Argentina y Paraguay", "Calendario de todas las plataformas", "Limpiezas y propietarios"],
      href: "/servicios/alquileres",
      icon: House,
    },
    {
      title: "Precios",
      subtitle: "Planes y combos",
      features: ["Planes de Vektra ERP", "Precio de lanzamiento de CRM y Alquileres", `${DESCUENTO_COMBO} % al combinar productos`, "Pago en pesos"],
      href: "/precios",
      icon: Tags,
    },
  ],
}

export default function CrmPageClient() {
  return <ProductoVektra data={data} />
}
