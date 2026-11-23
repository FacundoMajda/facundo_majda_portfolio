import Head from "next/head";
import Link from "next/link";
import type { ReactNode } from "react";
import { SITE_URL } from "@/config/site";
import { ServicePageNav } from "./ServicePageNav";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";

export type ServiceCard = { title: string; body: string };
export type StackGroup = { group: string; items: string[] };
export type FaqItem = { q: string; a: string };

export const CONTACT = {
  email: "facundomajda13@gmail.com",
  github: "https://github.com/FacundoMajda",
  linkedin: "https://www.linkedin.com/in/facundo-majda/",
  upwork: "https://www.upwork.com/freelancers/~014f767f0225d54d8e",
};

type Props = {
  path: string;
  title: string;
  description: string;
  kicker: string;
  h1: string;
  lede: ReactNode;
  services: ServiceCard[];
  stack: StackGroup[];
  faq: FaqItem[];
  servicesHeading?: string;
};

// Shared chrome for every localized service page: same Head, schema and layout.
// Each page is only content, so nothing drifts between them.
export function ServicePage({
  path,
  title,
  description,
  kicker,
  h1,
  lede,
  services,
  stack,
  faq,
  servicesHeading = "Servicios",
}: Props) {
  const url = `${SITE_URL}${path}`;
  const { email, github, linkedin, upwork } = CONTACT;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}/#service`,
        name: h1,
        serviceType: h1,
        description,
        url,
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
        "@id": `${url}/#faq`,
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Servicios (español)",
            item: `${SITE_URL}/es`,
          },
          { "@type": "ListItem", position: 3, name: h1, item: url },
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
        sameAs: [github, linkedin, upwork],
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <link rel="alternate" hrefLang="es-AR" href={url} />
        <link rel="alternate" hrefLang="en" href={SITE_URL} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:locale" content="es_AR" />
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
                href={`mailto:${email}`}
                className="t-label text-muted-foreground transition-colors hover:text-primary"
              >
                [ CONTACTO ]
              </a>
            </div>
          </div>
        </header>

        <article className="mx-auto max-w-3xl px-6 py-16 md:px-[6vw] md:py-24">
          <p className="t-label text-muted-foreground">{kicker}</p>

          <h1 className="t-display mt-6 text-balance text-[clamp(2rem,5vw,3.5rem)] text-foreground">
            {h1}
          </h1>

          <div className="t-body mt-6 max-w-[62ch] text-muted-foreground">
            {lede}
          </div>

          <h2 className="t-title mt-14 text-xl text-foreground">
            {servicesHeading}
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {services.map((service) => (
              <div key={service.title} className="border border-border p-5">
                <h3 className="t-title text-sm text-foreground">
                  {service.title}
                </h3>
                <p className="t-body mt-2 text-sm text-muted-foreground">
                  {service.body}
                </p>
              </div>
            ))}
          </div>

          <h2 className="t-title mt-14 text-xl text-foreground">Tecnologías</h2>
          <div className="mt-6 flex flex-col gap-5">
            {stack.map((group) => (
              <div key={group.group}>
                <p className="t-label text-muted-foreground">{group.group}</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="t-meta border border-border px-3 py-1 text-muted-foreground"
                    >
                      {item}
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
            {faq.map((item) => (
              <div key={item.q} className="border-b border-border pb-5">
                <dt className="t-title text-sm text-foreground">{item.q}</dt>
                <dd className="t-body mt-2 text-muted-foreground">{item.a}</dd>
              </div>
            ))}
          </dl>

          <h2 className="t-title mt-14 text-xl text-foreground">Contacto</h2>
          <p className="t-body mt-6 max-w-[62ch] text-muted-foreground">
            Contame qué necesitás y te respondo con un enfoque técnico y una
            propuesta por etapas. Estoy en Formosa, disponible para la ciudad,
            el NEA, toda Argentina y el exterior.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`mailto:${email}`}
              className="t-label border border-border px-4 py-2 text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Escribime por email
            </a>
            <a
              href={upwork}
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

          <ServicePageNav current={path} />

          <div className="mt-14 flex flex-wrap gap-5 border-t border-border pt-6">
            <a
              href={github}
              target="_blank"
              rel="me noreferrer"
              className="t-label text-muted-foreground hover:text-primary"
            >
              [ GITHUB ]
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="me noreferrer"
              className="t-label text-muted-foreground hover:text-primary"
            >
              [ LINKEDIN ]
            </a>
            <a
              href={upwork}
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

export default ServicePage;
