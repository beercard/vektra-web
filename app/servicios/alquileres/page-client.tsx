"use client"

import { CalendarDays, Globe, House, Inbox, MessageCircle, Receipt, SprayCan, Tags, Users } from "lucide-react"

import { ProductoVektra, type ProductoVektraData } from "@/components/sections/producto-vektra"
import { DESCUENTO_COMBO, URL_ALQUILERES } from "@/lib/productos-vektra"
import { faqsAlquileres } from "./preguntas"

const data: ProductoVektraData = {
  icono: House,
  rotulo: "Vektra Alquileres",
  estado: { texto: "Próximamente · lista de espera", disponible: false },
  h1: { antes: "Todos tus alquileres temporarios en", destacado: "un solo calendario", despues: "en Argentina y Paraguay" },
  bajada: (
    <>
      Estamos preparando Vektra Alquileres para administrar <strong className="text-white">alquileres temporarios</strong> en Argentina y Paraguay: las reservas de{" "}
      <strong className="text-white">todas las plataformas</strong> y las directas en un calendario, las{" "}
      <strong className="text-white">limpiezas</strong> entre estadías, los <strong className="text-white">propietarios</strong>, los cobros y la
      facturación electrónica con Vektra ERP.
    </>
  ),
  aviso:
    "Vektra Alquileres está en preparación y no tiene fecha de salida: lo que describimos acá es el plan, no algo que puedas usar hoy. Mientras tanto, en Argentina Vektra ERP ya factura tus alquileres con ARCA.",
  ctaPrincipal: { texto: "Sumate a la lista de espera", href: URL_ALQUILERES },
  ctaSecundario: { texto: "Contanos cómo trabajás", href: "/contacto" },
  heroTarjetas: [
    { icono: CalendarDays, titulo: "Calendario", detalle: "de todas las plataformas" },
    { icono: SprayCan, titulo: "Limpiezas", detalle: "entre estadías" },
    { icono: Users, titulo: "Propietarios", detalle: "y liquidaciones" },
    { icono: Receipt, titulo: "Facturación", detalle: "ARCA con Vektra ERP" },
  ],
  marquee: [
    { text: "Calendario unificado", highlight: true },
    { text: "Airbnb, Booking y Google Calendar" },
    { text: "Limpieza entre estadías", highlight: true },
    { text: "cada salida con su tarea" },
    { text: "Liquidación a propietarios", highlight: true },
    { text: "para administradoras" },
    { text: "Argentina y Paraguay", highlight: true },
    { text: "cobros y facturación locales" },
  ],
  beneficios: {
    titulo: "Lo que estamos construyendo",
    bajada: (
      <>
        Un sistema pensado para <strong className="text-black">anfitriones y administradoras</strong> de alquileres temporarios en
        Argentina y Paraguay, con la facturación y los cobros de un ERP que ya funciona.
      </>
    ),
    items: [
      {
        title: "Un calendario para todas las plataformas",
        description: "Las reservas de Airbnb, Booking, otras plataformas y las directas, por unidad y por día, en una sola grilla.",
      },
      {
        title: "Pensado para no reservar dos veces",
        description: "Sincronización de calendarios por iCal con las plataformas para que, cuando una unidad se ocupa en una, quede bloqueada en las demás.",
      },
      {
        title: "Reservas directas",
        description: "Tus huéspedes de siempre reservan por tu propio enlace y pagan la seña online, sin comisión de plataforma.",
      },
      {
        title: "Huéspedes bien atendidos",
        description: "Mensajes con las instrucciones de llegada, recordatorios y datos de la estadía, sin escribir lo mismo cada vez.",
      },
      {
        title: "Limpieza entre estadías",
        description: "Cada salida genera la tarea de limpieza de la unidad, con el estado a la vista desde el celular del personal.",
      },
      {
        title: "Propietarios en orden",
        description: "Para administradoras: cada unidad con su dueño y una liquidación por período con reservas, comisión y gastos.",
      },
    ],
  },
  funciones: {
    titulo: "Qué va a hacer Vektra Alquileres",
    bajada: "Todo lo que sigue está planificado. Lo único disponible hoy es la facturación y la gestión de Vektra ERP, en Argentina.",
    conEstados: true,
    etiquetaHoy: "Hoy con Vektra ERP",
    grupos: [
      {
        icono: CalendarDays,
        titulo: "Calendario y disponibilidad",
        items: [
          { texto: "Calendario unificado por unidad con las reservas de todas las plataformas", estado: "proximamente" },
          { texto: "Sincronización de calendarios por iCal con Airbnb, Booking y otras plataformas", estado: "proximamente" },
          { texto: "Sincronización con Google Calendar", estado: "proximamente" },
          { texto: "Conexión directa con las plataformas: en nuestra hoja de ruta", estado: "proximamente" },
        ],
      },
      {
        icono: Globe,
        titulo: "Reservas directas",
        items: [
          { texto: "Enlace de reserva propio con disponibilidad y tarifa", estado: "proximamente" },
          { texto: "Cobro de la seña online al reservar", estado: "proximamente" },
          { texto: "Tarifas por temporada y estadía mínima", estado: "proximamente" },
        ],
      },
      {
        icono: MessageCircle,
        titulo: "Mensajes a huéspedes",
        items: [
          { texto: "Instrucciones de llegada y datos de la estadía", estado: "proximamente" },
          { texto: "Recordatorios antes del ingreso y de la salida", estado: "proximamente" },
          { texto: "Ficha de cada huésped con su historial", estado: "proximamente" },
        ],
      },
      {
        icono: SprayCan,
        titulo: "Limpieza y mantenimiento",
        items: [
          { texto: "Tarea de limpieza automática en cada salida", estado: "proximamente" },
          { texto: "Estados de cada unidad: sucia, limpia y lista", estado: "proximamente" },
          { texto: "Vista para el celular del personal", estado: "proximamente" },
        ],
      },
      {
        icono: Users,
        titulo: "Propietarios",
        items: [
          { texto: "Unidades con su propietario y comisión", estado: "proximamente" },
          { texto: "Liquidación por período con reservas cobradas y gastos", estado: "proximamente" },
          { texto: "Resumen para enviar a cada dueño", estado: "proximamente" },
        ],
      },
      {
        icono: Receipt,
        titulo: "Cobros y facturación",
        items: [
          { texto: "Argentina: facturación electrónica ARCA de tus alquileres", estado: "hoy" },
          { texto: "Argentina: links de pago con Mercado Pago, caja, bancos e impuestos", estado: "hoy" },
          { texto: "Paraguay: cobros con medios de pago locales", estado: "proximamente" },
          { texto: "Paraguay: facturación electrónica", estado: "proximamente" },
          { texto: "Factura de cada estadía sin volver a cargar datos", estado: "proximamente" },
        ],
      },
    ],
  },
  pasos: {
    titulo: "Cómo va a funcionar",
    bajada: (
      <>
        <strong className="text-white font-bold">Tres pasos</strong> desde la publicación hasta la{" "}
        <strong className="text-white font-bold">factura y la liquidación</strong>.
      </>
    ),
    items: [
      {
        step: "01",
        title: "Cargá",
        subtitle: "tus unidades",
        description: "Departamentos, casas o cabañas, con su propietario si administrás de terceros, y los calendarios de las plataformas donde los publicás.",
      },
      {
        step: "02",
        title: "Mirá todo",
        subtitle: "en un calendario",
        description: "Las reservas de las plataformas y las directas en la misma grilla, con las limpiezas y los mensajes a huéspedes organizados.",
      },
      {
        step: "03",
        title: "Cobrá, facturá",
        subtitle: "y liquidá",
        description: "Registrás los cobros, facturás con Vektra ERP en Argentina y, si administrás de terceros, liquidás a cada propietario.",
      },
    ],
  },
  paraQuien: {
    titulo: "¿Para quién es Vektra Alquileres?",
    bajada: "Para quienes alquilan por temporada en Argentina y Paraguay y hoy se organizan con planillas, grupos de WhatsApp y varios calendarios sueltos.",
    items: [
      { titulo: "Anfitriones con pocas unidades", texto: "Uno o varios departamentos publicados en más de una plataforma, sin cruzar calendarios a mano." },
      { titulo: "Administradoras de alquileres", texto: "Propiedades de varios dueños, con comisión, gastos y una liquidación clara para cada uno." },
      { titulo: "Cabañas y complejos", texto: "Varias unidades, reservas por temporada y cobro de seña a distancia." },
      { titulo: "Casas de veraneo", texto: "Alquileres por temporada con limpieza, entrega de llaves y mensajes a los huéspedes." },
      { titulo: "Departamentos para estadías cortas", texto: "Mucha rotación, limpiezas seguidas y huéspedes que necesitan instrucciones claras." },
      { titulo: "Inmobiliarias con alquiler temporario", texto: "Que suman unidades de temporada a su cartera y necesitan ordenarlas aparte." },
    ],
  },
  precio: {
    titulo: "Precio de lanzamiento: sumate a la lista de espera",
    texto: "Vektra Alquileres todavía no tiene precio publicado. Quienes se anotan reciben primero el precio de lanzamiento.",
    detalle: `${DESCUENTO_COMBO} % de descuento al combinarlo con otro producto de Vektra.`,
  },
  faqs: faqsAlquileres,
  faqSubtitulo: "Vektra Alquileres",
  cierre: {
    titulo: "Contanos cómo trabajás y armamos Vektra Alquileres con vos",
    bajada: "Anotate en la lista de espera: vamos a priorizar lo que más nos pidan y los primeros de la lista lo prueban antes.",
  },
  complementos: [
    {
      title: "Vektra ERP",
      subtitle: "Disponible · prueba gratis",
      features: ["Facturación electrónica ARCA", "Cobros online", "Caja, bancos e impuestos", "Contabilidad automática"],
      href: "/servicios/erp",
      icon: Receipt,
    },
    {
      title: "Vektra CRM",
      subtitle: "Próximamente · lista de espera",
      features: ["Bandeja de WhatsApp, correo y formularios", "Embudo de ventas por etapas", "Tareas con vencimiento", "Factura y cobro con Vektra ERP"],
      href: "/servicios/crm",
      icon: Inbox,
    },
    {
      title: "Precios",
      subtitle: "Planes y combos",
      features: ["Planes de Vektra ERP", "Precio de lanzamiento de CRM y Alquileres", `${DESCUENTO_COMBO} % al combinar productos`, "Pago en moneda local"],
      href: "/precios",
      icon: Tags,
    },
  ],
}

export default function AlquileresPageClient() {
  return <ProductoVektra data={data} />
}
