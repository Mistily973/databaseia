import Feature from "@/lib/models/Feature";
import Step from "@/lib/models/Step";
import Plan from "@/lib/models/Plan";
import Testimonial from "@/lib/models/Testimonial";
import FaqItem from "@/lib/models/FaqItem";

export const navLinks = [
  { label: "Cómo funciona", href: "#como-funciona", showInFooter: true },
  { label: "Funciones", href: "#funciones", showInFooter: false },
  { label: "Precios", href: "#precios", showInFooter: true },
  { label: "FAQ", href: "#faq", showInFooter: true },
];

export const hero = {
  badge: "✨ Nuevo: integración directa con WhatsApp",
  title: "Tu Excel se convierte en una base de datos inteligente",
  description:
    "Sube tus hojas de cálculo y consulta toda tu información de negocio con preguntas en español, desde la web o WhatsApp.",
  checks: ["Sin tarjeta de crédito", "Gratis para siempre en el plan Básico"],
};

// Filas de ejemplo para la tabla de la ventanita
export const previewProducts = [
  { id: 1001, name: "Laptop HP", stock: 34, date: "2026-01-10" },
  { id: 1002, name: "Mouse MX3", stock: 120, date: "2026-01-12" },
  { id: 1003, name: 'Monitor 24"', stock: 18, date: "2026-01-15" },
];

export const trustedBusinesses = [
  "Distribuidora Nava",
  "Ferretería López",
  "Papelería Rodríguez",
  "Taller García",
  "Tienda Morales",
  "Restaurante Fuentes",
];

export const howItWorks = {
  header: {
    eyebrow: "Cómo funciona",
    title: "Tres pasos y listo",
    subtitle:
      "No necesitas configurar nada ni llamar a un técnico. Tu base de datos estará lista en menos de un minuto.",
  },
  steps: [
    new Step({
      number: 1,
      icon: "📂",
      title: "Sube tu archivo",
      description: "Selecciona cualquier Excel o CSV que ya tengas. No importa cómo esté organizado.",
    }),
    new Step({
      number: 2,
      icon: "⚡",
      title: "La IA lo organiza",
      description: "En menos de 30 segundos analiza tus columnas, detecta los tipos de datos y genera tu base.",
    }),
    new Step({
      number: 3,
      icon: "🔍",
      title: "Consulta y decide",
      description: "Pregunta lo que necesitas saber en español, desde la web o tu WhatsApp.",
    }),
  ],
};

export const features = {
  header: {
    eyebrow: "Funciones",
    title: "Todo lo que necesita tu negocio",
  },
  items: [
    new Feature({
      icon: "📊",
      title: "Sube tu Excel en segundos",
      description:
        "Arrastra tu archivo y la IA detecta automáticamente qué tipo de dato es cada columna, sin que tengas que configurar nada.",
    }),
    new Feature({
      icon: "🗂️",
      title: "Base de datos visual",
      description:
        "Tus datos se organizan de forma clara y ordenada. Filtra, busca y entiende tu información con una sola mirada.",
    }),
    new Feature({
      icon: "💬",
      title: "Pregunta en español",
      description:
        'Escribe preguntas como "¿Cuánto vale mi inventario?" o "¿Quién vendió más este mes?" y obtén respuestas al instante.',
    }),
    new Feature({
      icon: "📱",
      title: "Desde WhatsApp",
      description:
        "Conecta tu número y consulta tus datos directamente desde WhatsApp, sin abrir ninguna otra app.",
    }),
    new Feature({
      icon: "🔒",
      title: "Tus datos, seguros",
      description:
        "Tu información nunca sale de tu cuenta. Acceso protegido con contraseña y sesiones cifradas.",
    }),
    new Feature({
      icon: "🚀",
      title: "Sin conocimientos técnicos",
      description:
        "No necesitas saber de bases de datos ni programación. Está diseñado para dueños de negocios, no para ingenieros.",
    }),
  ],
};

