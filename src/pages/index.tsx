import { ArrowUpRight, Github, Linkedin, MoveUpRight } from "lucide-react";
import Head from "next/head";
import type { GetServerSidePropsContext } from "next";
import { useState } from "react";
import ContactForm from "@/components/blocx/ContactForm";
import { Glitch } from "@/components/canvasui/Glitch";
import { Grid } from "@/components/canvasui/Grid";
import { GlyphRain } from "@/components/canvasui/GlyphRain";
import { LazyEffect } from "@/components/canvasui/LazyEffect";
import { Liquid } from "@/components/canvasui/Liquid";
import { VHS } from "@/components/canvasui/VHS";
import ProjectModal from "@/components/ProjectModal";
import type { ProjectItem } from "@/types";
import { db } from "@/db";
import {
  profile,
  socialLink,
  techTag,
  experience,
  education,
} from "@/db/schema";
import { asc, desc, isNotNull, sql } from "drizzle-orm";
import { geistMono, manrope, spaceGrotesk } from "@/styles/fonts";
import { Reveal } from "@/utils";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { SITE_URL } from "@/config/site";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useCopy } from "@/i18n/useCopy";

// Icons come from CDNs: brand icons carry their own colour, but monochrome ones
// are pure white/black and would vanish against one of the two themes. Invert the
// monochrome ones so they always read against the page.
function iconThemeClass(icon: string): string {
  if (icon.includes("/ffffff") || icon.startsWith("/icons/")) {
    return "invert dark:invert-0";
  }
  if (icon.includes("/000000")) {
    return "dark:invert";
  }
  return "";
}

const SpinningBrain = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="animate-[spin_10s_linear_infinite] text-primary"
  >
    <path d="M12 16v-4" />
    <path d="M12 8V4" />
    <path d="M4 12h4" />
    <path d="M16 12h4" />
    <circle cx="12" cy="12" r="3" />
    <path d="M19.07 4.93L16.24 7.76" />
    <path d="M7.76 16.24l-2.83 2.83" />
    <path d="M4.93 4.93l2.83 2.83" />
    <path d="M16.24 16.24l2.83 2.83" />
  </svg>
);

const MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function fmtMonth(date: Date) {
  return MONTH_SHORT[date.getUTCMonth()];
}

function fmtYear(date: Date) {
  return String(date.getUTCFullYear());
}

function fmtRange(start: string, end: string | null, isCurrent: boolean) {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : null;
  const startMonth = fmtMonth(startDate);
  const startYear = fmtYear(startDate);
  if (!endDate) {
    if (isCurrent) return `${startMonth} ${startYear} — Present`;
    return `${startMonth} ${startYear} —`;
  }
  const endMonth = fmtMonth(endDate);
  const endYear = fmtYear(endDate);
  if (startMonth === endMonth && startYear === endYear) {
    return `${startMonth} ${startYear}`;
  }
  if (startYear === endYear) return `${startMonth} — ${endMonth} ${endYear}`;
  return `${startMonth} ${startYear} — ${endMonth} ${endYear}`;
}

const MENU_ITEMS: { name: string; href: string; color: string }[] = [
  { name: "Home", href: "#banner", color: "bg-primary" },
  { name: "About Me", href: "#about-me", color: "bg-purple-500" },
  { name: "Expertise", href: "#stack", color: "bg-emerald-500" },
  { name: "Education", href: "#education", color: "bg-yellow-500" },
  { name: "Experience", href: "#experience", color: "bg-pink-500" },
];

