// Centralized copy for the eight service pages, keyed by page path. The six
// pages rendered by <ServicePage/> read SERVICE_PAGES_CONTENT; the two bespoke
// pages read BESPOKE_PAGES_CONTENT. The markdown mirror (src/lib/markdown/
// services.ts) reads the same entries, so the HTML pages and their .md files
// cannot drift. Nav and sitemap keep reading SERVICE_PAGES in ./service-pages.

export type LedeSegment = { text: string; strong?: boolean };
export type ServiceCard = { title: string; body: string };
// Groups without a `group` label render as one flat list (the AI Formosa page).
export type StackGroup = { group?: string; items: string[] };
export type FaqItem = { q: string; a: string };
export type ContactAction = {
  label: string;
  href: string;
  newTab?: boolean;
  muted?: boolean;
};
export type PageContact = {
  heading: string;
  body: string;
  actions: ContactAction[];
};

export const CONTACT = {
  email: "facundomajda13@gmail.com",
  github: "https://github.com/FacundoMajda",
  linkedin: "https://www.linkedin.com/in/facundo-majda/",
  upwork: "https://www.upwork.com/freelancers/~014f767f0225d54d8e",
};

type ServicePageContentBase = {
  title: string;
  description: string;
  kicker: string;
  h1: string;
  lede: LedeSegment[];
  servicesHeading: string;
  services: ServiceCard[];
  faqHeading: string;
  faq: FaqItem[];
  contact: PageContact;
};

export type ServicePageContent = ServicePageContentBase & { kind: "service" };
export type BespokePageContent = ServicePageContentBase & {
  kind: "bespoke";
  stackHeading: string;
  stack: StackGroup[];
};

export type ServicePagePath =
  | "/services"
  | "/es/servicios"
  | "/es/computer-vision"
  | "/es/automatizacion-empresas"
  | "/es/desarrollo-software-a-medida"
  | "/es/saas";

export type BespokePagePath =
  | "/es/desarrollador-software-formosa"
  | "/es/inteligencia-artificial-formosa";

export type AnyServicePageContent = ServicePageContent | BespokePageContent;

// The contact section shared by the five Spanish <ServicePage/> instances.
const ES_SERVICE_PAGE_CONTACT: PageContact = {
  heading: "[ CONTACTO ]",
  body: "Contame qué necesitás y te respondo con un enfoque técnico y una propuesta por etapas. Estoy en Formosa, disponible para la ciudad, el NEA, toda Argentina y el exterior.",
  actions: [
    { label: "Escribime por email", href: `mailto:${CONTACT.email}` },
    { label: "Perfil en Upwork", href: CONTACT.upwork, newTab: true },
    { label: "Ver portfolio completo", href: "/", muted: true },
  ],
};

// The contact section for the English /services page.
const EN_SERVICE_PAGE_CONTACT: PageContact = {
  heading: "[ CONTACT ]",
  body: "Tell me what you need and I'll come back with a technical approach and a staged proposal. I'm based in Formosa, available for the city, the region, across the country and abroad.",
  actions: [
    { label: "Email me", href: `mailto:${CONTACT.email}` },
    { label: "Upwork profile", href: CONTACT.upwork, newTab: true },
    { label: "See the full portfolio", href: "/", muted: true },
  ],
};

// Per-locale chrome for the <ServicePage/> shell (contact control, breadcrumb
// names, jobTitle, og:locale). The ES values reproduce the strings the
// Spanish pages already shipped; EN serves /services.
export type ServicePageChrome = {
  contact: string;
  homeCrumb: string;
  servicesCrumb: string;
  jobTitle: string;
  ogLocale: string;
};

export const SERVICE_PAGE_CHROME: Record<"en" | "es", ServicePageChrome> = {
  en: {
    contact: "[ CONTACT ]",
    homeCrumb: "Home",
    servicesCrumb: "Services",
    jobTitle: "Software developer and AI engineer",
    ogLocale: "en_US",
  },
  es: {
    contact: "[ CONTACTO ]",
    homeCrumb: "Inicio",
    servicesCrumb: "Servicios (español)",
    jobTitle: "Desarrollador de software e ingeniero de IA",
    ogLocale: "es_AR",
  },
};

// Locale of a service page, derived from its path.
export function servicePageLocale(path: string): "en" | "es" {
  return path.startsWith("/es") ? "es" : "en";
}

