"use client"

import {
  Boxes,
  Calculator,
  CreditCard,
  House,
  Inbox,
  Landmark,
  MessageCircle,
  Receipt,
  ShoppingCart,
  Store,
  Tags,
  Wrench,
} from "lucide-react"

import { ProductoVektra, type ProductoVektraData } from "@/components/sections/producto-vektra"
import { DIAS_DE_PRUEBA, URL_ERP, URL_ERP_REGISTRO } from "@/lib/productos-vektra"
import { faqsErp } from "./preguntas"

const data: ProductoVektraData = {
  icono: Receipt,
  rotulo: "Vektra ERP",
  estado: { texto: "Disponible", disponible: true },
  h1: { antes: "El sistema de gestión de", destacado: "tu pyme", despues: "en la nube y con facturación ARCA" },
  bajada: (
    <>
      Todo lo de todos los días en un solo sistema: <strong className="text-white">facturás con ARCA</strong>, controlás el{" "}
      <strong className="text-white">stock</strong>, <strong className="text-white">cobrás y pagás</strong>, y los{" "}
      <strong className="text-white">impuestos y la contabilidad</strong> salen solos.
    </>
  ),
  ctaPrincipal: { texto: `Probalo gratis ${DIAS_DE_PRUEBA} días`, href: URL_ERP_REGISTRO },
  ctaSecundario: { texto: "Conocé Vektra ERP", href: URL_ERP },
  heroTarjetas: [
    { icono: Receipt, titulo: "Facturas", detalle: "con CAE de ARCA" },
    { icono: Boxes, titulo: "Stock", detalle: "por depósito" },
    { icono: CreditCard, titulo: "Cobros", detalle: "online y por CBU" },
    { icono: Calculator, titulo: "Impuestos", detalle: "y contabilidad" },
  ],
  marquee: [
    { text: "Facturación electrónica ARCA", highlight: true },
    { text: "facturas A, B y C con CAE" },
    { text: "Stock y compras", highlight: true },
    { text: "facturas de proveedores leídas con IA" },
    { text: "Tesorería", highlight: true },
    { text: "cajas, bancos, cheques y ECHEQ" },
    { text: "Impuestos y contabilidad", highlight: true },
    { text: "Libro IVA Digital y asientos automáticos" },
  ],
  beneficios: {
    titulo: "Todo tu negocio en un solo sistema",
    bajada: (
      <>
        Vektra ERP está hecho para <strong className="text-black">pymes argentinas</strong>: habla el idioma de ARCA, de tu banco y
        de tu contador.
      </>
    ),
    items: [
      {
        title: "Facturación electrónica con ARCA",
        description:
          "Facturas, notas de crédito y débito A, B y C según tu condición fiscal, FCE MiPyME y comprobantes A de la RG 5762, con CAE y sin duplicados aunque ARCA no responda.",
      },
      {
        title: "Ventas de punta a punta",
        description:
          "Presupuestos, pedidos y remitos con entregas parciales y PDF con tu logo, que mandás por email o por WhatsApp.",
      },
      {
        title: "Cobros online",
        description:
          "Links de pago con Mercado Pago, Payway, GoCuotas o Clover y débito directo por CBU. Cuando entra el pago, el recibo se emite y se imputa solo.",
      },
      {
        title: "Stock en orden",
        description:
          "Stock por depósito calculado desde los movimientos, transferencias, ajustes, fotos de artículos, listas de precios y reposición.",
      },
      {
        title: "Compras sin tipear",
        description:
          "Importás Mis Comprobantes de ARCA y la IA lee las facturas, remitos y tiques que subís o mandás por WhatsApp. Una persona revisa antes de registrar.",
      },
      {
        title: "Tesorería al día",
        description: "Caja por turnos con reporte Z, bancos y billeteras, cheques y ECHEQ, conciliación bancaria y vales a rendir.",
      },
      {
        title: "Impuestos sin planillas",
        description:
          "Libro IVA Digital, posición de IVA, Ingresos Brutos con padrones, COT de ARBA, retenciones y SICORE, y un paquete listo para tu contador.",
      },
      {
        title: "Contabilidad automática",
        description: "Cada operación genera su asiento. Libros, balances, controles y cierre de ejercicio sin cargar dos veces.",
      },
    ],
  },
  funciones: {
    titulo: "Qué hace Vektra ERP",
    bajada: "Los planes traen el núcleo de la gestión y las aplicaciones adicionales se suman cuando las necesitás.",
    grupos: [
      {
        icono: Receipt,
        titulo: "Ventas y facturación",
        items: [
          { texto: "Facturas A, B y C con CAE, notas de crédito y débito" },
          { texto: "Factura de Crédito Electrónica MiPyME" },
          { texto: "Presupuestos, pedidos y remitos con PDF de diseño" },
          { texto: "Facturas recurrentes y facturación masiva desde planilla" },
          { texto: "Facturación en dólares" },
        ],
      },
      {
        icono: CreditCard,
        titulo: "Cobranzas y cobros online",
        items: [
          { texto: "Cuentas corrientes y recibos imputados" },
          { texto: "Links de pago: Mercado Pago, Payway, GoCuotas y Clover" },
          { texto: "Débito directo por CBU" },
          { texto: "Recordatorios de vencimiento por correo y WhatsApp" },
          { texto: "Intereses por mora en nota de débito borrador" },
        ],
      },
      {
        icono: Boxes,
        titulo: "Stock",
        items: [
          { texto: "Stock por depósito, calculado desde los movimientos" },
          { texto: "Remitos con entregas parciales y transferencias" },
          { texto: "Fotos de artículos y listas de precios derivadas" },
          { texto: "Reposición con órdenes de compra por proveedor" },
        ],
      },
      {
        icono: ShoppingCart,
        titulo: "Compras y pagos",
        items: [
          { texto: "Importación y control de Mis Comprobantes de ARCA" },
          { texto: "Lectura de facturas, remitos y tiques con IA" },
          { texto: "Órdenes de compra y recepción de mercadería" },
          { texto: "Órdenes de pago con retenciones de Ganancias e IIBB" },
        ],
      },
      {
        icono: Landmark,
        titulo: "Tesorería",
        items: [
          { texto: "Caja por turnos con reporte Z" },
          { texto: "Cajas, bancos y billeteras" },
          { texto: "Cheques y ECHEQ" },
          { texto: "Conciliación bancaria y cierre de períodos" },
        ],
      },
      {
        icono: Calculator,
        titulo: "Impuestos y contabilidad",
        items: [
          { texto: "Libro IVA Digital y posición de IVA del mes" },
          { texto: "Ingresos Brutos, padrones y COT de ARBA" },
          { texto: "Retenciones y SICORE" },
          { texto: "Asientos automáticos, libros y balances" },
        ],
      },
      {
        icono: Wrench,
        titulo: "Servicio técnico (adicional)",
        items: [
          { texto: "Órdenes de trabajo con formularios propios" },
          { texto: "Calendario de técnicos y preventivos" },
          { texto: "App del técnico que funciona sin señal" },
          { texto: "Mapa, rutas y portal de clientes" },
        ],
      },
      {
        icono: Store,
        titulo: "Tiendas online (adicional)",
        items: [
          { texto: "Mercado Libre, Tienda Nube, WooCommerce, Shopify, Magento y PrestaShop" },
          { texto: "Un stock para todas tus tiendas" },
          { texto: "Precios con IVA desde tus listas" },
          { texto: "Pedidos que entran solos y se facturan" },
        ],
      },
      {
        icono: MessageCircle,
        titulo: "WhatsApp e IA",
        items: [
          { texto: "WhatsApp Business con la API oficial" },
          { texto: "Facturas y links de pago por WhatsApp" },
          { texto: "Agente de atención con IA para tus clientes" },
          { texto: "Asistente IA en todo el ERP (adicional)" },
        ],
      },
    ],
  },
  pasos: {
    titulo: "Cómo empezar",
    bajada: (
      <>
        <strong className="text-white font-bold">Cuatro pasos</strong> para pasar de las planillas a{" "}
        <strong className="text-white font-bold">facturar con tu propio sistema</strong>.
      </>
    ),
    items: [
      {
        step: "01",
        title: "Creá tu cuenta",
        subtitle: "y probalo gratis",
        description: `Te registrás en erp.vektra.digital y tenés ${DIAS_DE_PRUEBA} días con el plan Inicial más la aplicación de tu rubro.`,
      },
      {
        step: "02",
        title: "Configurá",
        subtitle: "tu empresa",
        description: "Cargás tus datos fiscales, conectás ARCA y elegís los puntos de venta. El sistema ofrece los comprobantes que te corresponden.",
      },
      {
        step: "03",
        title: "Traé",
        subtitle: "tus datos",
        description: "Importás clientes y artículos desde Excel. En los planes más grandes te ayudamos con los saldos iniciales y la migración.",
      },
      {
        step: "04",
        title: "Elegí",
        subtitle: "tu plan",
        description: "Cuando termina la prueba elegís el plan que te sirve, o facturás con el plan Gratis. Pagás en pesos, por mes o por año.",
      },
    ],
  },
  paraQuien: {
    titulo: "¿Para quién es Vektra ERP?",
    bajada: "Para pymes, comercios y profesionales de Argentina que quieren dejar las planillas y tener todo en un lugar.",
    items: [
      {
        titulo: "Comercios y distribuidoras",
        texto: "Que venden en el mostrador o a otras empresas, manejan stock en uno o varios depósitos y cobran en cuenta corriente.",
      },
      {
        titulo: "Profesionales y monotributistas",
        texto: "Que necesitan facturar con ARCA sin complicarse: el plan Gratis alcanza para empezar.",
      },
      {
        titulo: "Empresas de servicio técnico",
        texto: "Con técnicos en la calle, órdenes de trabajo, preventivos y contratos de abono por equipo.",
      },
      {
        titulo: "Quienes venden online",
        texto: "En Mercado Libre o en su propia tienda, y quieren un solo stock y los pedidos facturados sin cargarlos a mano.",
      },
      {
        titulo: "Pymes con administración propia",
        texto: "Que compran, pagan con retenciones, manejan cheques y bancos, y necesitan los impuestos al día.",
      },
      {
        titulo: "Equipos que trabajan con su contador",
        texto: "Libro IVA Digital, asientos automáticos y un paquete de cierre listo para compartir cada mes.",
      },
    ],
  },
  precio: {
    titulo: "Plan Gratis y planes desde $39.900 por mes",
    texto: "Precios en pesos, más IVA. Pagando el año por adelantado abonás 10 meses. Las aplicaciones adicionales se suman al plan.",
  },
  faqs: faqsErp,
  faqSubtitulo: "Vektra ERP",
  cierre: {
    titulo: "Empezá a facturar hoy",
    bajada: `Creá tu cuenta y probá Vektra ERP ${DIAS_DE_PRUEBA} días con el plan Inicial. Si tenés dudas, escribinos y te mostramos cómo se adapta a tu negocio.`,
  },
  complementos: [
    {
      title: "Vektra CRM",
      subtitle: "Próximamente · lista de espera",
      features: ["Bandeja de WhatsApp, correo y formularios", "Embudo de ventas por etapas", "Tareas con vencimiento", "Factura y cobro con Vektra ERP"],
      href: "/servicios/crm",
      icon: Inbox,
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
      features: ["Plan Gratis sin vencimiento", "Planes Inicial, Pyme y Empresa", "Pago anual: abonás 10 meses", "20 % al combinar productos"],
      href: "/precios",
      icon: Tags,
    },
  ],
}

export default function ErpPageClient() {
  return <ProductoVektra data={data} />
}
