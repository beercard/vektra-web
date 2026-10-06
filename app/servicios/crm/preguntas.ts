import { DESCUENTO_COMBO } from "@/lib/productos-vektra"

/** Preguntas frecuentes de Vektra CRM: las usan la página (acordeón) y el JSON-LD FAQPage. */
export const faqsCrm = [
  {
    question: "¿Puedo usar Vektra CRM hoy?",
    answer:
      "Como producto independiente, todavía no: abrimos una lista de espera. Parte de lo que ves acá (embudo, actividades, WhatsApp, correo y formulario web) ya funciona dentro de Vektra ERP y te lo podemos mostrar en una demo.",
  },
  {
    question: "¿Qué canales va a tener?",
    answer:
      "Hoy funcionan WhatsApp Business con la API oficial, el correo saliente y los formularios web. Instagram, Facebook (Messenger) y el correo entrante están planificados, y no los damos por disponibles hasta que funcionen.",
  },
  {
    question: "¿Usan WhatsApp Business oficial o conexión por QR?",
    answer:
      "Solo la API oficial de WhatsApp Business. No usamos conexiones por QR ni herramientas no oficiales, porque pueden hacer que te bloqueen el número.",
  },
  {
    question: "¿Necesito Vektra ERP para usar el CRM?",
    answer:
      "No: es un producto aparte, con su propia dirección. Si además usás Vektra ERP, los clientes se comparten y pasás de la oportunidad ganada al presupuesto, la factura y el cobro sin volver a cargar datos.",
  },
  {
    question: "¿Cuánto va a costar?",
    answer:
      "Todavía no está definido y no vamos a publicar una cifra que después cambie. Pensamos que dependa de cuántas personas atienden consultas, en pesos y sin permanencia. Quienes se suman a la lista de espera reciben primero el precio de lanzamiento.",
  },
  {
    question: "¿Hay descuento si lo combino con otro producto de Vektra?",
    answer: `Sí: ${DESCUENTO_COMBO} % al contratar dos productos de Vektra. Los precios de los combos se publican con el lanzamiento.`,
  },
  {
    question: "¿El asistente con IA contesta solo a mis clientes?",
    answer:
      "Hoy hay un agente de IA en WhatsApp pensado para atender a clientes que ya tenés (cuenta corriente, facturas, servicio), que siempre puede derivar a una persona. La versión para consultas de venta está planificada y todavía no existe.",
  },
  {
    question: "¿Cómo me sumo a la lista de espera?",
    answer:
      "Entrá a crm.vektra.digital y contanos cuántas personas atienden consultas, por qué canales te escriben y qué usás hoy. Te respondemos por correo.",
  },
]