export const SERVICE_PAGES_CONTENT: Record<ServicePagePath, ServicePageContent> =
  {
    "/services": {
      kind: "service",
      title: "Software Developer & AI Engineer | Facundo Majda",
      description:
        "Facundo Majda, freelance software developer based in Formosa, Argentina. Custom software, business systems, SaaS, backend and APIs, artificial intelligence, computer vision and automation. Remote and on-site.",
      kicker: "[ SOFTWARE DEVELOPER · AI · FORMOSA, ARGENTINA ]",
      h1: "Software developer and AI engineer",
      lede: [
        { text: "I'm " },
        { text: "Facundo Majda", strong: true },
        {
          text: ", and I build software that works in production, with artificial intelligence as my specialty. I'm based in ",
        },
        { text: "Formosa, Argentina", strong: true },
        {
          text: ", and I work with companies and teams in the city, the region, across the country and abroad.",
        },
      ],
      servicesHeading: "[ AREAS OF WORK ]",
      services: [
        {
          title: "Custom software and systems",
          body: "Management systems, platforms and in-house tools: architecture, backend, APIs, dashboards and deployment.",
        },
        {
          title: "Artificial intelligence",
          body: "RAG assistants, LLM applications, agents, LoRA fine-tuning and document processing, taken all the way to production.",
        },
        {
          title: "Automation",
          body: "Integration between systems and workflow automation to remove repetitive manual work.",
        },
        {
          title: "SaaS and platforms",
          body: "Multi-tenant products: accounts, roles, subscriptions, APIs and everything a SaaS needs to scale.",
        },
        {
          title: "Computer vision",
          body: "Object detection and tracking, video analysis and real-time monitoring.",
        },
        {
          title: "Backend, data and infrastructure",
          body: "APIs, databases, integrations and deployment with observability. The base that holds everything else up.",
        },
      ],
      faqHeading: "[ FREQUENTLY ASKED QUESTIONS ]",
      faq: [
        {
          q: "Where are you based and who do you work with?",
          a: "In Formosa, Argentina. I work with clients in the city, the region, across the country and abroad, remotely and on-site when the project calls for it.",
        },
        {
          q: "Do you only do artificial intelligence?",
          a: "No. I build complete software — systems, backend, APIs and infrastructure — with AI/ML as a differentiating specialty.",
        },
        {
          q: "Can you take a project from scratch?",
          a: "Yes. I take part from the technical definition and architecture through development, deployment and maintenance.",
        },
        {
          q: "How do I get in touch?",
          a: "Write to me about what you need and the problem you want to solve. You get a technical approach and a staged proposal back.",
        },
      ],
      contact: EN_SERVICE_PAGE_CONTACT,
    },

    "/es/servicios": {
      kind: "service",
      title:
        "Desarrollador de Software e Ingeniero de IA en Argentina | Facundo Majda",
      description:
        "Facundo Majda, desarrollador de software freelance radicado en Formosa, Argentina. Software a medida, sistemas empresariales, SaaS, backend y APIs, inteligencia artificial, visión por computadora y automatización. Remoto y presencial.",
      kicker: "[ DESARROLLADOR DE SOFTWARE · IA · FORMOSA, ARGENTINA ]",
      h1: "Desarrollador de software e ingeniero de IA",
      lede: [
        { text: "Soy " },
        { text: "Facundo Majda", strong: true },
        {
          text: ", y desarrollo software que funciona en producción, con la inteligencia artificial como especialidad. Estoy radicado en ",
        },
        { text: "Formosa, Argentina", strong: true },
        {
          text: ", y trabajo con empresas y equipos de la ciudad, del NEA, de todo el país y del exterior.",
        },
      ],
      servicesHeading: "[ ÁREAS DE TRABAJO ]",
      services: [
        {
          title: "Software a medida y sistemas",
          body: "Sistemas de gestión, plataformas y herramientas propias: arquitectura, backend, APIs, paneles y despliegue.",
        },
        {
          title: "Inteligencia artificial",
          body: "Asistentes con RAG, aplicaciones con LLM, agentes, fine-tuning con LoRA y procesamiento de documentos, llevados a producción.",
        },
        {
          title: "Automatización",
          body: "Integración entre sistemas y automatización de flujos para eliminar el trabajo manual repetitivo.",
        },
        {
          title: "SaaS y plataformas",
          body: "Productos multiempresa: cuentas, roles, suscripciones, APIs y todo lo que necesita un SaaS para escalar.",
        },
        {
          title: "Visión por computadora",
          body: "Detección y seguimiento de objetos, análisis de video y monitoreo en tiempo real.",
        },
        {
          title: "Backend, datos e infraestructura",
          body: "APIs, bases de datos, integraciones y despliegue con observabilidad. La base que sostiene todo lo anterior.",
        },
      ],
      faqHeading: "[ PREGUNTAS FRECUENTES ]",
      faq: [
        {
          q: "¿Dónde estás radicado y a quién atendés?",
          a: "En Formosa, Argentina. Trabajo con clientes de la ciudad, del NEA, de todo el país y del exterior, de forma remota y presencial cuando el proyecto lo requiere.",
        },
        {
          q: "¿Hacés solo inteligencia artificial?",
          a: "No. Desarrollo software completo — sistemas, backend, APIs e infraestructura — con IA/ML como especialidad diferencial.",
        },
        {
          q: "¿Podés tomar un proyecto desde cero?",
          a: "Sí. Participo desde la definición técnica y la arquitectura hasta el desarrollo, el despliegue y el mantenimiento.",
        },
        {
          q: "¿Cómo contacto?",
          a: "Escribime contando qué necesitás y qué problema querés resolver. Te respondo con un enfoque técnico y una propuesta por etapas.",
        },
      ],
      contact: ES_SERVICE_PAGE_CONTACT,
    },

    "/es/computer-vision": {
      kind: "service",
      title:
        "Visión por Computadora | Detección y Análisis de Video — Facundo Majda",
      description:
        "Sistemas de visión por computadora: detección y seguimiento de objetos, análisis de video y monitoreo en tiempo real con YOLO y ByteTrack. Facundo Majda, desde Formosa, Argentina.",
      kicker: "[ COMPUTER VISION · DETECCIÓN · VIDEO ]",
      h1: "Visión por computadora",
      lede: [
        {
          text: "Cámaras que generan información útil, no solo grabaciones que nadie mira. ",
        },
        {
          text: "Detección y seguimiento de objetos, análisis de video y monitoreo en tiempo real",
          strong: true,
        },
        {
          text: " con modelos como YOLO y ByteTrack, pensados para correr en infraestructura realista. Desde Formosa, para toda Argentina y el exterior.",
        },
      ],
      servicesHeading: "[ QUÉ DESARROLLO ]",
      services: [
        {
          title: "Detección de objetos",
          body: "Identificar qué aparece en la imagen y dónde, con modelos entrenados o ajustados a tu caso.",
        },
        {
          title: "Seguimiento de personas y objetos",
          body: "Seguir el mismo objeto a través del video y respetar zonas de interés: qué pasa dónde.",
        },
        {
          title: "Análisis de video",
          body: "Procesar grabaciones o stream en vivo para extraer eventos, conteos y patrones.",
        },
        {
          title: "Automatización de inspección",
          body: "Revisión visual automática de productos o activos, sin depender del ojo humano para lo repetitivo.",
        },
        {
          title: "Métricas y alertas",
          body: "Convertir la detección en algo accionable: conteos, cruces, alertas cuando ocurre un evento.",
        },
        {
          title: "Despliegue realista",
          body: "Considero el hardware disponible: GPU, edge o servidor, y la latencia que el caso necesita.",
        },
      ],
      faqHeading: "[ PREGUNTAS FRECUENTES ]",
      faq: [
        {
          q: "¿Cómo arranco sin dataset propio?",
          a: "Con modelos preentrenados ajustados a tu caso son suficientes. Si hace falta, definimos qué datos juntar y cómo etiquetarlos.",
        },
        {
          q: "¿Trabajás con video en vivo o grabado?",
          a: "Los dos. Stream en tiempo real para monitoreo, o procesamiento de grabaciones para análisis y reportes.",
        },
        {
          q: "¿Necesito hardware especial?",
          a: "Depende del caso. Puede ser una GPU en la nube, un equipo en el lugar o una sola máquina. Lo dimensiono antes de proponer.",
        },
        {
          q: "¿Se integra con mi sistema actual?",
          a: "Sí. La detección termina en eventos y datos que se conectan a tu backend, tus alertas o tu panel.",
        },
      ],
      contact: ES_SERVICE_PAGE_CONTACT,
    },

    "/es/automatizacion-empresas": {
      kind: "service",
      title: "Automatización de Procesos para Empresas | Facundo Majda",
      description:
        "Automatización de procesos e integraciones para empresas: conecto tus sistemas, elimino tareas manuales y proceso información con Python, APIs y n8n. Desde Formosa, Argentina.",
      kicker: "[ AUTOMATIZACIÓN · INTEGRACIONES · n8n ]",
      h1: "Automatización para empresas",
      lede: [
        { text: "Las tareas repetitivas se comen el día. " },
        {
          text: "Conecto tus sistemas y automatizo el trabajo manual",
          strong: true,
        },
        {
          text: " — pasar datos entre herramientas, armar reportes, procesar documentos, mandar avisos — para que tu equipo se dedique a lo que suma. Desde Formosa, para toda Argentina y el exterior.",
        },
      ],
      servicesHeading: "[ QUÉ AUTOMATIZO ]",
      services: [
        {
          title: "Integración entre sistemas",
          body: "Que tus herramientas dejen de estar aisladas: los datos viajan solos de una a otra, sin copiar y pegar.",
        },
        {
          title: "Automatización de flujos",
          body: "Procesos que corren solos: altas, notificaciones, aprobaciones, seguimiento. Con n8n, APIs propias o lo que pida el caso.",
        },
        {
          title: "Procesamiento de documentos",
          body: "Extraer datos de facturas, planillas o PDFs, ordenarlos y cargarlos donde corresponden.",
        },
        {
          title: "Reportes y alertas",
          body: "Informes que se generan y se envían solos, y avisos cuando algo se sale de rango.",
        },
        {
          title: "IA dentro del flujo",
          body: "Clasificar, resumir o responder dentro del proceso. La IA como una pieza más, no como un juguete aparte.",
        },
        {
          title: "Monitoreo del proceso",
          body: "Cada automatización deja traza: si falla, se sabe dónde y por qué. Nada de cajas negras.",
        },
      ],
      faqHeading: "[ PREGUNTAS FRECUENTES ]",
      faq: [
        {
          q: "¿Sirve si mis sistemas no tienen API?",
          a: "En la mayoría de los casos sí: se resuelve con exportaciones, base de datos intermedia o automatización de la interfaz. Lo evaluamos en concreto.",
        },
        {
          q: "¿Cuánto tarda una automatización?",
          a: "Un flujo puntual puede estar en días. Un conjunto de procesos integrados, algunas semanas. Empezamos por el que más tiempo te ahorra.",
        },
        {
          q: "¿Qué pasa si algo falla de noche?",
          a: "La automatización deja registro y, si algo se rompe, avisa. No queda a ciegas esperando a que alguien lo note.",
        },
        {
          q: "¿Reemplaza a mi equipo?",
          a: "No. Le saca la parte mecánica. Las decisiones y el criterio siguen siendo humanos; lo repetitivo se automatiza.",
        },
      ],
      contact: ES_SERVICE_PAGE_CONTACT,
    },

    "/es/desarrollo-software-a-medida": {
      kind: "service",
      title:
        "Desarrollo de Software a Medida | Sistemas y APIs — Facundo Majda",
      description:
        "Desarrollo de software a medida para empresas: sistemas de gestión, plataformas, backend y APIs. Arquitectura, desarrollo, despliegue y mantenimiento. Facundo Majda, desde Formosa, Argentina.",
      kicker: "[ SOFTWARE A MEDIDA · SISTEMAS · APIs ]",
      h1: "Desarrollo de software a medida",
      lede: [
        {
          text: "Software pensado para tu operación, no una plantilla adaptada. ",
        },
        {
          text: "Sistemas de gestión, plataformas y herramientas propias",
          strong: true,
        },
        {
          text: " donde yo me hago cargo de la arquitectura, el desarrollo, la base de datos, las APIs y el despliegue. Trabajo desde Formosa para toda Argentina y el exterior.",
        },
      ],
      servicesHeading: "[ QUÉ INCLUYE ]",
      services: [
        {
          title: "Relevamiento y arquitectura",
          body: "Entiendo el proceso real antes de escribir código: qué entra, qué sale, quién lo usa y qué tiene que pasar. De ahí sale la arquitectura y el modelo de datos.",
        },
        {
          title: "Backend y APIs",
          body: "Servicios y APIs que sostienen el sistema, con validaciones, permisos y datos consistentes desde el primer día.",
        },
        {
          title: "Paneles e interfaz",
          body: "Las pantallas que tu equipo usa todos los días: claras, rápidas y sin pasos de más.",
        },
        {
          title: "Integraciones",
          body: "El sistema habla con lo que ya tenés: e-commerce, pagos, facturación, correo, sistemas de terceros y bases existentes.",
        },
        {
          title: "Migración de datos",
          body: "Si venís de planillas o de un sistema viejo, planifico la migración para no perder ni duplicar información.",
        },
        {
          title: "Despliegue y mantenimiento",
          body: "Queda funcionando en producción, con respaldos, monitoreo y la posibilidad de seguir sumando funcionalidades.",
        },
      ],
      faqHeading: "[ PREGUNTAS FRECUENTES ]",
      faq: [
        {
          q: "¿Cómo empieza un proyecto a medida?",
          a: "Con una charla para entender el problema y el proceso. De ahí sale un alcance por etapas, con lo mínimo que ya te sirve funcionando desde la primera.",
        },
        {
          q: "¿Puedo empezar con algo chico?",
          a: "Sí, y es lo recomendable. Arrancamos por el núcleo que resuelve el dolor más grande y crecemos desde ahí, en lugar de esperar meses por un sistema enorme.",
        },
        {
          q: "¿Qué pasa con el código y los datos?",
          a: "El sistema queda en tu infraestructura o en una cuenta tuya. El código y los datos son tuyos, sin dependencias raras.",
        },
        {
          q: "¿Das soporte después de la entrega?",
          a: "Sí. Puedo quedarme para mantenimiento y mejoras, o dejar todo documentado para que lo tome otro equipo.",
        },
      ],
      contact: ES_SERVICE_PAGE_CONTACT,
    },

    "/es/saas": {
      kind: "service",
      title: "Desarrollo de SaaS | Plataformas Multiempresa — Facundo Majda",
      description:
        "Desarrollo de plataformas SaaS: arquitectura multiempresa, autenticación y roles, suscripciones, facturación, APIs y despliegue. Facundo Majda, desde Formosa, Argentina.",
      kicker: "[ SAAS · MULTIEMPRESA · PLATAFORMAS ]",
      h1: "Desarrollo de SaaS y plataformas",
      lede: [
        {
          text: "Un producto que muchos clientes usan a la vez tiene exigencias propias: ",
        },
        {
          text: "aislamiento entre cuentas, permisos, escalabilidad y una operación que no se caiga",
          strong: true,
        },
        {
          text: ". Diseño y construyo la base para que tu producto SaaS aguante el crecimiento. Desde Formosa, para toda Argentina y el exterior.",
        },
      ],
      servicesHeading: "[ QUÉ CONSTRUYO ]",
      services: [
        {
          title: "Arquitectura multiempresa",
          body: "El modelo de datos correcto para que cada cliente vea solo lo suyo, desde el primer usuario hasta miles.",
        },
        {
          title: "Cuentas, roles y permisos",
          body: "Autenticación, invitaciones, roles y permisos granulares: quién puede ver y hacer qué.",
        },
        {
          title: "Suscripciones y facturación",
          body: "Planes, cobros recurrentes e integración con la pasarela de pago que uses.",
        },
        {
          title: "API para tus clientes",
          body: "Si tu producto expone una API, queda documentada, versionada y con control de acceso.",
        },
        {
          title: "Paneles y experiencia",
          body: "El panel donde tus clientes trabajan todos los días: rápido, claro y sin fricción.",
        },
        {
          title: "Despliegue y escala",
          body: "Infraestructura que aguanta el uso real, con observabilidad para ver qué pasa antes de que se rompa.",
        },
      ],
      faqHeading: "[ PREGUNTAS FRECUENTES ]",
      faq: [
        {
          q: "¿Tengo la idea o el diseño, falta construir?",
          a: "Sí. Puedo tomar tu idea o tu diseño y llevarlo a un producto funcionando. También participo en las decisiones técnicas desde el inicio.",
        },
        {
          q: "¿Puedo empezar con un MVP?",
          a: "Es lo que recomiendo. Una versión mínima pero real, con usuarios, que valide antes de invertir en funcionalidades que quizá no usen.",
        },
        {
          q: "¿Se puede escalar después?",
          a: "Sí, si la base está bien pensada. Tomo decisiones que evitan reescribir todo cuando la plataforma crece.",
        },
        {
          q: "¿Qué pasa con la seguridad de los datos?",
          a: "Es parte del diseño: aislamiento entre cuentas, permisos, cifrado y control de acceso, no algo que se agrega al final.",
        },
      ],
      contact: ES_SERVICE_PAGE_CONTACT,
    },
  };

