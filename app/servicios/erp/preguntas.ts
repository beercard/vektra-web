import { DESCUENTO_COMBO, DIAS_DE_PRUEBA, MESES_COBRADOS_EN_ANUAL } from "@/lib/productos-vektra"

/** Preguntas frecuentes de Vektra ERP: las usan la página (acordeón) y el JSON-LD FAQPage. */
export const faqsErp = [
  {
    question: "¿Puedo probar Vektra ERP gratis?",
    answer: `Sí. Te registrás y tenés ${DIAS_DE_PRUEBA} días de prueba con el plan Inicial y la aplicación de tu rubro. Además existe el plan Gratis, sin vencimiento, para facturar con un usuario y hasta 20 comprobantes por mes.`,
  },
  {
    question: "¿Qué comprobantes puedo emitir con ARCA?",
    answer:
      "Facturas, notas de crédito y notas de débito A, B y C con CAE, según tu condición fiscal: un monotributista emite C y un responsable inscripto emite A o B según a quién le vende. También Factura de Crédito Electrónica MiPyME, comprobantes A de la RG 5762 y facturas en dólares.",
  },
  {
    question: "¿Qué pasa si ARCA no responde al facturar?",
    answer:
      "El comprobante queda pendiente y el sistema lo verifica después contra ARCA, así no se duplica ni se pierde el número.",
  },
  {
    question: "¿Necesito instalar algo?",
    answer:
      "No. Vektra ERP funciona en la nube: entrás desde el navegador de la computadora o del celular, con tu usuario. Cada empresa tiene sus datos aislados de las demás y cada persona ve lo que su rol le permite.",
  },
  {
    question: "¿Con qué medios puedo cobrar online?",
    answer:
      "Mandás links de pago por las facturas, por un importe a cuenta o por todo el saldo, y el cliente paga con Mercado Pago, Payway, GoCuotas o Clover. También podés debitar por CBU. Cuando el pago se acredita, el recibo se emite y se imputa solo.",
  },
  {
    question: "¿Cuánto cuesta?",
    answer: `Hay un plan Gratis y planes pagos desde $39.900 por mes más IVA, en pesos. Si pagás el año por adelantado, abonás ${MESES_COBRADOS_EN_ANUAL} meses. Los precios de lista se actualizan cada trimestre; el detalle está en la página de precios.`,
  },
  {
    question: "¿Servicio técnico es otro producto?",
    answer:
      "No: es una aplicación adicional del ERP. Se contrata desde la suscripción y trabaja con los mismos clientes, el mismo stock y la misma facturación. Incluye órdenes de servicio, calendario, la app del técnico que funciona sin señal y el mapa de visitas.",
  },
  {
    question: "¿El ERP incluye el CRM?",
    answer: `No: Vektra CRM es un producto aparte, que todavía está en lista de espera. Cuando lo combines con el ERP vas a tener ${DESCUENTO_COMBO} % de descuento por combo.`,
  },
  {
    question: "¿Puedo traer mis datos del sistema que uso hoy?",
    answer:
      "Sí. Desde el plan Inicial importás clientes y artículos desde Excel; el plan Pyme incluye la migración de saldos iniciales y el plan Empresa, una migración asistida desde el sistema anterior.",
  },
  {
    question: "¿Cómo funciona el asistente con IA?",
    answer:
      "Es un adicional que viene incluido en el plan Empresa; para los demás planes, el precio todavía está a confirmar. Se activa cuando un administrador acepta cómo se tratan los datos que se envían al servicio de IA, solo consulta (no modifica nada) y ve únicamente lo que permite el rol de quien pregunta.",
  },
]
