import { ArrowUpRight, Github, Linkedin, MoveUpRight } from "lucide-react";
import Head from "next/head";
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
    className="animate-[spin_10s_linear_infinite] text-blue-500"
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
  { name: "Home", href: "#banner", color: "bg-blue-500" },
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

export async function getServerSideProps() {
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
  const seoUrl = profile?.seoUrl ?? "https://facundomajda.dev";
  const ogImage = `${seoUrl}/icons/og.svg`;
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Facundo Majda",
    jobTitle: "AI/ML & Automation Engineer",
    url: seoUrl,
    email: profile?.contactEmail ? `mailto:${profile.contactEmail}` : undefined,
    description: seoDescription,
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Large Language Models",
      "Retrieval-Augmented Generation",
      "Computer Vision",
      "Automation",
      "Backend Development",
    ],
    knowsLanguage: ["en", "es"],
    sameAs: [SOCIAL.upwork].filter(Boolean),
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Facundo Majda",
    url: seoUrl,
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: `${seoUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does Facundo Majda do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Facundo Majda is an AI/ML & Automation Engineer. He designs and ships production AI systems — RAG pipelines, LLM agents, computer vision, NLP — plus the backend and integrations that hold them up.",
        },
      },
      {
        "@type": "Question",
        name: "What technologies does Facundo Majda work with?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Backend in TypeScript and Java (NestJS, Spring Boot), frontends in React, Next.js, and Angular, ML and data in Python with PyTorch, AI orchestration with LangChain, LangGraph, Mastra, and the Vercel AI SDK, and automation on n8n, Make, and Zapier.",
        },
      },
      {
        "@type": "Question",
        name: "Is Facundo Majda available for hire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Facundo is available for AI, LLM, and automation projects. Hire him through Upwork via the Hire Me button on the portfolio.",
        },
      },
    ],
  };

  return (
    <div
      className={`bg-[#050505] text-slate-200 min-h-screen ${manrope.className} ${spaceGrotesk.variable} ${geistMono.variable} overflow-x-hidden selection:bg-blue-500 selection:text-white`}
    >
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta
          name="keywords"
          content="AI Engineer, Machine Learning, LLM, RAG, Computer Vision, Automation, Backend, NestJS, Spring Boot, PyTorch, LangChain, Portfolio"
        />
        <meta name="author" content="Facundo Majda" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href={seoUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Facundo Majda" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={seoUrl} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Facundo Majda — AI/ML & Automation Engineer" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:creator" content="@facundomajda" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
            aria-label="Toggle menu"
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
        className={`fixed inset-0 z-40 bg-black/90 transition-opacity duration-500 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 h-screen w-[520px] max-w-[calc(100vw-3rem)] bg-[#0a0a0a] border-l border-dashed border-zinc-800 z-40 transform transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] flex flex-col justify-center py-10 px-8 md:px-14 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-10">
          <div>
            <div className="mb-5 flex items-baseline justify-between border-b border-dashed border-zinc-800 pb-3">
              <p className="t-label text-zinc-500">[ MENU ]</p>
              <span className="t-meta text-zinc-600">
                {String(MENU_ITEMS.length).padStart(2, "0")}
              </span>
            </div>
            <ul>
              {MENU_ITEMS.map((item, idx) => (
                <li
                  key={idx}
                  className="border-b border-zinc-900 last:border-0"
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
                    <span className="t-meta w-7 shrink-0 text-zinc-600 transition-colors group-hover:text-blue-500">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="t-title text-2xl md:text-3xl text-zinc-300 transition-all group-hover:translate-x-1 group-hover:text-white">
                      {item.name}
                    </span>
                    <MoveUpRight
                      size={14}
                      className="ml-auto shrink-0 text-zinc-700 opacity-0 transition-all group-hover:opacity-100 group-hover:text-blue-500"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-4 border-b border-dashed border-zinc-800 pb-3">
              <p className="t-label text-zinc-500">[ SOCIAL ]</p>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {socials
                .filter((s) => s.platform !== "email")
                .map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="t-label text-zinc-400 transition-colors hover:text-blue-500"
                  >
                    [{s.platform}]
                  </a>
                ))}
            </div>
          </div>

          <div>
            <div className="mb-4 border-b border-dashed border-zinc-800 pb-3">
              <p className="t-label text-zinc-500">[ STATUS ]</p>
            </div>
            <p className="t-body max-w-[42ch] text-zinc-400">
              {profile?.statusLine ??
                "Available for remote engineering roles and selected projects"}
            </p>
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
              <div className="relative z-30 container mx-auto h-full flex flex-col lg:flex-row justify-start lg:justify-between items-center lg:items-end gap-12 lg:gap-16 px-6 md:px-20 lg:px-24 pt-20 md:pt-24 pb-12">
                <div className="w-full lg:max-w-[55%] space-y-1">
                  <Reveal>
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {SOCIAL.github && (
                        <a
                          href={SOCIAL.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border border-zinc-700 text-zinc-300 text-sm font-medium hover:bg-zinc-800/50 hover:border-zinc-600 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          GitHub
                          <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                        </a>
                      )}
                      {SOCIAL.linkedin && (
                        <a
                          href={SOCIAL.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border border-zinc-700 text-zinc-300 text-sm font-medium hover:bg-zinc-800/50 hover:border-zinc-600 transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                          LinkedIn
                          <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                        </a>
                      )}
                    </div>
                    <h1
                      className="t-display text-white"
                      style={{
                        letterSpacing: "0.02em",
                        fontSize: "clamp(2rem, 8vw, 6rem)",
                      }}
                    >
                      <span className="text-white">AI/ML &amp; </span>
                      <span className="text-blue-600">Automation</span>
                    </h1>
                  </Reveal>
                  <Reveal delay={25}>
                    <p className="t-label mt-2 text-zinc-500">
                      [ AI/ML &amp; AUTOMATION ENGINEER ]
                    </p>
                  </Reveal>
                  <Reveal delay={50}>
                    <h2 className="mt-4">
                      <span className="t-title block text-xl text-zinc-400 md:text-2xl">
                        Hi, I&apos;m{" "}
                        <span className="text-white">Facundo Majda</span>
                      </span>
                      <span className="t-body mt-2 block max-w-[58ch] text-zinc-400">
                        {profile?.heroTitle ?? "I design and ship production AI systems"} —{" "}
                        <span className="text-blue-500">
                          RAG pipelines, LLM agents, and the backend that holds them up
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
                      <div className="marquee t-meta whitespace-nowrap uppercase text-zinc-500">
                        {profile?.heroTagline ?? "SWE | Data & AI-Driven Apps | FDE | Full-Stack + Automation"}{" "}
                        {profile?.heroTagline ?? "SWE | Data & AI-Driven Apps | FDE | Full-Stack + Automation"}
                      </div>
                    </div>
                  </Reveal>
                </div>

                <div className="flex md:flex-row lg:flex-col gap-8 md:gap-12 lg:gap-8 text-center lg:text-right justify-center lg:justify-end lg:self-end">
                  <Reveal delay={300}>
                    <div>
                      <h5 className="font-mono text-4xl sm:text-5xl md:text-6xl lg:text-5xl tabular-nums text-blue-500 mb-1">
                        OVER {profile?.yearsExp ?? 3}+
                      </h5>
                      <p className="t-label text-zinc-500">
                        Years Engineering
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
          className="py-32 px-6 md:px-20 bg-[#0a0a0a] border-t border-zinc-900"
        >
          <div className="container mx-auto">
            <div className="mb-10 flex items-baseline justify-between gap-6 border-b border-dashed border-zinc-800 pb-4">
              <p className="t-label text-zinc-500">
                [ ABOUT ]
              </p>
              <span className="font-mono text-xs tabular-nums text-zinc-600">
                {profile?.yearsExp ?? 3}+ years
              </span>
            </div>

            <Reveal>
              <h2 className="t-display mb-16 max-w-[26ch] text-balance text-[clamp(1.75rem,4vw,3.5rem)] text-zinc-100">
                An{" "}
                <span className="text-blue-500">
                  AI/ML &amp; Automation Engineer
                </span>{" "}
                shipping production systems across the{" "}
                <span className="text-blue-500">
                  full software lifecycle
                </span>
                .
              </h2>
            </Reveal>

            <Reveal>
              <p className="t-label pb-3 border-b border-dashed border-zinc-800 text-zinc-500 mb-10">
                AI/ML · LLMs · Computer Vision · Backend · Automation
              </p>
            </Reveal>

            <div className="grid md:grid-cols-12 gap-8 md:gap-12 lg:gap-16">
              <div className="md:col-span-5">
                <Reveal>
                  <p className="t-label text-zinc-500">[ PROFILE ]</p>
                </Reveal>
              </div>
              <div className="md:col-span-7">
                <div className="t-body max-w-[62ch] space-y-8 text-lg text-zinc-300">
                  <Reveal delay={100}>
                    <p>
                      I build software, work with data, and explore what AI can
                      make possible. From full-stack applications and backend
                      systems to machine learning, computer vision, and
                      automation, I enjoy working across different areas of
                      technology and figuring out how to make things work
                      together.
                    </p>
                  </Reveal>
                  <Reveal delay={200}>
                    <p className="text-zinc-400">
                      I like getting my hands dirty, learning by building, and
                      taking ideas all the way to production.
                    </p>
                  </Reveal>
                </div>
              </div>
            </div>

            <Reveal delay={300}>
              <div className="mt-20 pt-12 border-t border-zinc-800">
                <h3 className="font-mono text-2xl md:text-3xl uppercase tracking-[0.2em] text-zinc-100 mb-12">
                  Systems I Build
                </h3>
                <div className="systems-grid grid sm:grid-cols-2 gap-x-10 gap-y-10">
                  <div className="group">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <h4 className="font-mono text-lg uppercase tracking-[0.14em] text-zinc-300 group-hover:text-white transition-colors">
                        AI Systems
                      </h4>
                    </div>
                    <p className="t-body text-zinc-400">I build with LLMs, RAG, and AI agents to make information more useful, connect models with real-world tools, and create applications that actually do something beyond generating text.</p>
                  </div>
                  <div className="group">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <h4 className="font-mono text-lg uppercase tracking-[0.14em] text-zinc-300 group-hover:text-white transition-colors">
                        Computer Vision
                      </h4>
                    </div>
                    <p className="t-body text-zinc-400">Making cameras smarter. Detection, tracking, classification, and real-time systems that turn what a camera sees into something useful.</p>
                  </div>
                  <div className="group">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <h4 className="font-mono text-lg uppercase tracking-[0.14em] text-zinc-300 group-hover:text-white transition-colors">
                        Backend Systems
                      </h4>
                    </div>
                    <p className="t-body text-zinc-400">The stuff that makes everything work. APIs, databases, services, integrations, and all the logic behind the applications people use.</p>
                  </div>
                  <div className="group">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <h4 className="font-mono text-lg uppercase tracking-[0.14em] text-zinc-300 group-hover:text-white transition-colors">
                        Automation
                      </h4>
                    </div>
                    <p className="t-body text-zinc-400">Making systems talk to each other and getting repetitive work out of the way. APIs, workflows, AI, and a bit of creative problem-solving.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="stack" className="py-32 px-6 md:px-20 bg-[#050505]">
          <div className="container mx-auto">
            <Reveal>
              <LazyEffect as={GlyphRain} density={0.2} speed={0.3} cell={14}>
                <div className="mb-20 flex items-end justify-between gap-6 border-b border-dashed border-zinc-800 pb-4">
                  <div className="flex items-center gap-4">
                    <SpinningBrain />
                    <h2 className="t-title text-2xl md:text-3xl text-zinc-100">
                      [ EXPERTISE ]
                    </h2>
                  </div>
                  <span className="font-mono text-xs tabular-nums text-zinc-600">
                    {String(techs.length).padStart(2, "0")} tools
                  </span>
                </div>
              </LazyEffect>
            </Reveal>

            <div className="space-y-12 md:space-y-16">
              {STACK_CATEGORIES.map((cat, idx) => (
                <div
                  key={cat.name}
                  className="grid lg:grid-cols-12 gap-y-6 md:gap-y-8 border-b border-dashed border-zinc-800 pb-10 md:pb-12 last:border-0"
                >
                  <div className="lg:col-span-5">
                    <Reveal delay={idx * 100}>
                      <h3 className="font-mono text-xl md:text-2xl uppercase tracking-[0.2em] text-zinc-600">
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
                            className="w-5 h-5"
                          />
                          <span className="font-mono text-sm md:text-base text-zinc-400 hover:text-white transition-colors cursor-default">
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

        <section id="education" className="py-32 px-6 md:px-20 bg-[#0a0a0a]">
          <div className="container mx-auto">
            <Reveal>
              <LazyEffect as={VHS} wave={0.4} grain={0.15} jitter={0.3}>
                <div className="mb-16 flex items-end justify-between gap-6 border-b border-dashed border-zinc-800 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-green-500 animate-pulse"></div>
                    <h2 className="t-title text-2xl md:text-3xl text-zinc-100">
                      [ EDUCATION ]
                    </h2>
                  </div>
                  <span className="font-mono text-xs tabular-nums text-zinc-600">
                    {String(EDUCATION.length).padStart(2, "0")} records
                  </span>
                </div>
              </LazyEffect>
            </Reveal>

            <div className="space-y-12 border-l border-dashed border-zinc-800 ml-3 md:ml-0">
              {EDUCATION.map((edu, idx) => (
                <Reveal
                  key={idx}
                  delay={idx * 100}
                  className="relative pl-8 md:pl-12"
                >
                  <span className="absolute left-[-5px] top-2 w-2.5 h-2.5 bg-green-600 rounded-full ring-4 ring-black"></span>
                  <div className="group">
                    <p className="t-meta text-green-500 mb-1">
                      {edu.date}
                    </p>
                    <h3 className="t-title text-xl md:text-2xl text-white mb-2">
                      {edu.degree}
                    </h3>
                    <p className="text-xl text-zinc-400 font-manrope mb-4">
                      {edu.link ? (
                        <a
                          href={edu.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-400 transition-colors"
                        >
                          {edu.institution}
                        </a>
                      ) : (
                        edu.institution
                      )}
                    </p>
                    <p className="text-zinc-500 font-manrope max-w-2xl leading-relaxed">
                      {edu.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="py-32 px-6 md:px-20 bg-zinc-900/20">
          <div className="container mx-auto">
            <Reveal>
              <LazyEffect as={Grid} tileSize={32}>
                <div className="mb-16 flex items-end justify-between gap-6 border-b border-dashed border-zinc-800 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-blue-500 animate-pulse"></div>
                    <h2 className="t-title text-2xl md:text-3xl text-zinc-100">
                      [ EXPERIENCE ]
                    </h2>
                  </div>
                  <span className="font-mono text-xs tabular-nums text-zinc-600">
                    {String(EXPERIENCE.length).padStart(2, "0")} roles
                  </span>
                </div>
              </LazyEffect>
            </Reveal>

            <div className="space-y-12 border-l border-dashed border-zinc-800 ml-3 md:ml-0">
              {EXPERIENCE.map((job, idx) => (
                <Reveal
                  key={idx}
                  delay={idx * 100}
                  className="relative pl-8 md:pl-12"
                >
                  <span className="absolute left-[-5px] top-2 w-2.5 h-2.5 bg-blue-600 rounded-full ring-4 ring-black"></span>
                  <div className="group">
                    <p className="t-meta text-blue-500 mb-1">
                      {job.date}
                    </p>
                    <h3 className="t-title text-xl md:text-2xl text-white mb-2">
                      {job.role}
                    </h3>
                    <p className="text-xl text-zinc-400 font-manrope mb-4">
                      {job.link ? (
                        <a
                          href={job.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-400 transition-colors"
                        >
                          {job.company}
                        </a>
                      ) : (
                        job.company
                      )}
                    </p>
                    <p className="text-zinc-500 font-manrope max-w-2xl leading-relaxed">
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