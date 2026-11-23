import Head from "next/head";
import Link from "next/link";
import { SITE_URL } from "@/config/site";

const TITLE =
  "Inteligencia Artificial en Formosa | RAG, Agentes y Visión — Facundo Majda";
const DESCRIPTION =
  "Implemento inteligencia artificial en producción para empresas de Formosa y el NEA: asistentes con RAG sobre tus datos, agentes con LLM, visión por computadora y automatización. Radicado en Formosa, Argentina.";
const PATH = "/es/inteligencia-artificial-formosa";
const URL = `${SITE_URL}${PATH}`;

const EMAIL = "facundomajda13@gmail.com";
const GITHUB = "https://github.com/FacundoMajda";
const LINKEDIN = "https://www.linkedin.com/in/facundo-majda/";
const UPWORK = "https://www.upwork.com/freelancers/~014f767f0225d54d8e";

const SERVICES = [
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
];

const STACK = [
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
];

const FAQ = [
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
];

export default function InteligenciaArtificialFormosa() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${URL}/#service`,
        name: "Inteligencia artificial aplicada",
        serviceType: "Artificial intelligence development",
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
            name: "Inteligencia artificial en Formosa",
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
            [ INTELIGENCIA ARTIFICIAL · LLM · VISIÓN ]
          </p>

          <h1 className="t-display mt-6 text-balance text-[clamp(2rem,5vw,3.5rem)] text-foreground">
            Inteligencia artificial en Formosa
          </h1>

          <p className="t-body mt-6 max-w-[62ch] text-muted-foreground">
            Implemento inteligencia artificial que <strong className="text-foreground">funciona
            en producción</strong> para empresas de Formosa y del NEA: asistentes
            con RAG sobre tus propios datos, agentes con LLM, visión por
            computadora y automatización. Estoy radicado en Formosa, Argentina.
          </p>

          <h2 className="t-title mt-14 text-xl text-foreground">
            Qué puedo construir
          </h2>
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
            Contame qué problema querés resolver con IA y te respondo con un
            enfoque concreto. Estoy en Formosa, disponible para la ciudad, el NEA,
            toda Argentina y el exterior.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="t-label border border-border px-4 py-2 text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Escribime por email
            </a>
            <Link
              href="/es/desarrollador-software-formosa"
              className="t-label border border-border px-4 py-2 text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Desarrollo de software en Formosa
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
