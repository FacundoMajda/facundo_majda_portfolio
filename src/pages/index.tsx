import { ArrowUpRight, MoveUpRight } from "lucide-react";
import Head from "next/head";
import { useState } from "react";
import { Bend } from "@/components/canvasui/Bend";
import { Bubble } from "@/components/canvasui/Bubble";
import { Displacement } from "@/components/canvasui/Displacement";
import { Glass } from "@/components/canvasui/Glass";
import { Glitch } from "@/components/canvasui/Glitch";
import { Grid } from "@/components/canvasui/Grid";
import { GlyphRain } from "@/components/canvasui/GlyphRain";
import { LazyEffect } from "@/components/canvasui/LazyEffect";
import { Liquid } from "@/components/canvasui/Liquid";
import { ParticleReveal } from "@/components/canvasui/ParticleReveal";
import { Peel } from "@/components/canvasui/Peel";
import { Ripple } from "@/components/canvasui/Ripple";
import { VHS } from "@/components/canvasui/VHS";
import { BlackHoleBackground } from "@/components/vgpu/BlackHoleBackground";
import { FlareLogo } from "@/components/vgpu/FlareLogo";
import ProjectModal from "@/components/ProjectModal";
import { ProjectItem } from "@/types";
import {
  EDUCATION,
  EXPERIENCE,
  MENU_ITEMS,
  PROJECTS,
  SOCIAL_LINKS,
  STACK_CATEGORIES,
} from "@/config/profile";
import { CORE_SKILLS } from "@/config/skills";
import { manrope, spaceGrotesk } from "@/styles/fonts";
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

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );
  const seoTitle = "Facundo Majda — AI/ML & Automation Engineer";
  const seoDescription =
    "AI/ML & Automation Engineer. I design and ship production AI systems — RAG pipelines, LLM agents, computer vision, and the backend that holds them up.";
  const seoUrl = "https://facundomajda.dev";
  const ogImage = `${seoUrl}/icons/og.svg`;
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Facundo Majda",
    jobTitle: "AI/ML & Automation Engineer",
    url: seoUrl,
    email: "mailto:facundomajda13@gmail.com",
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
    sameAs: ["https://www.upwork.com/freelancers/~014f767f0225d54d8e"],
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
      className={`bg-[#050505] text-slate-200 min-h-screen ${manrope.className} ${spaceGrotesk.variable} overflow-x-hidden selection:bg-blue-500 selection:text-white`}
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
        className={`fixed top-0 right-0 h-screen w-[500px] max-w-[calc(100vw-3rem)] bg-[#0f0f0f] border-l border-zinc-800 z-40 transform transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] flex flex-col justify-center py-10 px-8 md:px-16 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-10">
          <div>
            <p className="text-zinc-500 mb-6 font-manrope text-sm tracking-widest">
              MENU
            </p>
            <ul className="space-y-4">
              {MENU_ITEMS.map((item, idx) => (
                <li key={idx}>
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
                    className="group text-4xl font-heading flex items-center gap-4 hover:pl-2 transition-all cursor-pointer"
                  >
                    <span
                      className={`size-3 rounded-full flex items-center justify-center ${item.color} group-hover:scale-[250%] transition-transform duration-300`}
                    >
                      <MoveUpRight
                        size={12}
                        className="text-black scale-0 group-hover:scale-100 transition-transform duration-300"
                      />
                    </span>
                    <span className="text-zinc-100 group-hover:text-white transition-colors">
                      {item.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <LazyEffect as={Bubble} rootMargin="0px">
            <div>
              <p className="text-zinc-500 mb-6 font-manrope text-sm tracking-widest">
                SOCIAL
              </p>
              <ul className="space-y-2 font-manrope text-xl text-zinc-300">
                <li>
                  <a
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-blue-400 hover:underline transition-colors"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-blue-400 hover:underline transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIAL_LINKS.upwork}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-green-400 hover:underline transition-colors"
                  >
                    Upwork
                  </a>
                </li>
              </ul>
            </div>
          </LazyEffect>
          <div>
            <p className="text-zinc-500 mb-4 font-manrope text-sm tracking-widest">
              CONTACT
            </p>
            <p className="font-manrope text-lg text-zinc-300">
              Available for projects
            </p>
          </div>
        </div>
      </div>

      <main>
        <section
          id="banner"
          className="relative min-h-screen flex flex-col justify-start pt-20 md:pt-24 px-6 md:px-20 lg:px-24 overflow-hidden"
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
              <div className="relative z-30 container mx-auto h-full flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-end gap-12 lg:gap-16 pb-12">
                <div className="max-w-full lg:max-w-[800px] space-y-1">
                  <Reveal>
                    <h1
                      className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none text-white"
                      style={{ letterSpacing: "0.02em" }}
                    >
                      <span className="text-white">AI/ML &amp; </span>
                      <span className="text-blue-600">Automation</span>
                    </h1>
                  </Reveal>
                  <Reveal delay={25}>
                    <p className="text-xs sm:text-sm text-zinc-500 font-manrope tracking-wide mt-2">
                      AI &amp; Automation Engineer
                    </p>
                  </Reveal>
                  <Reveal delay={50}>
                    <h2 className="font-manrope font-light text-zinc-300 mt-4">
                      <span className="text-xl sm:text-2xl md:text-3xl block">
                        Hi, I&apos;m{" "}
                        <span className="font-bold text-white">Facundo Majda</span>
                      </span>
                      <span className="text-base sm:text-lg md:text-xl block mt-2">
                        I design and ship production AI systems — RAG pipelines,
                        LLM agents, computer vision, and the{" "}
                        <span className="text-blue-500">
                          backend that holds them up
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
                      <div className="marquee whitespace-nowrap text-xs sm:text-sm md:text-base text-zinc-300 font-manrope">
                        <span className="font-bold text-white">
                          SWE | Data & AI-Driven Apps | FDE
                        </span>{" "}
                        | Full-Stack + Automation | LangChain · LangGraph ·
                        Mastra · AI SDK · MCP | Python · TypeScript · Java · Rust
                        | NestJS · Spring Boot · FastAPI · Flask | React ·
                        Next.js · Angular | n8n · Make · Zapier{" "}
                        <span className="font-bold text-white">
                          SWE | Data & AI-Driven Apps | FDE
                        </span>{" "}
                        | Full-Stack + Automation | LangChain · LangGraph ·
                        Mastra · AI SDK · MCP | Python · TypeScript · Java · Rust
                        | NestJS · Spring Boot · FastAPI · Flask | React ·
                        Next.js · Angular | n8n · Make · Zapier
                      </div>
                    </div>
                  </Reveal>
                </div>

                <div className="flex md:flex-row lg:flex-col gap-8 md:gap-12 lg:gap-8 text-center lg:text-right justify-center lg:justify-end lg:self-end">
                  <Reveal delay={300}>
                    <div>
                      <h5 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-heading font-black text-blue-500 mb-1">
                        3+
                      </h5>
                      <p className="text-zinc-500 font-manrope text-xs md:text-sm uppercase tracking-widest">
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
            <Reveal>
              <LazyEffect as={Glass} shape="circle" size={140} zoom={1.4}>
                <h2 className="text-3xl md:text-5xl font-manrope font-light mb-20 leading-tight text-zinc-200">
                  An{" "}
                  <span className="text-blue-500">
                    AI/ML &amp; Automation Engineer
                  </span>{" "}
                  shipping production systems across the{" "}
                  <span className="text-purple-500">
                    full software lifecycle
                  </span>
                  .
                </h2>
              </LazyEffect>
            </Reveal>

            <Reveal>
              <p className="pb-3 border-b border-zinc-800 text-zinc-500 font-manrope mb-10 uppercase tracking-widest text-sm">
                AI/ML · LLMs · Computer Vision · Backend · Automation
              </p>
            </Reveal>

            <div className="grid md:grid-cols-12 gap-8 md:gap-12 lg:gap-16">
              <div className="md:col-span-5">
                <Reveal>
                  <p className="text-5xl md:text-7xl font-heading font-black text-white leading-none">
                    About me
                  </p>
                </Reveal>
              </div>
              <div className="md:col-span-7">
                <div className="text-lg text-zinc-400 font-manrope space-y-6 max-w-[600px]">
                  <Reveal delay={100}>
                    <p>
                      I design and ship production AI and automation systems —
                      RAG pipelines, LLM agents, computer vision, NLP, and the
                      workflows that connect them to real operations. My work
                      spans backend services, APIs, and the frontends that
                      make those systems usable, end to end.
                    </p>
                  </Reveal>
                  <Reveal delay={200}>
                    <LazyEffect as={Peel} side="right">
                      <h3 className="text-xl font-bold text-white mb-2">
                        What I work with
                      </h3>
                      <p className="text-zinc-300">
                        Backend in{" "}
                        <strong className="text-white">
                          TypeScript and Java
                        </strong>{" "}
                        (NestJS, Spring Boot). Frontends in{" "}
                        <strong className="text-white">
                          React, Next.js, and Angular
                        </strong>{" "}
                        when the product needs it. ML and data in{" "}
                        <strong className="text-white">
                          Python with PyTorch
                        </strong>
                        . AI orchestration with{" "}
                        <strong className="text-white">
                          LangChain, LangGraph, Mastra, and the Vercel AI SDK
                        </strong>
                        . Automation on{" "}
                        <strong className="text-white">
                          n8n, Make, and Zapier
                        </strong>
                        .
                      </p>
                    </LazyEffect>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="stack" className="py-32 px-6 md:px-20 bg-[#050505]">
          <div className="container mx-auto">
            <Reveal>
              <LazyEffect as={GlyphRain} density={0.2} speed={0.3} cell={14}>
                <div className="flex items-center gap-4 mb-20">
                  <SpinningBrain />
                  <h2 className="font-heading text-4xl font-black uppercase text-zinc-100 tracking-wide">
                    My Expertise
                  </h2>
                </div>
              </LazyEffect>
            </Reveal>

            <div className="space-y-12 md:space-y-16">
              {STACK_CATEGORIES.map((cat, idx) => (
                <div
                  key={idx}
                  className="grid lg:grid-cols-12 gap-y-6 md:gap-y-8 border-b border-zinc-900 pb-10 md:pb-12 last:border-0"
                >
                  <div className="lg:col-span-5">
                    <Reveal delay={idx * 100}>
                      <h3 className="text-3xl md:text-4xl font-heading font-black text-zinc-700 uppercase tracking-wider">
                        {cat.name}
                      </h3>
                    </Reveal>
                  </div>
                  <div className="lg:col-span-7 flex flex-wrap gap-x-6 gap-y-3">
                    {cat.items.map((item, itemIdx) => (
                      <Reveal
                        key={itemIdx}
                        delay={idx * 100 + itemIdx * 50}
                      >
                        <div className="flex items-center gap-2">
                          {/* eslint-disable-next-line @next/next/no-img-element -- SVG icon, next/image adds no value for inline-sized SVGs */}
                          <img
                            src={item.icon}
                            alt={item.name}
                            className="w-5 h-5"
                          />
                          <span className="text-sm md:text-base font-heading font-normal text-zinc-400 hover:text-white transition-colors cursor-default">
                            {item.name}
                          </span>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <Reveal delay={600}>
              <div className="mt-12 pt-8 border-t border-zinc-900">
                <LazyEffect as={GlyphRain} density={0.2} speed={0.3} cell={14}>
                  <div className="mb-8">
                    <h3 className="text-3xl md:text-4xl font-heading font-black text-zinc-200 uppercase tracking-wider mb-2">
                      Core Competencies
                    </h3>
                    <p className="text-zinc-500 font-manrope text-sm uppercase tracking-widest">
                      Technical Expertise & Specializations
                    </p>
                  </div>
                </LazyEffect>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                  {Object.entries(CORE_SKILLS).map(
                    ([category, skills], idx) => (
                      <Reveal key={category} delay={700 + idx * 100}>
                        <div className="group">
                          <h4 className="text-lg md:text-xl font-heading font-bold text-zinc-300 mb-4 uppercase tracking-wide group-hover:text-white transition-colors">
                            {category}
                          </h4>
                          <div className="space-y-2">
                            {skills.map((skill, i) => (
                              <span
                                key={i}
                                className="inline-block text-zinc-400 text-sm font-manrope border border-zinc-800 rounded-full px-4 py-2 hover:border-zinc-600 hover:text-zinc-300 transition-all cursor-default"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Reveal>
                    )
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="education" className="py-32 px-6 md:px-20 bg-[#0a0a0a]">
          <div className="container mx-auto">
            <Reveal>
              <LazyEffect as={VHS} wave={0.4} grain={0.15} jitter={0.3}>
                <div className="flex items-center gap-4 mb-16">
                  <div className="w-2 h-2 bg-green-500 animate-pulse"></div>
                  <h2 className="font-heading text-2xl font-black uppercase text-zinc-500 tracking-widest">
                    Education
                  </h2>
                </div>
              </LazyEffect>
            </Reveal>

            <div className="space-y-12 border-l border-zinc-800 ml-3 md:ml-0">
              {EDUCATION.map((edu, idx) => (
                <Reveal
                  key={idx}
                  delay={idx * 100}
                  className="relative pl-8 md:pl-12"
                >
                  <span className="absolute left-[-5px] top-2 w-2.5 h-2.5 bg-green-600 rounded-full ring-4 ring-black"></span>
                  <div className="group">
                    <p className="text-sm font-bold text-green-500 font-manrope mb-1 tracking-widest uppercase">
                      {edu.date}
                    </p>
                    <h3 className="text-3xl md:text-4xl font-heading font-black text-white mb-2">
                      {edu.degree}
                    </h3>
                    <p className="text-xl text-zinc-400 font-manrope mb-4">
                      <a
                        href="https://www.ipf.edu.ar/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-colors"
                      >
                        {edu.institution}
                      </a>
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
                <div className="flex items-center gap-4 mb-16">
                  <div className="w-2 h-2 bg-blue-500 animate-pulse"></div>
                  <h2 className="font-heading text-2xl font-black uppercase text-zinc-500 tracking-widest">
                    Experience Timeline
                  </h2>
                </div>
              </LazyEffect>
            </Reveal>

            <div className="space-y-12 border-l border-zinc-800 ml-3 md:ml-0">
              {EXPERIENCE.map((job, idx) => (
                <Reveal
                  key={idx}
                  delay={idx * 100}
                  className="relative pl-8 md:pl-12"
                >
                  <span className="absolute left-[-5px] top-2 w-2.5 h-2.5 bg-blue-600 rounded-full ring-4 ring-black"></span>
                  <div className="group">
                    <p className="text-sm font-bold text-blue-500 font-manrope mb-1 tracking-widest uppercase">
                      {job.date}
                    </p>
                    <h3 className="text-3xl md:text-4xl font-heading font-black text-white mb-2">
                      {job.role}
                    </h3>
                    <p className="text-xl text-zinc-400 font-manrope mb-4">
                      {job.company}
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

        <section id="projects" className="py-32 px-6 md:px-20 bg-[#050505]">
          <div className="container mx-auto">
            <Reveal>
              <LazyEffect as={ParticleReveal} background="#050505" radius={220}>
                <h2 className="text-3xl font-heading font-black uppercase mb-16 text-zinc-300">
                  Featured Projects
                </h2>
              </LazyEffect>
            </Reveal>

            <div className="flex flex-col">
              {PROJECTS.map((project, index) => (
                <Reveal key={index} delay={index * 100} className="w-full">
                  <div className="group block text-left w-full py-12 border-t border-zinc-800 last:border-b relative overflow-hidden transition-all hover:bg-zinc-900/30">
                    <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 relative z-10">
                      <span className="font-heading text-zinc-700 text-2xl">
                        0{index + 1}
                      </span>

                      <div className="flex-1">
                        <p className="text-xs font-bold text-blue-500 mb-2 uppercase tracking-widest">
                          {project.category}
                        </p>
                        <h4 className="font-heading text-4xl md:text-6xl font-black uppercase text-zinc-300 group-hover:text-white transition-colors duration-300">
                          {project.title}
                        </h4>
                      </div>

                      <div className="md:text-right md:pr-8">
                        <div className="flex flex-wrap md:justify-end gap-3 mb-4">
                          {project.tech.map((t, i) => (
                            <span
                              key={i}
                              className="text-zinc-500 text-xs font-manrope border border-zinc-800 rounded-full px-3 py-1"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <p className="text-zinc-300 font-manrope text-sm mt-2 mb-6 leading-relaxed text-left">
                          {project.desc}
                        </p>
                        <div className="flex items-center gap-2 text-zinc-500 group-hover:text-blue-400 transition-colors text-sm font-manrope uppercase tracking-wider">
                          <div className="flex items-center gap-4">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedProject(project);
                              }}
                              className="flex items-center gap-2 text-blue-400 hover:underline"
                            >
                              View Case Study{" "}
                              <ArrowUpRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <footer
          id="contact"
          className="relative py-32 px-6 md:px-20 text-center bg-[#0a0a0a] text-white border-t border-zinc-900 overflow-hidden"
        >
          <BlackHoleBackground />
          <div
            className="relative z-10"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.85)" }}
          >
            <Reveal>
              <div className="mb-8 flex justify-center">
                <FlareLogo />
              </div>
              <p className="text-xl font-manrope text-zinc-500 mb-8 tracking-wide">
                Always ready to build!
              </p>
              <LazyEffect as={Ripple} trigger="click" amplitude={1.2}>
                <a
                  href={SOCIAL_LINKS.email}
                  className="inline-block py-4 font-heading text-[8vw] md:text-7xl font-black hover:text-blue-500 transition-colors leading-tight text-zinc-100"
                >
                  LETS TALK
                </a>
              </LazyEffect>

              <LazyEffect as={Bend} zone={24}>
                <div className="flex flex-wrap justify-center gap-8 mt-16 font-manrope text-lg text-zinc-500">
                  <a
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white hover:underline transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white hover:underline transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={SOCIAL_LINKS.upwork}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white hover:underline transition-colors"
                  >
                    Upwork
                  </a>
                </div>
              </LazyEffect>

              <LazyEffect as={Displacement} grid={16} shift={0.6} grain={0.1}>
                <p className="mt-24 text-zinc-800 text-xs font-manrope uppercase tracking-widest">
                  © {new Date().getFullYear()} Facundo Majda. Formosa,
                  Argentina.
                </p>
              </LazyEffect>
            </Reveal>
          </div>
        </footer>
      </main>
    </div>
  );
}
