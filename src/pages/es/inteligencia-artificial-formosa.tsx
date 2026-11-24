import Head from "next/head";
import Link from "next/link";
import { SITE_URL } from "@/config/site";
import { BESPOKE_PAGES_CONTENT, CONTACT } from "@/content/service-pages-content";
import { ServicePageNav } from "@/components/services/ServicePageNav";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";

const PATH = "/es/inteligencia-artificial-formosa";
const PAGE = BESPOKE_PAGES_CONTENT[PATH];
const TITLE = PAGE.title;
const DESCRIPTION = PAGE.description;
const URL = `${SITE_URL}${PATH}`;

const {
  email: EMAIL,
  github: GITHUB,
  linkedin: LINKEDIN,
  upwork: UPWORK,
} = CONTACT;

const SERVICES = PAGE.services;
const STACK = PAGE.stack.flatMap((group) => group.items);
const FAQ = PAGE.faq;

export default function AiFormosaPage() {
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
        <link
          rel="alternate"
          type="text/markdown"
          href={`${URL}.md`}
          title="Markdown version"
        />
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
          <p className="t-label text-muted-foreground">{PAGE.kicker}</p>

          <h1 className="t-display mt-6 text-balance text-[clamp(2rem,5vw,3.5rem)] text-foreground">
            {PAGE.h1}
          </h1>

          <p className="t-body mt-6 max-w-[62ch] text-muted-foreground">
            {PAGE.lede.map((segment, index) =>
              segment.strong ? (
                <strong key={index} className="text-foreground">
                  {segment.text}
                </strong>
              ) : (
                segment.text
              ),
            )}
          </p>

          <h2 className="t-title mt-14 text-xl text-foreground">
            {PAGE.servicesHeading}
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

          <h2 className="t-title mt-14 text-xl text-foreground">
            {PAGE.stackHeading}
          </h2>
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
            {PAGE.faqHeading}
          </h2>
          <dl className="mt-6 flex flex-col gap-5">
            {FAQ.map((f) => (
              <div key={f.q} className="border-b border-border pb-5">
                <dt className="t-title text-sm text-foreground">{f.q}</dt>
                <dd className="t-body mt-2 text-muted-foreground">{f.a}</dd>
              </div>
            ))}
          </dl>

          <h2 className="t-title mt-14 text-xl text-foreground">
            {PAGE.contact.heading}
          </h2>
          <p className="t-body mt-6 max-w-[62ch] text-muted-foreground">
            {PAGE.contact.body}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {PAGE.contact.actions.map((action) => {
              const className = `t-label border border-border px-4 py-2 ${
                action.muted
                  ? "text-muted-foreground transition-colors hover:text-foreground"
                  : "text-foreground transition-colors hover:border-primary hover:text-primary"
              }`;
              return action.href.startsWith("/") ? (
                <Link key={action.label} href={action.href} className={className}>
                  {action.label}
                </Link>
              ) : (
                <a
                  key={action.label}
                  href={action.href}
                  target={action.newTab ? "_blank" : undefined}
                  rel={action.newTab ? "noreferrer" : undefined}
                  className={className}
                >
                  {action.label}
                </a>
              );
            })}
          </div>

          <ServicePageNav current="/es/inteligencia-artificial-formosa" />

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
