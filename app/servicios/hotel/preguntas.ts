import { DESCUENTO_COMBO } from "@/lib/productos-vektra"

/** Preguntas frecuentes de Vektra Hotel: las usan la página (acordeón) y el JSON-LD FAQPage. */
export const faqsHotel = [
  {
    question: "¿Puedo usar Vektra Hotel hoy?",
    answer:
      "Todavía no: es un producto en preparación y no tiene fecha de salida. Sumate a la lista de espera para enterarte primero y contarnos cómo trabajás, que es lo que más nos ayuda a decidir qué construir primero.",
  },
  {
    question: "¿Para qué tipo de alquiler está pensado?",
    answer:
      "Para alquileres temporarios: departamentos, casas y cabañas que publicás en Airbnb, Booking y otras plataformas, o que reservás de forma directa. Sirve tanto si tenés una o dos unidades como si sos una administradora que gestiona propiedades de varios dueños.",
  },
  {
    question: "¿Se conecta con Airbnb y Booking?",
    answer:
      "La idea es sincronizar los calendarios con las plataformas para ver todas las reservas en un solo lugar y evitar que una unidad se reserve dos veces. Todavía no hay ninguna integración confirmada y no anunciamos conexiones oficiales hasta que existan.",
  },
  {
    question: "¿Mientras tanto puedo facturar mis alquileres con Vektra?",
    answer:
      "Sí: con Vektra ERP facturás con ARCA (facturas A, B y C con CAE), cobrás con links de pago y llevás caja, bancos e impuestos. Lo que va a sumar Vektra Hotel es la gestión de reservas, unidades, limpiezas y propietarios.",
  },
  {
    question: "¿Sirve para administradoras con varios propietarios?",
    answer:
      "Está pensado para eso: cada unidad con su dueño, y una liquidación por período con las reservas cobradas, tu comisión y los gastos. Es parte del plan y todavía no está construido.",
  },
  {
    question: "¿Y a turistas extranjeros?",
    answer:
      "El alojamiento de turistas extranjeros tiene un régimen de IVA con comprobante propio. Hoy Vektra ERP no lo emite y lo estamos analizando con nuestro equipo fiscal. No lo vamos a anunciar como disponible hasta que funcione.",
  },
  {
    question: "¿Cuánto va a costar?",
    answer:
      "Todavía no está definido. Pensamos que dependa de la cantidad de unidades que gestionás, en pesos y sin permanencia. Quienes se anotan reciben primero el precio de lanzamiento.",
  },
  {
    question: "¿Hay descuento si lo combino con Vektra ERP?",
    answer: `Sí: ${DESCUENTO_COMBO} % al contratar dos productos de Vektra. Los precios de los combos se publican con el lanzamiento.`,
  },
]