type SocialLinkRow = { platform: string; url: string };
type TechTagRow = {
  name: string;
  category: string;
  iconUrl: string | null;
  featured: boolean;
  order: number;
};
type ExperienceRow = {
  company: string;
  link: string | null;
  role: string;
  startDate: string;
  endDate: string | null;
  description: string;
  isCurrent: boolean;
  order: number;
};
type EducationRow = {
  institution: string;
  link: string | null;
  degree: string;
  startDate: string;
  endDate: string | null;
  description: string;
  order: number;
};
type ProfileRow = {
  heroTitle: string;
  heroTagline: string;
  aboutText: string;
  statusLine: string;
  yearsExp: number;
  contactEmail: string;
  seoTitle: string;
  seoDescription: string;
  seoUrl: string;
};

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  // The landing is DB-driven but changes rarely. Let the Vercel edge cache it
  // and revalidate in the background, so repeat visits skip the SSR round-trip
  // (Vercel's default for pages with getServerSideProps is no-store).
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400",
  );

  const profileRows = await db
    .select({
      heroTitle: profile.heroTitle,
      heroTagline: profile.heroTagline,
      aboutText: profile.aboutText,
      statusLine: profile.statusLine,
      yearsExp: profile.yearsExp,
      contactEmail: profile.contactEmail,
      seoTitle: profile.seoTitle,
      seoDescription: profile.seoDescription,
      seoUrl: profile.seoUrl,
    })
    .from(profile)
    .limit(1);
  const profileRow = profileRows[0] as ProfileRow | undefined;

  const socialRows = await db
    .select()
    .from(socialLink)
    .orderBy(asc(socialLink.order));

  const techRows = await db
    .select()
    .from(techTag)
    .where(isNotNull(techTag.iconUrl))
    .orderBy(asc(techTag.category), asc(techTag.order));

  const expRows = await db
    .select()
    .from(experience)
    .orderBy(
      desc(sql`coalesce(${experience.endDate}, ${experience.startDate})`),
      asc(experience.order),
    );

  const eduRows = await db.select().from(education).orderBy(asc(education.order));

  return {
    props: {
      profile: profileRow ?? null,
      socials: socialRows as SocialLinkRow[],
      techs: techRows as TechTagRow[],
      experiences: expRows.map((r) => ({ ...r, startDate: r.startDate.toISOString(), endDate: r.endDate ? r.endDate.toISOString() : null })) as unknown as ExperienceRow[],
      educations: eduRows.map((r) => ({ ...r, startDate: r.startDate.toISOString(), endDate: r.endDate ? r.endDate.toISOString() : null })) as unknown as EducationRow[],
    },
  };
}

