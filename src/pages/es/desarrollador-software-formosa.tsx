import Head from "next/head";
import Link from "next/link";
import { SITE_URL } from "@/config/site";

const TITLE =
  "Desarrollador de Software en Formosa | IA, Automatización y Sistemas — Facundo Majda";
const DESCRIPTION =
  "Desarrollo software a medida, integración de inteligencia artificial y automatización para empresas de Formosa y el NEA: backend, APIs, RAG, agentes LLM y visión por computadora. Trabajo remoto desde Argentina.";
const PATH = "/es/desarrollador-software-formosa";
const URL = `${SITE_URL}${PATH}`;

const EMAIL = "facundomajda13@gmail.com";
const GITHUB = "https://github.com/FacundoMajda";
const LINKEDIN = "https://www.linkedin.com/in/facundo-majda/";
const UPWORK = "https://www.upwork.com/freelancers/~014f767f0225d54d8e";

const SERVICES = [
  {
    title: "Software a medida",
    body: "Sistemas de gestión, paneles internos y herramientas propias. Diseño la arquitectura, la base de datos y las APIs, y lo dejo funcionando en producción.",
  },
  {
    title: "Inteligencia artificial aplicada",
    body: "RAG sobre tus documentos y datos, agentes con LLM, asistentes internos y búsqueda semántica. Integrado a tus sistemas reales, no un demo.",
  },
  {
    title: "Automatización de procesos",
    body: "Flujos que conectan tus herramientas (n8n, Make, Zapier) y APIs propias para eliminar trabajo manual repetitivo.",
  },
  {
    title: "Backend, APIs e integraciones",
    body: "Servicios en Node/TypeScript, Python y Java. Integraciones con e-commerce, pagos, facturación y sistemas de terceros.",
  },
  {
    title: "Visión por computadora",
    body: "Detección y seguimiento de objetos, análisis de video y automatización de inspección con modelos como YOLO.",
  },
  {
    title: "Datos y analítica",
    body: "Pipelines de datos, tableros y modelos (PyTorch, Scikit-learn) para tomar decisiones con tus números.",
  },
];

const STACK = [
  "Python",
  "TypeScript",
  "Java",
  "NestJS",
  "FastAPI",
  "Spring Boot",
  "React",
  "Next.js",
  "LangChain",
  "LangGraph",
  "PyTorch",
  "PostgreSQL",
  "Docker",
  "n8n",
];

export default function DesarrolladorSoftwareFormosa() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${URL}/#service`,
        name: "Desarrollo de software, inteligencia artificial y automatización",
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
          jobTitle: "AI/ML & Automation Engineer",
          url: SITE_URL,
        },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: `mailto:${EMAIL}`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${URL}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: SITE_URL,
          },
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
        jobTitle: "AI/ML & Automation Engineer",
        url: SITE_URL,
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
            <a
              href={`mailto:${EMAIL}`}
              className="t-label text-muted-foreground transition-colors hover:text-primary"
            >
              [ CONTACTO ]
            </a>
          </div>
        </header>

        <article className="mx-auto max-w-3xl px-6 py-16 md:px-[6vw] md:py-24">
          <p className="t-label text-muted-foreground">
            [ DESARROLLO DE SOFTWARE · IA · AUTOMATIZACIÓN ]
          </p>

          <h1 className="t-display mt-6 text-balance text-[clamp(2rem,5vw,3.5rem)] text-foreground">
            Desarrollador de software en Formosa
          </h1>

          <p className="t-body mt-6 max-w-[62ch] text-muted-foreground">
            Ayudo a empresas de <strong className="text-foreground">Formosa</strong>{" "}
            y del NEA a construir software que funciona en producción: sistemas a
            medida, APIs, integración de inteligencia artificial y automatización
            de procesos. Trabajo de forma remota desde Argentina, con la
            profundidad técnica de un equipo grande.
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

          <h2 className="t-title mt-14 text-xl text-foreground">Tecnologías</h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {STACK.map((t) => (
              <li
                key={t}
                className="t-meta border border-border px-3 py-1 text-muted-foreground"
              >
                {t}
              </li>
            ))}
          </ul>

          <h2 className="t-title mt-14 text-xl text-foreground">
            Por qué trabajar conmigo
          </h2>
          <ul className="t-body mt-6 flex flex-col gap-3 text-muted-foreground">
            <li>
              — Trabajo end to end: base de datos, backend, APIs e interfaz.
            </li>
            <li>
              — Especialización real en IA aplicada: RAG, agentes y visión por
              computadora, no solo "usar ChatGPT".
            </li>
            <li>
              — Código pensado para producción: probado, observable y mantenible.
            </li>
            <li>— Comunicación clara y entregas por etapas.</li>
          </ul>

          <h2 className="t-title mt-14 text-xl text-foreground">Contacto</h2>
          <p className="t-body mt-6 max-w-[62ch] text-muted-foreground">
            Contame qué necesitás y te respondo con un enfoque concreto. Disponible
            para proyectos de Formosa, del NEA y de toda Argentina.
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
              href="/"
              className="t-label border border-border px-4 py-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              Ver portfolio completo
            </Link>
          </div>

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
