/**
 * Datos comerciales de los productos propios de Vektra (ERP, CRM y Alquileres) que usan /precios y
 * /servicios/{erp,crm,alquileres}.
 *
 * Fuente de verdad: el repositorio del ERP (`src/lib/planes.ts` y `src/components/sitio/productos.ts`). Si cambia un
 * precio, un límite o lo que incluye un plan allá, se actualiza acá: este sitio no inventa cifras. El CRM y Alquileres
 * todavía no tienen precio publicado, por eso no figuran montos ni ofertas para ellos.
 */

export const URL_ERP = "https://erp.vektra.digital"
export const URL_ERP_REGISTRO = "https://erp.vektra.digital/registro"
export const URL_CRM = "https://crm.vektra.digital"
/** Vektra Alquileres (antes Vektra Hotel): la lista de espera sigue en el subdominio hotel por ahora. */
export const URL_ALQUILERES = "https://alquileres.vektra.digital"

/** Días de prueba gratis del ERP (plan Inicial más la aplicación del rubro). */
export const DIAS_DE_PRUEBA = 15
/** En el pago anual se cobran 10 meses. */
export const MESES_COBRADOS_EN_ANUAL = 10
/** Descuento al contratar dos productos de Vektra. Los precios de los combos todavía no están publicados. */
export const DESCUENTO_COMBO = 20
/** Cada usuario por encima de los que trae el plan, por mes y sin IVA. */
export const PRECIO_USUARIO_ADICIONAL = 14_900

export interface PlanErp {
  id: "gratis" | "inicial" | "pyme" | "empresa"
  nombre: string
  lema: string
  /** Pesos por mes, sin IVA. */
  precioMensual: number
  usuarios: number
  /** null = sin límite. */
  comprobantesMes: number | null
  puntosVenta: number
  /** Lo que suma respecto del plan anterior (el primero lista todo). */
  incluye: string[]
  beneficios: string[]
  admiteAdicionales: boolean
  destacado?: boolean
}

export const PLANES_ERP: PlanErp[] = [
  {
    id: "gratis",
    nombre: "Gratis",
    lema: "Para facturar desde el primer día, sin pagar.",
    precioMensual: 0,
    usuarios: 1,
    comprobantesMes: 20,
    puntosVenta: 1,
    incluye: ["Facturación electrónica con CAE de ARCA", "Notas de crédito y débito", "Cobranzas y cuentas corrientes"],
    beneficios: ["Ayuda en línea", "Sin vencimiento"],
    admiteAdicionales: false,
  },
  {
    id: "inicial",
    nombre: "Inicial",
    lema: "Comercio o profesional que vende, factura y controla stock.",
    precioMensual: 39_900,
    usuarios: 2,
    comprobantesMes: 300,
    puntosVenta: 2,
    incluye: ["Todo lo del plan Gratis", "Presupuestos, pedidos y remitos", "Stock por depósito, ajustes y transferencias"],
    beneficios: ["Soporte por email en el día", "Importación de clientes y artículos desde Excel"],
    admiteAdicionales: true,
  },
  {
    id: "pyme",
    nombre: "Pyme",
    lema: "La gestión completa: ventas, compras, pagos, bancos e impuestos.",
    precioMensual: 129_900,
    usuarios: 5,
    comprobantesMes: 1_500,
    puntosVenta: 5,
    incluye: [
      "Todo lo del plan Inicial",
      "Compras, Mis Comprobantes y órdenes de pago con retenciones",
      "Lectura de facturas de proveedores con IA",
      "Tesorería: cajas, bancos, cheques y ECHEQ",
      "Impuestos, Libro IVA Digital y contabilidad",
    ],
    beneficios: ["Soporte por email y WhatsApp", "Una hora de capacitación al empezar", "Migración de saldos iniciales"],
    admiteAdicionales: true,
    destacado: true,
  },
  {
    id: "empresa",
    nombre: "Empresa",
    lema: "Más usuarios, permisos a medida e integraciones.",
    precioMensual: 259_900,
    usuarios: 15,
    comprobantesMes: null,
    puntosVenta: 20,
    incluye: ["Todo lo del plan Pyme", "Roles y permisos a medida", "API e integraciones", "Asistente IA incluido"],
    beneficios: [
      "Soporte prioritario con responsable asignado",
      "Capacitación por rol",
      "Migración asistida desde el sistema anterior",
    ],
    admiteAdicionales: true,
  },
]

export interface AdicionalErp {
  nombre: string
  detalle: string
  /** null = precio a confirmar. */
  precioMensual: number | null
  desde: string
  nota?: string
}

export const ADICIONALES_ERP: AdicionalErp[] = [
  {
    nombre: "Servicio técnico",
    detalle: "Órdenes de servicio, calendario de técnicos, app del técnico (también sin señal), preventivos, mapa y portal de clientes.",
    precioMensual: 49_900,
    desde: "Inicial",
  },
  {
    nombre: "Tiendas online y Mercado Libre",
    detalle: "Mercado Libre, Tienda Nube, WooCommerce, Shopify, Magento y PrestaShop con stock y precios al día y pedidos que entran solos.",
    precioMensual: 39_900,
    desde: "Inicial",
  },
  {
    nombre: "Contratos y parque instalado",
    detalle: "Contratos de alquiler o abono por equipo, lecturas de contadores y facturación mensual por copias o abonos.",
    precioMensual: 29_900,
    desde: "Pyme",
  },
  {
    nombre: "Asistente IA",
    detalle: "Preguntale al sistema por ventas, deudas, stock y caja, o cómo se hace algo. Se activa con la aceptación de un administrador.",
    precioMensual: null,
    desde: "Inicial",
    nota: "Incluido en el plan Empresa",
  },
]

/** $ 39.900 — separador de miles con punto, sin depender del ICU del entorno (evita diferencias de hidratación). */
export function formatearPesos(n: number) {
  return `$${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
}

export const precioAnual = (precioMensual: number) => precioMensual * MESES_COBRADOS_EN_ANUAL