export default function Portfolio({
  profile,
  socials,
  techs,
  experiences,
  educations,
}: {
  profile: ProfileRow | null;
  socials: SocialLinkRow[];
  techs: TechTagRow[];
  experiences: ExperienceRow[];
  educations: EducationRow[];
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const SOCIAL = Object.fromEntries(socials.map((s) => [s.platform, s.url]));
  const c = useCopy();

  const STACK_CATEGORIES = techs.reduce<{ name: string; items: { name: string; icon: string }[] }[]>(
    (acc, t) => {
      const last = acc[acc.length - 1];
      if (!last || last.name !== t.category) {
        acc.push({ name: t.category, items: [{ name: t.name, icon: t.iconUrl ?? "" }] });
      } else {
        last.items.push({ name: t.name, icon: t.iconUrl ?? "" });
      }
      return acc;
    },
    [],
  );

  const EDUCATION = educations.map((e) => ({
    institution: e.institution,
    link: e.link,
    degree: e.degree,
    date: e.endDate ? fmtRange(e.startDate, e.endDate, false) : fmtRange(e.startDate, null, true),
    desc: e.description,
  }));

  const EXPERIENCE = experiences.map((j) => ({
    company: j.company,
    link: j.link,
    role: j.role,
    date: fmtRange(j.startDate, j.endDate, j.isCurrent),
    desc: j.description,
  }));

  const seoTitle = profile?.seoTitle ?? "Facundo Majda — AI/ML & Automation Engineer";
  const seoDescription =
    profile?.seoDescription ??
    "AI/ML & Automation Engineer. I design and ship production AI systems — RAG pipelines, LLM agents, computer vision, and the backend that holds them up.";
  const seoUrl = profile?.seoUrl ?? SITE_URL;
  const ogImage = `${SITE_URL}/og.png`;
  const personId = `${seoUrl}/#person`;
  const siteId = `${seoUrl}/#website`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": seoUrl,
        url: seoUrl,
        name: seoTitle,
        description: seoDescription,
        inLanguage: "en",
        isPartOf: { "@id": siteId },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: "Facundo Majda",
        jobTitle: "AI/ML & Automation Engineer",
        url: seoUrl,
        email: profile?.contactEmail
          ? `mailto:${profile.contactEmail}`
          : undefined,
        description: seoDescription,
        image: ogImage,
        knowsLanguage: ["en", "es"],
        knowsAbout: [
          "Artificial Intelligence",
          "Machine Learning",
          "Large Language Models",
          "Retrieval-Augmented Generation",
          "LLM Agents",
          "{c.sys2Title}",
          "Natural Language Processing",
          "Automation",
          "Backend Architecture",
        ],
        hasOccupation: {
          "@type": "Occupation",
          name: "AI/ML & Automation Engineer",
        },
        sameAs: [SOCIAL.github, SOCIAL.linkedin, SOCIAL.upwork].filter(
          Boolean,
        ),
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        name: "Facundo Majda",
        url: seoUrl,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
    ],
  };

  return (
    <div
      className={`bg-background text-foreground min-h-screen ${manrope.className} ${spaceGrotesk.variable} ${geistMono.variable} overflow-x-hidden selection:bg-primary selection:text-primary-foreground`}
    >
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta
          name="keywords"
          content="AI Engineer, Machine Learning, LLM, RAG, {c.sys2Title}, Automation, Backend, NestJS, Spring Boot, PyTorch, LangChain, Portfolio"
        />
        <meta name="author" content="Facundo Majda" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href={seoUrl} />
        <link rel="alternate" hrefLang="en" href={seoUrl} />
        <link rel="alternate" hrefLang="es-AR" href={`${SITE_URL}/es`} />
        <link rel="alternate" hrefLang="x-default" href={seoUrl} />
        <link rel="describedby" href={`${SITE_URL}/llms.txt`} />
        <link
          rel="alternate"
          type="text/markdown"
          href={`${SITE_URL}/llms-full.txt`}
        />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Facundo Majda" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={seoUrl} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Facundo Majda — AI/ML & Automation Engineer" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta
          name="twitter:image:alt"
          content="Facundo Majda — AI/ML & Automation Engineer"
        />
        <meta name="twitter:creator" content="@facundomajda" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <div className="fixed top-0 right-0 z-50 p-6 md:p-10 mix-blend-difference">
        <LazyEffect
          as={Glitch}
          rootMargin="0px"
          intensity={0.6}
          interval={8}
          duration={0.25}
        >
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="group w-12 h-12 relative flex items-center justify-center"
            aria-label={c.toggleMenu}
          >
            <span
              className={`absolute w-8 h-0.5 bg-white transition-transform duration-300 ${
                isMenuOpen ? "rotate-45" : "-translate-y-1.5"
              }`}
            ></span>
            <span
              className={`absolute w-8 h-0.5 bg-white transition-transform duration-300 ${
                isMenuOpen ? "-rotate-45" : "translate-y-1.5"
              }`}
            ></span>
          </button>
        </LazyEffect>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-black/70 transition-opacity duration-500 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 h-screen w-[520px] max-w-[calc(100vw-3rem)] bg-card border-l border-dashed border-border z-40 transform transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] flex flex-col justify-start overflow-y-auto py-10 px-8 md:px-14 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-8">
          <div>
            <div className="mb-5 flex items-baseline justify-between border-b border-dashed border-border pb-3">
              <p className="t-label text-muted-foreground">{c.menuLabel}</p>
              <span className="t-meta text-muted-foreground/70">
                {String(MENU_ITEMS.length).padStart(2, "0")}
              </span>
            </div>
            <ul>
              {MENU_ITEMS.map((item, idx) => (
                <li
                  key={idx}
                  className="border-b border-border last:border-0"
                >
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMenuOpen(false);
                      const element = document.querySelector(item.href);
                      if (element) {
                        element.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    }}
                    className="group flex items-baseline gap-4 py-3 cursor-pointer"
                  >
                    <span className="t-meta w-7 shrink-0 text-muted-foreground/70 transition-colors group-hover:text-primary">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="t-title text-2xl md:text-3xl text-foreground transition-all group-hover:translate-x-1 group-hover:text-foreground">
                      {c.menuItems[item.name] ?? item.name}
                    </span>
                    <MoveUpRight
                      size={14}
                      className="ml-auto shrink-0 text-muted-foreground/70 opacity-0 transition-all group-hover:opacity-100 group-hover:text-primary"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-4 border-b border-dashed border-border pb-3">
              <p className="t-label text-muted-foreground">{c.socialLabel}</p>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {socials
                .filter((s) => s.platform !== "email")
                .map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="me noreferrer"
                    className="t-label text-muted-foreground transition-colors hover:text-primary"
                  >
                    [{s.platform}]
                  </a>
                ))}
            </div>
          </div>

          <div>
            <div className="mb-4 border-b border-dashed border-border pb-3">
              <p className="t-label text-muted-foreground">{c.statusLabel}</p>
            </div>
            <p className="t-body max-w-[42ch] text-muted-foreground">
              {profile?.statusLine ??
                "Available for remote engineering roles and selected projects"}
            </p>
          </div>

          <div>
            <div className="mb-4 border-b border-dashed border-border pb-3">
              <p className="t-label text-muted-foreground">{c.servicesLabel}</p>
            </div>
            <a
              href="/es/servicios"
              className="t-label block text-muted-foreground transition-colors hover:text-primary"
            >
              Todos los servicios (español)
            </a>
            <a
              href="/es/desarrollador-software-formosa"
              className="t-label mt-2 block text-muted-foreground transition-colors hover:text-primary"
            >
              Desarrollador de software en Formosa
            </a>
            <a
              href="/es/inteligencia-artificial-formosa"
              className="t-label mt-2 block text-muted-foreground transition-colors hover:text-primary"
            >
              Inteligencia artificial en Formosa
            </a>
          </div>

          <div>
            <div className="mb-4 border-b border-dashed border-border pb-3">
              <p className="t-label text-muted-foreground">{c.languageLabel}</p>
            </div>
            <LanguageSwitcher />
          </div>

          <div>
            <div className="mb-4 border-b border-dashed border-border pb-3">
              <p className="t-label text-muted-foreground">{c.themeLabel}</p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
      <main>
        <section
          id="banner"
          className="relative min-h-screen flex flex-col justify-start overflow-hidden"
        >
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
              <div className="relative z-30 w-full h-full flex flex-col lg:flex-row justify-start lg:justify-between items-center lg:items-end gap-12 lg:gap-16 px-6 md:px-[6vw] pt-20 md:pt-24 pb-12 lg:pb-[15vh]">
                <div className="w-full lg:max-w-[55%] space-y-1">
                  <Reveal>
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {SOCIAL.github && (
                        <a
                          href={SOCIAL.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-secondary hover:border-foreground/30 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          GitHub
                          <ArrowUpRight className="w-3 h-3 text-muted-foreground" />
                        </a>
                      )}
                      {SOCIAL.linkedin && (
                        <a
                          href={SOCIAL.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-secondary hover:border-foreground/30 transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                          LinkedIn
                          <ArrowUpRight className="w-3 h-3 text-muted-foreground" />
                        </a>
                      )}
                    </div>
                    <h1
                      className="t-display text-foreground"
                      style={{
                        letterSpacing: "0.02em",
                        fontSize: "clamp(2rem, 8vw, 7.8rem)",
                      }}
                    >
                      <span className="text-foreground">AI/ML &amp; </span>
                      <span className="text-primary">Automation</span>
                    </h1>
                  </Reveal>
                  <Reveal delay={25}>
                    <p className="t-label mt-2 text-muted-foreground md:text-[0.975rem]">
                      {c.heroLabel}
                    </p>
                  </Reveal>
                  <Reveal delay={50}>
                    <h2 className="mt-4">
                      <span className="t-title block text-xl text-muted-foreground md:text-[1.95rem]">
                        {c.heroHi}{" "}
                        <span className="text-foreground">Facundo Majda</span>
                      </span>
                      <span className="t-body mt-2 block max-w-[58ch] text-muted-foreground md:text-[1.3rem]">
                        {profile?.heroTitle ?? c.heroFallback} —{" "}
                        <span className="text-primary">
                          {c.heroSub}
                        </span>
                        .
                      </span>
                    </h2>
                  </Reveal>
                  <Reveal delay={100}>
                    <div
                      className="mt-6 overflow-hidden"
                      style={{
                        maskImage:
                          "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
                        WebkitMaskImage:
                          "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
                      }}
                    >
                      <div className="marquee t-meta whitespace-nowrap uppercase text-muted-foreground md:text-[0.975rem]">
                        {profile?.heroTagline ?? "SWE | Data & AI-Driven Apps | FDE | Full-Stack + Automation"}{" "}
                        {profile?.heroTagline ?? "SWE | Data & AI-Driven Apps | FDE | Full-Stack + Automation"}
                      </div>
                    </div>
                  </Reveal>
                </div>

                <div className="flex md:flex-row lg:flex-col gap-8 md:gap-12 lg:gap-8 text-center lg:text-right justify-center lg:justify-end lg:self-end">
                  <Reveal delay={300}>
                    <div>
                      <h5 className="font-mono text-4xl sm:text-5xl md:text-[4.875rem] lg:text-[3.9rem] tabular-nums text-primary mb-1">
                        {c.overLabel} {profile?.yearsExp ?? 3}+
                      </h5>
                      <p className="t-label text-muted-foreground">
                        {c.yearsEngineering}
                      </p>
                    </div>
                  </Reveal>
                </div>
              </div>
            </Liquid>
          </GlyphRain>
        </section>

        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}

        <section
          id="about-me"
          className="py-32 px-6 md:px-[6vw] bg-card border-t border-border"
        >
          <div className="w-full">
            <div className="mb-10 flex items-baseline justify-between gap-6 border-b border-dashed border-border pb-4">
              <p className="t-label text-muted-foreground">
                {c.aboutLabel}
              </p>
              <span className="font-mono text-xs tabular-nums text-muted-foreground/70">
                {profile?.yearsExp ?? 3}+ {c.years}
              </span>
            </div>

            <Reveal>
              <h2 className="t-display mb-16 max-w-[26ch] text-balance text-[clamp(1.75rem,4vw,3.5rem)] text-foreground">
                {c.aboutHead1}{" "}
                <span className="text-primary">
                  AI/ML &amp; Automation Engineer
                </span>{" "}
                {c.aboutHead3}{" "}
                <span className="text-primary">
                  {c.aboutHead4}
                </span>
                .
              </h2>
            </Reveal>

            <Reveal>
              <p className="t-label pb-3 border-b border-dashed border-border text-muted-foreground mb-10">
                AI/ML · LLMs · {c.sys2Title} · Backend · Automation
              </p>
            </Reveal>

            <div className="grid md:grid-cols-12 gap-8 md:gap-12 lg:gap-16">
              <div className="md:col-span-5">
                <Reveal>
                  <p className="t-label text-muted-foreground">{c.profileLabel}</p>
                </Reveal>
              </div>
              <div className="md:col-span-7">
                <div className="t-body max-w-[62ch] space-y-8 text-lg text-foreground">
                  <Reveal delay={100}>
                    <p>
                      {c.aboutP1}
                    </p>
                  </Reveal>
                  <Reveal delay={200}>
                    <p className="text-muted-foreground">
                      {c.aboutP2}
                    </p>
                  </Reveal>
                </div>
              </div>
            </div>

            <Reveal delay={300}>
              <div className="mt-20 pt-12 border-t border-border">
                <h3 className="font-mono text-2xl md:text-3xl uppercase tracking-[0.2em] text-foreground mb-12">
                  {c.systemsTitle}
                </h3>
                <div className="systems-grid grid sm:grid-cols-2 gap-x-10 gap-y-10">
                  <div className="group">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <h4 className="font-mono text-lg uppercase tracking-[0.14em] text-foreground group-hover:text-foreground transition-colors">
                        {c.sys1Title}
                      </h4>
                    </div>
                    <p className="t-body text-muted-foreground">{c.sys1Body}</p>
                  </div>
                  <div className="group">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <h4 className="font-mono text-lg uppercase tracking-[0.14em] text-foreground group-hover:text-foreground transition-colors">
                        {c.sys2Title}
                      </h4>
                    </div>
                    <p className="t-body text-muted-foreground">{c.sys2Body}</p>
                  </div>
                  <div className="group">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <h4 className="font-mono text-lg uppercase tracking-[0.14em] text-foreground group-hover:text-foreground transition-colors">
                        {c.sys3Title}
                      </h4>
                    </div>
                    <p className="t-body text-muted-foreground">{c.sys3Body}</p>
                  </div>
                  <div className="group">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <h4 className="font-mono text-lg uppercase tracking-[0.14em] text-foreground group-hover:text-foreground transition-colors">
                        {c.sys4Title}
                      </h4>
                    </div>
                    <p className="t-body text-muted-foreground">{c.sys4Body}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="stack" className="py-32 px-6 md:px-[6vw] bg-background">
          <div className="w-full">
            <Reveal>
              <LazyEffect as={GlyphRain} density={0.2} speed={0.3} cell={14}>
                <div className="mb-20 flex items-end justify-between gap-6 border-b border-dashed border-border pb-4">
                  <div className="flex items-center gap-4">
                    <SpinningBrain />
                    <h2 className="t-title text-2xl md:text-3xl text-foreground">
                      {c.expertiseLabel}
                    </h2>
                  </div>
                  <span className="font-mono text-xs tabular-nums text-muted-foreground/70">
                    {String(techs.length).padStart(2, "0")} {c.tools}
                  </span>
                </div>
              </LazyEffect>
            </Reveal>

            <div className="space-y-12 md:space-y-16">
              {STACK_CATEGORIES.map((cat, idx) => (
                <div
                  key={cat.name}
                  className="grid lg:grid-cols-12 gap-y-6 md:gap-y-8 border-b border-dashed border-border pb-10 md:pb-12 last:border-0"
                >
                  <div className="lg:col-span-5">
                    <Reveal delay={idx * 100}>
                      <h3 className="font-mono text-xl md:text-2xl uppercase tracking-[0.2em] text-muted-foreground/70">
                        {cat.name}
                      </h3>
                    </Reveal>
                  </div>
                  <div className="lg:col-span-7 flex flex-wrap gap-x-6 gap-y-3">
                    {cat.items.map((item, itemIdx) => (
                      <Reveal
                        key={item.name}
                        delay={idx * 100 + itemIdx * 50}
                      >
                        <div className="flex items-center gap-2">
                          {/* eslint-disable-next-line @next/next/no-img-element -- SVG icon, next/image adds no value for inline-sized SVGs */}
                          <img
                            src={item.icon}
                            alt={item.name}
                            className={`w-5 h-5 ${iconThemeClass(item.icon)}`}
                          />
                          <span className="font-mono text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors cursor-default">
                            {item.name}
                          </span>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        <section id="education" className="py-32 px-6 md:px-[6vw] bg-card">
          <div className="w-full">
            <Reveal>
              <LazyEffect as={VHS} wave={0.4} grain={0.15} jitter={0.3}>
                <div className="mb-16 flex items-end justify-between gap-6 border-b border-dashed border-border pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-green-500 animate-pulse"></div>
                    <h2 className="t-title text-2xl md:text-3xl text-foreground">
                      {c.educationLabel}
                    </h2>
                  </div>
                  <span className="font-mono text-xs tabular-nums text-muted-foreground/70">
                    {String(EDUCATION.length).padStart(2, "0")} {c.records}
                  </span>
                </div>
              </LazyEffect>
            </Reveal>

            <div className="space-y-12 border-l border-dashed border-border ml-3 md:ml-0">
              {EDUCATION.map((edu, idx) => (
                <Reveal
                  key={idx}
                  delay={idx * 100}
                  className="relative pl-8 md:pl-12"
                >
                  <span className="absolute left-[-5px] top-2 w-2.5 h-2.5 bg-green-600 rounded-full ring-4 ring-card"></span>
                  <div className="group">
                    <p className="t-meta text-green-500 mb-1">
                      {edu.date}
                    </p>
                    <h3 className="t-title text-xl md:text-2xl text-foreground mb-2">
                      {edu.degree}
                    </h3>
                    <p className="text-xl text-muted-foreground font-manrope mb-4">
                      {edu.link ? (
                        <a
                          href={edu.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                          {edu.institution}
                        </a>
                      ) : (
                        edu.institution
                      )}
                    </p>
                    <p className="text-muted-foreground font-manrope max-w-2xl leading-relaxed">
                      {edu.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="py-32 px-6 md:px-[6vw] bg-secondary/50">
          <div className="w-full">
            <Reveal>
              <LazyEffect as={Grid} tileSize={32}>
                <div className="mb-16 flex items-end justify-between gap-6 border-b border-dashed border-border pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-primary animate-pulse"></div>
                    <h2 className="t-title text-2xl md:text-3xl text-foreground">
                      {c.experienceLabel}
                    </h2>
                  </div>
                  <span className="font-mono text-xs tabular-nums text-muted-foreground/70">
                    {String(EXPERIENCE.length).padStart(2, "0")} {c.roles}
                  </span>
                </div>
              </LazyEffect>
            </Reveal>

            <div className="space-y-12 border-l border-dashed border-border ml-3 md:ml-0">
              {EXPERIENCE.map((job, idx) => (
                <Reveal
                  key={idx}
                  delay={idx * 100}
                  className="relative pl-8 md:pl-12"
                >
                  <span className="absolute left-[-5px] top-2 w-2.5 h-2.5 bg-primary rounded-full ring-4 ring-card"></span>
                  <div className="group">
                    <p className="t-meta text-primary mb-1">
                      {job.date}
                    </p>
                    <h3 className="t-title text-xl md:text-2xl text-foreground mb-2">
                      {job.role}
                    </h3>
                    <p className="text-xl text-muted-foreground font-manrope mb-4">
                      {job.link ? (
                        <a
                          href={job.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                          {job.company}
                        </a>
                      ) : (
                        job.company
                      )}
                    </p>
                    <p className="text-muted-foreground font-manrope max-w-2xl leading-relaxed">
                      {job.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

      </main>

      <div id="contact">
        <ContactForm />
      </div>
    </div>
  );
}