export const whatsappCta = {
  badge: "📱 Integración WhatsApp",
  title: "Consulta tu negocio desde WhatsApp",
  description:
    "No necesitas abrir la computadora. Escríbele al bot y recibe la información que necesitas en segundos, sin importar dónde estés.",
  cta: "Conectar mi WhatsApp →",
};

export const pricing = {
  header: {
    eyebrow: "Precios",
    title: "Planes para cada etapa de tu negocio",
  },
  plans: [
    new Plan({
      tier: "Básico",
      price: 0,
      period: "para siempre",
      features: ["1 base de datos", "Hasta 500 filas", "Chat IA incluido", "Soporte por email"],
      cta: "Empezar gratis",
    }),
    new Plan({
      tier: "Negocio",
      price: 299,
      period: "/ mes MXN",
      features: [
        "10 bases de datos",
        "Hasta 50,000 filas",
        "WhatsApp conectado",
        "Actualizaciones automáticas",
        "Soporte prioritario",
      ],
      cta: "Prueba 14 días gratis",
      highlighted: true,
    }),
    new Plan({
      tier: "Empresa",
      price: null,
      features: [
        "Bases ilimitadas",
        "Filas ilimitadas",
        "API de integración",
        "Capacitación incluida",
        "SLA garantizado",
      ],
      cta: "Contactar ventas",
    }),
  ],
};

export const testimonials = {
  header: {
    eyebrow: "Testimonios",
    title: "Lo que dicen nuestros clientes",
  },
  items: [
    new Testimonial({
      quote:
        "Antes tardaba horas revisando mi Excel de inventario. Ahora le pregunto al chat y en segundos sé qué me queda y qué necesito pedir.",
      author: "Mariana López",
      business: "Ferretería López",
      city: "CDMX",
    }),
    new Testimonial({
      quote:
        "Lo conecté a mi WhatsApp y ya nunca me preguntan 'cuánto hay en bodega' porque mis vendedores lo consultan solos.",
      author: "Roberto Nava",
      business: "Distribuidora Nava",
      city: "MTY",
    }),
    new Testimonial({
      quote:
        "Pensé que era para empresas grandes. Lo probé un martes y el jueves ya tenía todo mi catálogo de refacciones cargado.",
      author: "Sofía Ríos",
      business: "Taller García",
      city: "GDL",
    }),
  ],
};

export const faq = {
  header: {
    eyebrow: "Preguntas frecuentes",
    title: "Resolvemos tus dudas",
  },
  items: [
    new FaqItem({
      question: "¿Necesito saber programación?",
      answer:
        "No. Solo subes tu archivo y haces preguntas en español, como si le escribieras a un compañero de trabajo. La IA se encarga de todo lo técnico.",
    }),
    new FaqItem({
      question: "¿Mis datos están seguros?",
      answer:
        "Sí. Tu información solo es visible desde tu cuenta, el acceso está protegido con contraseña y todas las sesiones van cifradas.",
    }),
    new FaqItem({
      question: "¿Qué tipos de archivo acepta?",
      answer:
        "Archivos de Excel (.xlsx y .xls) y CSV. No importa cómo estén organizados: la IA detecta las columnas y los tipos de datos automáticamente.",
    }),
    new FaqItem({
      question: "¿Cómo funciona la conexión con WhatsApp?",
      answer:
        "Desde tu panel registras tu número y listo. A partir de ahí puedes escribirle al bot de DATAI y consultar tus datos desde el celular.",
    }),
    new FaqItem({
      question: "¿Puedo actualizar mis datos?",
      answer:
        "Sí. Puedes volver a subir tu archivo cuando quieras, y en el plan Negocio tus datos se actualizan automáticamente.",
    }),
  ],
};

export const finalCta = {
  header: {
    title: "Tu negocio merece información clara, no hojas de cálculo perdidas",
    subtitle: "Empieza gratis hoy. Sin tarjeta de crédito, sin complicaciones.",
  },
  primary: "Crear mi cuenta gratis →",
  secondary: "Ver la demo",
};