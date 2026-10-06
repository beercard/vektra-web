import { DESCUENTO_COMBO } from "@/lib/productos-vektra"

/** Preguntas frecuentes de Vektra Alquileres: las usan la página (acordeón) y el JSON-LD FAQPage. */
export const faqsAlquileres = [
  {
    question: "¿Puedo usar Vektra Alquileres hoy?",
    answer:
      "Todavía no: es un producto en preparación y no tiene fecha de salida. Sumate a la lista de espera para enterarte primero y contarnos cómo trabajás, que es lo que más nos ayuda a decidir qué construir primero.",
  },
  {
    question: "¿Para qué tipo de alquiler está pensado?",
    answer:
      "Para alquileres temporarios en Argentina y Paraguay: departamentos, casas y cabañas que publicás en Airbnb, Booking y otras plataformas, o que reservás de forma directa. Sirve si tenés una o dos unidades y también si sos una administradora con propiedades de varios dueños.",
  },
  {
    question: "¿Se conecta con Airbnb y Booking?",
    answer:
      "La idea es sincronizar los calendarios con Airbnb, Booking y otras plataformas por iCal, el formato estándar de calendarios, para ver todas las reservas en un solo lugar y evitar que una unidad se reserve dos veces. La conexión directa con las plataformas está en nuestra hoja de ruta; no tenemos acuerdos ni integraciones oficiales con ellas.",
  },
  {
    question: "¿Se sincroniza con Google Calendar?",
    answer:
      "Está planificado: vas a poder ver las reservas, ingresos, salidas y limpiezas en tu Google Calendar, junto con el resto de tu agenda.",
  },
  {
    question: "¿Funciona en Paraguay?",
    answer:
      "Sí, está pensado para Argentina y Paraguay. En Argentina los cobros van con Mercado Pago y la facturación electrónica ARCA sale de Vektra ERP. En Paraguay los cobros van con medios de pago locales y la facturación electrónica llega más adelante.",
  },
  {
    question: "¿Mientras tanto puedo facturar mis alquileres con Vektra?",
    answer:
      "En Argentina, sí: con Vektra ERP facturás con ARCA (facturas A, B y C con CAE), cobrás con links de pago y llevás caja, bancos e impuestos. Lo que va a sumar Vektra Alquileres es la gestión de reservas, unidades, limpiezas y propietarios.",
  },
  {
    question: "¿Sirve para administradoras con varios propietarios?",
    answer:
      "Está pensado para eso: cada unidad con su dueño y una liquidación por período con las reservas cobradas, tu comisión y los gastos. Es parte del plan y todavía no está construido.",
  },
  {
    question: "¿Cuánto va a costar?",
    answer:
      "Todavía no está definido. Pensamos que dependa de la cantidad de unidades que gestionás, en moneda local y sin permanencia. Quienes se anotan reciben primero el precio de lanzamiento.",
  },
  {
    question: "¿Hay descuento si lo combino con Vektra ERP?",
    answer: `Sí: ${DESCUENTO_COMBO} % al contratar dos productos de Vektra. Los precios de los combos se publican con el lanzamiento.`,
  },
]
