import Head from "next/head";
import Link from "next/link";
import { SITE_URL } from "@/config/site";
import { ServicePageNav } from "@/components/services/ServicePageNav";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";

const TITLE =
  "Desarrollador de Software e Ingeniero de IA en Formosa | Facundo Majda";
const DESCRIPTION =
  "Facundo Majda, desarrollador de software freelance radicado en Formosa, Argentina. Software a medida, sistemas empresariales, backend y APIs, inteligencia artificial, Machine Learning y automatización para empresas. Remoto y presencial.";
const PATH = "/es/desarrollador-software-formosa";
const URL = `${SITE_URL}${PATH}`;

const EMAIL = "facundomajda13@gmail.com";
const GITHUB = "https://github.com/FacundoMajda";
const LINKEDIN = "https://www.linkedin.com/in/facundo-majda/";
const UPWORK = "https://www.upwork.com/freelancers/~014f767f0225d54d8e";

const SERVICES = [
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
];

const STACK: { group: string; items: string[] }[] = [
  {
    group: "Lenguajes",
    items: ["Python", "TypeScript", "JavaScript", "Java", "SQL"],
  },
  { group: "Backend", items: ["FastAPI", "NestJS", "Node.js", "Spring Boot"] },
  { group: "Frontend", items: ["React", "Next.js", "Angular", "Tailwind CSS"] },
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
    items: ["Docker", "Linux", "Git", "OpenTelemetry", "n8n", "AWS", "Vercel"],
  },
];

const FAQ = [
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
];

export default function SoftwareDeveloperFormosaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${URL}/#service`,
        name: "Desarrollo de software, ingeniería de IA y automatización",
        serviceType: "Software development",
        description: DESCRIPTION,
        url: URL,
        areaServed: [
          { "@type": "City", name: "Formosa" },
          { "@type": "AdministrativeArea", name: "NEA" },
          { "@type": "Country", name: "Argentina" },
        ],
        provider: {
          "@type": "Person",
          name: "Facundo Majda",
          jobTitle: "Desarrollador de software e ingeniero de IA",
          url: SITE_URL,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Formosa",
            addressRegion: "Formosa",
            addressCountry: "AR",
          },
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${URL}/#faq`,
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${URL}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Desarrollador de software en Formosa",
            item: URL,
          },
        ],
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Facundo Majda",
        jobTitle: "Desarrollador de software e ingeniero de IA",
        url: SITE_URL,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Formosa",
          addressRegion: "Formosa",
          addressCountry: "AR",
        },
        knowsAbout: [
          "Software development",
          "Backend development",
          "Artificial Intelligence",
          "Machine Learning",
          "Computer Vision",
          "Automation",
        ],
        knowsLanguage: ["es", "en"],
        sameAs: [GITHUB, LINKEDIN, UPWORK],
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={URL} />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={URL} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <main className="min-h-screen bg-background text-foreground">
        <header className="border-b border-border">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5 md:px-[6vw]">
            <Link href="/" className="t-title text-sm text-foreground">
              Facundo Majda
            </Link>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <a
                href={`mailto:${EMAIL}`}
                className="t-label text-muted-foreground transition-colors hover:text-primary"
              >
                [ CONTACTO ]
              </a>
            </div>
          </div>
        </header>

        <article className="mx-auto max-w-3xl px-6 py-16 md:px-[6vw] md:py-24">
          <p className="t-label text-muted-foreground">
            [ INGENIERÍA DE SOFTWARE · IA · BACKEND · AUTOMATIZACIÓN ]
          </p>

          <h1 className="t-display mt-6 text-balance text-[clamp(2rem,5vw,3.5rem)] text-foreground">
            Desarrollador de software e ingeniero de IA en Formosa
          </h1>

          <p className="t-body mt-6 max-w-[62ch] text-muted-foreground">
            Soy <strong className="text-foreground">Facundo Majda</strong>{" "}
            y desarrollo software que funciona en producción: aplicaciones y
            sistemas a medida, backend y APIs, integraciones, infraestructura,
            automatización e inteligencia artificial. Estoy radicado en{" "}
            <strong className="text-foreground">Formosa, Argentina</strong>, y
            trabajo con clientes de la ciudad, del NEA, de todo el país y del
            exterior.
          </p>

          <h2 className="t-title mt-14 text-xl text-foreground">Servicios</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {SERVICES.map((s) => (
              <div key={s.title} className="border border-border p-5">
                <h3 className="t-title text-sm text-foreground">{s.title}</h3>
                <p className="t-body mt-2 text-sm text-muted-foreground">
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          <h2 className="t-title mt-14 text-xl text-foreground">
            Tecnologías
          </h2>
          <div className="mt-6 flex flex-col gap-5">
            {STACK.map((g) => (
              <div key={g.group}>
                <p className="t-label text-muted-foreground">{g.group}</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {g.items.map((t) => (
                    <li
                      key={t}
                      className="t-meta border border-border px-3 py-1 text-muted-foreground"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h2 className="t-title mt-14 text-xl text-foreground">
            Preguntas frecuentes
          </h2>
          <dl className="mt-6 flex flex-col gap-5">
            {FAQ.map((f) => (
              <div key={f.q} className="border-b border-border pb-5">
                <dt className="t-title text-sm text-foreground">{f.q}</dt>
                <dd className="t-body mt-2 text-muted-foreground">{f.a}</dd>
              </div>
            ))}
          </dl>

          <h2 className="t-title mt-14 text-xl text-foreground">Contacto</h2>
          <p className="t-body mt-6 max-w-[62ch] text-muted-foreground">
            Contame qué necesitás desarrollar y te respondo con un enfoque
            técnico y una propuesta por etapas. Estoy en Formosa, disponible para
            la ciudad, el NEA, toda Argentina y el exterior.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="t-label border border-border px-4 py-2 text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Escribime por email
            </a>
            <a
              href={UPWORK}
              target="_blank"
              rel="noreferrer"
              className="t-label border border-border px-4 py-2 text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Perfil en Upwork
            </a>
            <Link
              href="/es/inteligencia-artificial-formosa"
              className="t-label border border-border px-4 py-2 text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Inteligencia artificial en Formosa
            </Link>
            <Link
              href="/"
              className="t-label border border-border px-4 py-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              Ver portfolio completo
            </Link>
          </div>

          <ServicePageNav current="/es/desarrollador-software-formosa" />

          <div className="mt-14 flex flex-wrap gap-5 border-t border-border pt-6">
            <a
              href={GITHUB}
              target="_blank"
              rel="me noreferrer"
              className="t-label text-muted-foreground hover:text-primary"
            >
              [ GITHUB ]
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="me noreferrer"
              className="t-label text-muted-foreground hover:text-primary"
            >
              [ LINKEDIN ]
            </a>
            <a
              href={UPWORK}
              target="_blank"
              rel="me noreferrer"
              className="t-label text-muted-foreground hover:text-primary"
            >
              [ UPWORK ]
            </a>
          </div>
        </article>
      </main>
    </>
  );
}
