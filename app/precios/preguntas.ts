import { DESCUENTO_COMBO, DIAS_DE_PRUEBA, MESES_COBRADOS_EN_ANUAL, PRECIO_USUARIO_ADICIONAL, formatearPesos } from "@/lib/productos-vektra"

/** Preguntas frecuentes de /precios: las usan la página (acordeón) y el JSON-LD FAQPage. */
export const faqsPrecios = [
  {
    question: "¿Los precios incluyen IVA?",
    answer:
      "No. Son precios de lista en pesos argentinos, por mes y sin IVA. Te facturamos con factura A o B, según tu condición fiscal, con el 21 % de IVA.",
  },
  {
    question: "¿Cómo funciona el pago anual?",
    answer: `Si pagás el año por adelantado abonás ${MESES_COBRADOS_EN_ANUAL} meses y usás 12: es como tener dos meses sin cargo.`,
  },
  {
    question: "¿Cómo es la prueba gratis de Vektra ERP?",
    answer: `Al registrarte tenés ${DIAS_DE_PRUEBA} días con el plan Inicial y la aplicación de tu rubro. Cuando termina elegís el plan que te sirve. Si solo necesitás facturar poco, el plan Gratis no vence.`,
  },
  {
    question: "¿Puedo sumar usuarios sin cambiar de plan?",
    answer: `Sí: cada usuario por encima de los que trae tu plan cuesta ${formatearPesos(PRECIO_USUARIO_ADICIONAL)} por mes más IVA (no aplica al plan Gratis).`,
  },
  {
    question: "¿Los precios cambian?",
    answer: "Sí: los precios de lista están en pesos y se ajustan cada trimestre. Lo que ves en esta página es la lista vigente.",
  },
  {
    question: "¿Cuánto cuestan Vektra CRM y Vektra Hotel?",
    answer:
      "Todavía no tienen precio publicado: están en preparación y no vamos a anunciar una cifra que después cambie. Quienes se suman a la lista de espera reciben primero el precio de lanzamiento, en pesos.",
  },
  {
    question: "¿Cómo funcionan los combos?",
    answer: `Al contratar dos productos de Vektra tenés ${DESCUENTO_COMBO} % de descuento. Los precios finales de cada combo se publican cuando CRM y Hotel salgan a la venta.`,
  },
  {
    question: "¿Cuánto cuesta el asistente con IA?",
    answer:
      "Viene incluido en el plan Empresa. Como adicional de los planes Inicial y Pyme, su precio todavía está a confirmar.",
  },
]