export const BESPOKE_PAGES_CONTENT: Record<
  BespokePagePath,
  BespokePageContent
> = {
  "/es/desarrollador-software-formosa": {
    kind: "bespoke",
    title:
      "Programador y Desarrollador de Software en Formosa | Facundo Majda",
    description:
      "Facundo Majda, programador y desarrollador de software freelance radicado en Formosa, Argentina. Programación y software a medida, sistemas empresariales, backend y APIs, inteligencia artificial, Machine Learning y automatización para empresas. Remoto y presencial.",
    kicker: "[ INGENIERÍA DE SOFTWARE · IA · BACKEND · AUTOMATIZACIÓN ]",
    h1: "Desarrollador de software e ingeniero de IA en Formosa",
    lede: [
      { text: "Soy " },
      { text: "Facundo Majda", strong: true },
      {
        text: " y trabajo como programador freelance: programación y desarrollo de software que funciona en producción — aplicaciones y sistemas a medida, backend y APIs, integraciones, infraestructura, automatización e inteligencia artificial. Estoy radicado en ",
      },
      { text: "Formosa, Argentina", strong: true },
      {
        text: ", y trabajo con clientes de la ciudad, del NEA, de todo el país y del exterior.",
      },
    ],
    servicesHeading: "Servicios",
    services: [
      {
        title: "Software a medida y sistemas empresariales",
        body: "Sistemas de gestión, paneles internos y herramientas propias. Diseño la arquitectura, la base de datos y las APIs, y lo dejo funcionando en producción.",
      },
      {
        title: "Plataformas SaaS y aplicaciones web",
        body: "Aplicaciones web y plataformas multiusuario y multiempresa, desde la arquitectura hasta el despliegue.",
      },
      {
        title: "Backend, APIs e integraciones",
        body: "Servicios en Python, Node/TypeScript y Java. APIs REST, integraciones entre sistemas, e-commerce, pagos y facturación.",
      },
      {
        title: "Inteligencia artificial y Machine Learning",
        body: "Asistentes con RAG sobre tus documentos y datos, aplicaciones con LLM, agentes, fine-tuning con LoRA y procesamiento inteligente de documentos. El foco: resolver problemas concretos y llevarlo a producción.",
      },
      {
        title: "Visión por computadora",
        body: "Detección y seguimiento de objetos, análisis de video e inspección automatizada con modelos como YOLO y ByteTrack.",
      },
      {
        title: "Automatización de procesos",
        body: "Flujos que conectan tus herramientas (n8n, APIs propias) y eliminan tareas manuales, integrando tus sistemas existentes.",
      },
      {
        title: "Datos y analítica",
        body: "Pipelines de datos, tableros y modelos (PyTorch, Scikit-learn) para tomar decisiones con tus números.",
      },
      {
        title: "Infraestructura y puesta en producción",
        body: "Docker, Linux, despliegue, observabilidad y mantenimiento. El sistema queda funcionando y monitoreado, no en un demo.",
      },
    ],
    stackHeading: "Tecnologías",
    stack: [
      {
        group: "Lenguajes",
        items: ["Python", "TypeScript", "JavaScript", "Java", "SQL"],
      },
      {
        group: "Backend",
        items: ["FastAPI", "NestJS", "Node.js", "Spring Boot"],
      },
      {
        group: "Frontend",
        items: ["React", "Next.js", "Angular", "Tailwind CSS"],
      },
      {
        group: "Datos",
        items: ["PostgreSQL", "Supabase", "Qdrant", "Redis", "Drizzle ORM"],
      },
      {
        group: "IA / ML",
        items: [
          "PyTorch",
          "Hugging Face",
          "LangChain",
          "LangGraph",
          "RAG",
          "LLM",
          "LoRA",
          "Computer Vision",
          "YOLO",
          "ByteTrack",
          "OpenAI API",
        ],
      },
      {
        group: "Infra y automatización",
        items: [
          "Docker",
          "Linux",
          "Git",
          "OpenTelemetry",
          "n8n",
          "AWS",
          "Vercel",
        ],
      },
    ],
    faqHeading: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Cómo contratar a un programador en Formosa?",
        a: "Escribime contando qué necesitás resolver — un sistema, una aplicación web, una automatización o un proyecto de IA. Te respondo con un enfoque técnico y una propuesta por etapas. Si estás en Formosa, coordinamos una reunión presencial cuando el proyecto lo requiera.",
      },
      {
        q: "¿Trabajás con empresas de Formosa?",
        a: "Sí. Estoy radicado en Formosa y trabajo con empresas, profesionales y equipos de la ciudad, del NEA, de toda Argentina y del exterior. Remoto por defecto, y presencial en Formosa cuando el proyecto lo requiere.",
      },
      {
        q: "¿Qué tipo de software desarrollás?",
        a: "Aplicaciones web, plataformas SaaS, sistemas empresariales, APIs, backends, integraciones entre servicios y software a medida. Trabajo tanto en la arquitectura como en el desarrollo, el despliegue y el mantenimiento.",
      },
      {
        q: "¿Desarrollás sistemas con inteligencia artificial?",
        a: "Sí. Asistentes con RAG sobre documentación y datos propios, aplicaciones con LLM, agentes, fine-tuning con LoRA, procesamiento de documentos y visión por computadora. El foco está en resolver problemas concretos y llevarlos a producción.",
      },
      {
        q: "¿Hacés automatización de procesos empresariales?",
        a: "Sí. Automatizaciones e integraciones con Python, TypeScript, APIs y herramientas de orquestación. Conecto sistemas existentes, automatizo flujos operativos y proceso información para reducir tareas manuales.",
      },
      {
        q: "¿Trabajás con backend, APIs y bases de datos?",
        a: "Sí. Diseño y desarrollo backends, APIs REST, sistemas multiusuario y multiempresa, integraciones y modelos de datos, con Python, FastAPI, Node.js, PostgreSQL y lo que pida cada proyecto.",
      },
      {
        q: "¿Desarrollás sistemas de visión artificial?",
        a: "Sí. Detección y seguimiento de objetos, procesamiento de video, análisis de imágenes y monitoreo en tiempo real, considerando hardware y despliegue.",
      },
      {
        q: "¿Podés desarrollar un proyecto desde cero?",
        a: "Sí. Participo desde la definición técnica y la arquitectura hasta el frontend, el backend, la infraestructura, el despliegue y la puesta en producción. También me incorporo a proyectos existentes para agregar funcionalidades o resolver problemas técnicos.",
      },
      {
        q: "¿Trabajás remoto o presencial?",
        a: "Principalmente remoto con clientes de Argentina y de otros países. También presencial en Formosa cuando las características del proyecto lo requieren.",
      },
      {
        q: "¿Trabajás como freelancer?",
        a: "Sí. Trabajo como desarrollador freelance y también puedo integrarme a equipos de ingeniería por proyecto o por contratación; el alcance y la modalidad se definen según el trabajo.",
      },
      {
        q: "¿Qué tecnologías utilizás?",
        a: "Python, TypeScript, JavaScript, React, Next.js, FastAPI, Node.js, PostgreSQL, Docker y el ecosistema de IA y Machine Learning, entre otras. La elección depende de los requisitos del proyecto.",
      },
      {
        q: "¿Cómo puedo contratarte?",
        a: "Escribime contando qué necesitás desarrollar, qué problema querés resolver y el alcance estimado. Analizo los requisitos y te respondo con un enfoque técnico, una propuesta y las etapas de implementación.",
      },
    ],
    contact: {
      heading: "Contacto",
      body: "Contame qué necesitás desarrollar y te respondo con un enfoque técnico y una propuesta por etapas. Estoy en Formosa, disponible para la ciudad, el NEA, toda Argentina y el exterior.",
      actions: [
        { label: "Escribime por email", href: `mailto:${CONTACT.email}` },
        { label: "Perfil en Upwork", href: CONTACT.upwork, newTab: true },
        {
          label: "Inteligencia artificial en Formosa",
          href: "/es/inteligencia-artificial-formosa",
        },
        { label: "Ver portfolio completo", href: "/", muted: true },
      ],
    },
  },

  "/es/inteligencia-artificial-formosa": {
    kind: "bespoke",
    title:
      "Inteligencia Artificial en Formosa | RAG, Agentes y Visión — Facundo Majda",
    description:
      "Implemento inteligencia artificial en producción para empresas de Formosa y el NEA: asistentes con RAG sobre tus datos, agentes con LLM, visión por computadora y automatización. Radicado en Formosa, Argentina.",
    kicker: "[ INTELIGENCIA ARTIFICIAL · LLM · VISIÓN ]",
    h1: "Inteligencia artificial en Formosa",
    lede: [
      { text: "Implemento inteligencia artificial que " },
      { text: "funciona en producción", strong: true },
      {
        text: " para empresas de Formosa y del NEA: asistentes con RAG sobre tus propios datos, agentes con LLM, visión por computadora y automatización. Estoy radicado en Formosa, Argentina.",
      },
    ],
    servicesHeading: "Qué puedo construir",
    services: [
      {
        title: "Asistentes con tus documentos (RAG)",
        body: "Un asistente que responde con la información real de tu empresa — contratos, manuales, base de conocimiento — citando la fuente. Sin inventar.",
      },
      {
        title: "Agentes con LLM",
        body: "Agentes que ejecutan tareas: consultar sistemas, completar formularios, responder consultas. Acotados, observables y seguros.",
      },
      {
        title: "Visión por computadora",
        body: "Detección y seguimiento de objetos, análisis de video e inspección automatizada con modelos como YOLO.",
      },
      {
        title: "Automatización con IA",
        body: "Flujos que combinan APIs, n8n y modelos para eliminar trabajo manual y conectar tus herramientas.",
      },
      {
        title: "Integración con tus sistemas",
        body: "La IA no vive sola: la conecto a tu backend, tu base de datos y tus procesos internos.",
      },
      {
        title: "Evaluación y puesta en producción",
        body: "Mido calidad, latencia y costo, y dejo el sistema funcionando, monitoreado y mantenible.",
      },
    ],
    stackHeading: "Tecnologías",
    stack: [
      {
        items: [
          "Python",
          "PyTorch",
          "LangChain",
          "LangGraph",
          "Transformers",
          "vLLM",
          "Qdrant",
          "PostgreSQL",
          "FastAPI",
          "OpenTelemetry",
        ],
      },
    ],
    faqHeading: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Atendés empresas de Formosa?",
        a: "Sí. Estoy radicado en Formosa y trabajo con empresas de la ciudad, del NEA, de toda Argentina y del exterior.",
      },
      {
        q: "¿Qué tipo de proyectos de IA hacés?",
        a: "Asistentes con RAG sobre tus datos, agentes con LLM, visión por computadora y automatización de procesos. Siempre apuntando a que funcione en producción, no a un demo.",
      },
      {
        q: "¿Trabajás remoto o presencial?",
        a: "Las dos. Trabajo remoto por defecto y presencial en Formosa cuando el proyecto lo pide.",
      },
      {
        q: "¿Cómo empiezo?",
        a: "Escribime contando qué problema querés resolver. Te respondo con un enfoque concreto y una propuesta por etapas.",
      },
    ],
    contact: {
      heading: "Contacto",
      body: "Contame qué problema querés resolver con IA y te respondo con un enfoque concreto. Estoy en Formosa, disponible para la ciudad, el NEA, toda Argentina y el exterior.",
      actions: [
        { label: "Escribime por email", href: `mailto:${CONTACT.email}` },
        {
          label: "Desarrollo de software en Formosa",
          href: "/es/desarrollador-software-formosa",
        },
      ],
    },
  },
};

const CONTENT_BY_PATH: Record<string, AnyServicePageContent> = {
  ...SERVICE_PAGES_CONTENT,
  ...BESPOKE_PAGES_CONTENT,
};

// Path lookup for callers that only have a route string (the markdown mirror).
export function getServicePageContent(
  path: string,
): AnyServicePageContent | null {
  return CONTENT_BY_PATH[path] ?? null;
}
