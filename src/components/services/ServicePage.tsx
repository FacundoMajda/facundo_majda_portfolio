import Head from "next/head";
import Link from "next/link";
import type { ReactNode } from "react";
import { SITE_URL } from "@/config/site";
import { ServicePageNav } from "./ServicePageNav";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { GlyphRain } from "@/components/canvasui/GlyphRain";
import { Liquid } from "@/components/canvasui/Liquid";

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

// Same visual system as the portfolio: full-bleed 6vw gutters, bracketed
// section markers on dashed rules, numbered tiles, the shared type scale.
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
            item: `${SITE_URL}/es/servicios`,
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

      <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Same fixed control as the portfolio: language first, then contact. */}
        <div className="fixed top-0 right-0 z-50 flex items-center gap-5 p-6 md:p-10">
          <LanguageSwitcher />
          <a
            href={`mailto:${email}`}
            className="t-label text-muted-foreground transition-colors hover:text-primary"
          >
            [ CONTACTO ]
          </a>
        </div>

        {/* Same hero as the portfolio: grid, glyph rain, liquid, display title. */}
        <section className="relative min-h-[78vh] flex flex-col justify-start overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

          <GlyphRain
            className="!absolute inset-0 z-10"
            density={0.15}
            speed={0.25}
            cell={16}
          >
            <Liquid
              className="!absolute inset-0 z-20"
              intensity={0.8}
              blend={1.5}
              densityDissipation={0.9}
              velocityDissipation={0.9}
              curl={0.4}
              radius={0.15}
            >
              <div className="relative z-30 h-full px-6 md:px-[6vw] pt-28 pb-16 md:pt-32 md:pb-20 flex flex-col justify-center">
                <div className="flex flex-col gap-2 border-b border-dashed border-border pb-4 md:flex-row md:items-baseline md:justify-between">
                  <Link
                    href="/"
                    className="t-label text-muted-foreground transition-colors hover:text-primary"
                  >
                    Facundo Majda
                  </Link>
                  <p className="t-label text-muted-foreground/70">{kicker}</p>
                </div>

                <h1 className="t-display mt-12 max-w-[24ch] text-balance text-[clamp(2rem,5.5vw,4.5rem)] text-foreground">
                  {h1}
                </h1>

                <div className="t-body mt-8 max-w-[62ch] text-lg text-muted-foreground">
                  {lede}
                </div>
              </div>
            </Liquid>
          </GlyphRain>
        </section>

        <section className="px-6 md:px-[6vw] py-24 md:py-32 bg-card border-t border-border">
          <div className="mb-16 flex items-end justify-between gap-6 border-b border-dashed border-border pb-4">
            <h2 className="t-title text-2xl md:text-3xl text-foreground">
              [ {servicesHeading.toUpperCase()} ]
            </h2>
            <span className="font-mono text-xs tabular-nums text-muted-foreground/70">
              {String(services.length).padStart(2, "0")}
            </span>
          </div>

          <div className="systems-grid grid sm:grid-cols-2 gap-x-10 gap-y-10">
            {services.map((service) => (
              <div key={service.title}>
                <h3 className="t-title text-lg text-foreground">
                  {service.title}
                </h3>
                <p className="t-body mt-3 text-muted-foreground">
                  {service.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-[6vw] py-24 md:py-32 border-t border-border">
          <div className="mb-12 flex items-end justify-between gap-6 border-b border-dashed border-border pb-4">
            <h2 className="t-title text-2xl md:text-3xl text-foreground">
              [ TECNOLOGÍAS ]
            </h2>
            <span className="font-mono text-xs tabular-nums text-muted-foreground/70">
              {String(
                stack.reduce((total, group) => total + group.items.length, 0),
              ).padStart(2, "0")}
            </span>
          </div>

          <div className="flex flex-col gap-8">
            {stack.map((group) => (
              <div key={group.group} className="flex flex-col gap-3 border-b border-dashed border-border pb-6 last:border-0">
                <p className="t-label text-muted-foreground">{group.group}</p>
                <ul className="flex flex-wrap gap-2">
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
        </section>

        <section className="px-6 md:px-[6vw] py-24 md:py-32 bg-card border-t border-border">
          <div className="mb-16 flex items-end justify-between gap-6 border-b border-dashed border-border pb-4">
            <h2 className="t-title text-2xl md:text-3xl text-foreground">
              [ PREGUNTAS FRECUENTES ]
            </h2>
            <span className="font-mono text-xs tabular-nums text-muted-foreground/70">
              {String(faq.length).padStart(2, "0")}
            </span>
          </div>

          <dl className="space-y-10">
            {faq.map((item) => (
              <div key={item.q} className="border-b border-border pb-8 last:border-0">
                <dt className="t-title text-lg text-foreground">{item.q}</dt>
                <dd className="t-body mt-3 max-w-[62ch] text-muted-foreground">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="px-6 md:px-[6vw] py-24 md:py-32 border-t border-border">
          <div className="mb-12 flex items-end justify-between gap-6 border-b border-dashed border-border pb-4">
            <h2 className="t-title text-2xl md:text-3xl text-foreground">
              [ CONTACTO ]
            </h2>
          </div>

          <p className="t-body max-w-[62ch] text-lg text-muted-foreground">
            Contame qué necesitás y te respondo con un enfoque técnico y una
            propuesta por etapas. Estoy en Formosa, disponible para la ciudad,
            el NEA, toda Argentina y el exterior.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={`mailto:${email}`}
              className="t-label border border-border px-5 py-3 text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Escribime por email
            </a>
            <a
              href={upwork}
              target="_blank"
              rel="noreferrer"
              className="t-label border border-border px-5 py-3 text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Perfil en Upwork
            </a>
            <Link
              href="/"
              className="t-label border border-border px-5 py-3 text-muted-foreground transition-colors hover:text-foreground"
            >
              Ver portfolio completo
            </Link>
          </div>

          <ServicePageNav current={path} />

          <div className="mt-16 flex flex-wrap gap-5 border-t border-dashed border-border pt-6">
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
        </section>
      </main>
    </>
  );
}

export default ServicePage;
