// Every user-visible string of the portfolio lives here, in both languages.
// Codes stays English; only the copy is localized. Add a key here and both
// locales must provide it (the Copy type enforces it).
export type Copy = {
  menuLabel: string;
  toggleMenu: string;
  socialLabel: string;
  statusLabel: string;
  servicesLabel: string;
  languageLabel: string;
  themeLabel: string;
  themeSystem: string;
  themeLight: string;
  themeDark: string;
  menuItems: Record<string, string>;

  heroLabel: string;
  heroHi: string;
  heroFallback: string;
  heroSub: string;
  overLabel: string;
  yearsEngineering: string;
  years: string;

  aboutLabel: string;
  aboutHead1: string;
  aboutHead3: string;
  aboutHead4: string;
  profileLabel: string;
  aboutP1: string;
  aboutP2: string;
  systemsTitle: string;
  sys1Title: string;
  sys1Body: string;
  sys2Title: string;
  sys2Body: string;
  sys3Title: string;
  sys3Body: string;
  sys4Title: string;
  sys4Body: string;

  expertiseLabel: string;
  tools: string;
  educationLabel: string;
  records: string;
  experienceLabel: string;
  roles: string;
};

export const COPY: Record<"en" | "es", Copy> = {
  en: {
    menuLabel: "[ MENU ]",
    toggleMenu: "Toggle menu",
    socialLabel: "[ SOCIAL ]",
    statusLabel: "[ STATUS ]",
    servicesLabel: "[ SERVICES ]",
    languageLabel: "[ LANGUAGE ]",
    themeLabel: "[ THEME ]",
    themeSystem: "System",
    themeLight: "Light",
    themeDark: "Dark",
    menuItems: {
      Home: "Home",
      "About Me": "About Me",
      About: "About",
      Expertise: "Expertise",
      Experience: "Experience",
      Projects: "Projects",
      Education: "Education",
      Contact: "Contact",
    },

    heroLabel: "[ AI/ML & AUTOMATION ENGINEER ]",
    heroHi: "Hi, I'm",
    heroFallback: "I design and ship production AI systems",
    heroSub: "RAG pipelines, LLM agents, and the backend that holds them up",
    overLabel: "OVER",
    yearsEngineering: "Years Engineering",
    years: "years",

    aboutLabel: "[ ABOUT ]",
    aboutHead1: "An",
    aboutHead3: "shipping production systems across the",
    aboutHead4: "full software lifecycle",
    profileLabel: "[ PROFILE ]",
    aboutP1:
      "I build software, work with data, and explore what AI can make possible. From full-stack applications and backend systems to machine learning, computer vision, and automation, I enjoy working across different areas of technology and figuring out how to make things work together.",
    aboutP2:
      "I like getting my hands dirty, learning by building, and taking ideas all the way to production.",
    systemsTitle: "Systems I Build",
    sys1Title: "AI Systems",
    sys1Body:
      "I build with LLMs, RAG, and AI agents to make information more useful, connect models with real-world tools, and create applications that actually do something beyond generating text.",
    sys2Title: "Computer Vision",
    sys2Body:
      "Making cameras smarter. Detection, tracking, classification, and real-time systems that turn what a camera sees into something useful.",
    sys3Title: "Backend Systems",
    sys3Body:
      "The stuff that makes everything work. APIs, databases, services, integrations, and all the logic behind the applications people use.",
    sys4Title: "Automation",
    sys4Body:
      "Making systems talk to each other and getting repetitive work out of the way. APIs, workflows, AI, and a bit of creative problem-solving.",

    expertiseLabel: "[ EXPERTISE ]",
    tools: "tools",
    educationLabel: "[ EDUCATION ]",
    records: "records",
    experienceLabel: "[ EXPERIENCE ]",
    roles: "roles",
  },

  es: {
    menuLabel: "[ MENÚ ]",
    toggleMenu: "Abrir menú",
    socialLabel: "[ REDES ]",
    statusLabel: "[ ESTADO ]",
    servicesLabel: "[ SERVICIOS ]",
    languageLabel: "[ IDIOMA ]",
    themeLabel: "[ TEMA ]",
    themeSystem: "Sistema",
    themeLight: "Claro",
    themeDark: "Oscuro",
    menuItems: {
      Home: "Inicio",
      "About Me": "Sobre mí",
      About: "Sobre mí",
      Expertise: "Especialidades",
      Experience: "Experiencia",
      Projects: "Proyectos",
      Education: "Formación",
      Contact: "Contacto",
    },

    heroLabel: "[ INGENIERO EN AI/ML Y AUTOMATIZACIÓN ]",
    heroHi: "Hola, soy",
    heroFallback: "Diseño y llevo a producción sistemas de IA",
    heroSub: "pipelines RAG, agentes con LLM y el backend que los sostiene",
    overLabel: "MÁS DE",
    yearsEngineering: "Años de ingeniería",
    years: "años",

    aboutLabel: "[ SOBRE MÍ ]",
    aboutHead1: "Un",
    aboutHead3: "que entrega sistemas en producción durante",
    aboutHead4: "todo el ciclo de vida del software",
    profileLabel: "[ PERFIL ]",
    aboutP1:
      "Construyo software, trabajo con datos y exploro lo que la IA puede hacer posible. Desde aplicaciones full-stack y sistemas backend hasta machine learning, visión por computadora y automatización: me gusta moverme entre distintas áreas de la tecnología y hacer que las piezas funcionen juntas.",
    aboutP2:
      "Me gusta ensuciarme las manos, aprender construyendo y llevar las ideas hasta producción.",
    systemsTitle: "Sistemas que construyo",
    sys1Title: "Sistemas de IA",
    sys1Body:
      "Construyo con LLM, RAG y agentes de IA para que la información sea más útil, para conectar modelos con herramientas reales y para crear aplicaciones que hacen algo más que generar texto.",
    sys2Title: "Visión por computadora",
    sys2Body:
      "Cámaras más inteligentes. Detección, seguimiento, clasificación y sistemas en tiempo real que convierten lo que ve una cámara en algo útil.",
    sys3Title: "Sistemas backend",
    sys3Body:
      "Lo que hace que todo funcione: APIs, bases de datos, servicios, integraciones y toda la lógica detrás de las aplicaciones que la gente usa.",
    sys4Title: "Automatización",
    sys4Body:
      "Hacer que los sistemas se hablen entre sí y sacar de encima el trabajo repetitivo. APIs, flujos, IA y bastante resolución creativa de problemas.",

    expertiseLabel: "[ ESPECIALIDADES ]",
    tools: "herramientas",
    educationLabel: "[ FORMACIÓN ]",
    records: "registros",
    experienceLabel: "[ EXPERIENCIA ]",
    roles: "puestos",
  },
};
