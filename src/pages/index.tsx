import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { Manrope } from "next/font/google";
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
import { Reveal } from "@/utils";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const LiquidButton = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative h-10 px-6 py-3 inline-flex justify-center items-center gap-2 text-sm md:text-base font-bold uppercase font-anton tracking-widest outline-none overflow-hidden bg-blue-600 text-white hover:bg-white hover:text-black transition-all duration-300 rounded-sm shadow-[0_0_8px_rgba(59,130,246,0.25)] hover:shadow-[0_0_12px_rgba(59,130,246,0.35)]"
  >
    <span className="absolute top-[200%] left-0 right-0 h-full bg-white rounded-[50%] group-hover:top-0 transition-all duration-500 scale-150 z-0"></span>
    <span className="relative z-10 flex items-center gap-2">{children}</span>
  </a>
);

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

  return (
    <div
      className={`bg-[#050505] text-slate-200 min-h-screen ${manrope.className} overflow-x-hidden selection:bg-blue-500 selection:text-white`}
    >
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
                    className="group text-4xl font-anton flex items-center gap-4 hover:pl-2 transition-all cursor-pointer"
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

      <main className="bg-[#050505]">
        <section
          id="banner"
          className="relative min-h-screen flex flex-col justify-center px-6 md:px-20 lg:px-24 overflow-hidden"
        >
          <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

          <GlyphRain
            className="relative z-10 w-full"
            density={0.15}
            speed={0.25}
            cell={16}
          >
          <Liquid
            className="w-full"
            intensity={0.8}
            blend={1.5}
            densityDissipation={0.9}
            velocityDissipation={0.9}
            curl={0.4}
            radius={0.15}
          >
          <div className="container mx-auto h-full flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-end gap-12 lg:gap-16 py-12">
            <div className="max-w-full lg:max-w-[800px] space-y-1">
              <Reveal>
                <h1
                  className="font-anton text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none text-white"
                  style={{ letterSpacing: "0.02em" }}
                >
                  <span className="text-white">SWE </span>
                  <span className="text-blue-600">& FDE</span>
                </h1>
              </Reveal>
              <Reveal delay={25}>
                <p className="text-xs sm:text-sm text-zinc-500 font-manrope tracking-wide mt-2">
                  Software Engineer & Forward Deployed Engineer
                </p>
              </Reveal>
              <Reveal delay={50}>
                <h2 className="font-manrope font-light text-zinc-300 mt-4">
                  <span className="text-xl sm:text-2xl md:text-3xl block">
                    Hi, I&apos;m{" "}
                    <span className="font-bold text-white">Facundo Majda</span>
                  </span>
                  <span className="text-base sm:text-lg md:text-xl block mt-2">
                    <span className="text-blue-500">
                      Data & AI-Driven Apps
                    </span>{" "}
                    — a Deployed Software Developer across the{" "}
                    <span className="text-purple-500">
                      full software lifecycle, from design to deployment
                    </span>
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
                    Mastra · AI SDK · MCP | Python · TypeScript · Java · Rust |
                    NestJS · Spring Boot · FastAPI · Flask | React · Next.js ·
                    Angular | n8n · Make · Zapier{" "}
                    <span className="font-bold text-white">
                      SWE | Data & AI-Driven Apps | FDE
                    </span>{" "}
                    | Full-Stack + Automation | LangChain · LangGraph ·
                    Mastra · AI SDK · MCP | Python · TypeScript · Java · Rust |
                    NestJS · Spring Boot · FastAPI · Flask | React · Next.js ·
                    Angular | n8n · Make · Zapier
                  </div>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <div className="mt-10 flex gap-4">
                  <LiquidButton href={SOCIAL_LINKS.upwork}>
                    HIRE ME
                  </LiquidButton>
                </div>
              </Reveal>
            </div>

            <div className="flex md:flex-row lg:flex-col gap-8 md:gap-12 lg:gap-8 text-center lg:text-right justify-center lg:justify-end lg:self-end">
              <Reveal delay={300}>
                <div>
                  <h5 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-anton font-black bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent mb-1">
                    3+
                  </h5>
                  <p className="text-zinc-500 font-manrope text-xs md:text-sm uppercase tracking-widest">
                    Years Exp.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={400}>
                <div>
                  <h5 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-anton font-black bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent mb-1">
                    5+
                  </h5>
                  <p className="text-zinc-500 font-manrope text-xs md:text-sm uppercase tracking-widest">
                    AI Projects
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
                  A Deployed Software Developer across the{" "}
                  <span className="text-blue-500">
                    full software lifecycle
                  </span>
                  , building data-driven applications powered by{" "}
                  <span className="text-purple-500">AI capabilities</span>.
                </h2>
              </LazyEffect>
            </Reveal>

            <Reveal>
              <p className="pb-3 border-b border-zinc-800 text-zinc-500 font-manrope mb-10 uppercase tracking-widest text-sm"></p>
            </Reveal>

            <div className="grid md:grid-cols-12 gap-8 md:gap-12 lg:gap-16">
              <div className="md:col-span-5">
                <Reveal>
                  <p className="text-5xl md:text-7xl font-anton font-black text-white leading-none">
                    About me
                  </p>
                </Reveal>
              </div>
              <div className="md:col-span-7">
                <div className="text-lg text-zinc-400 font-manrope space-y-6 max-w-[600px]">
                  <Reveal delay={100}>
                    <p>
                      Deployed Software Developer with experience across the
                      full software lifecycle, from solution design and
                      development to deployment and continuous improvement.
                      Skilled in automation, workflow optimization, backend
                      development, and API design — with{" "}
                      <strong className="text-white">NestJS</strong>,{" "}
                      <strong className="text-white">Spring Boot</strong>,{" "}
                      <strong className="text-white">React</strong>,{" "}
                      <strong className="text-white">Angular</strong>, and{" "}
                      <strong className="text-white">n8n</strong>. Experienced
                      in AI, machine learning, computer vision, and NLP,
                      integrating{" "}
                      <span className="text-blue-400 underline decoration-blue-500/50 hover:text-blue-300">
                        RAG pipelines
                      </span>{" "}
                      and{" "}
                      <span className="text-purple-400 underline decoration-purple-500/50 hover:text-purple-300">
                        LLM agents
                      </span>{" "}
                      into operational applications.
                    </p>
                  </Reveal>
                  <Reveal delay={200}>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Development Approach
                    </h3>
                    <p>
                      As a fullstack developer, I focus on object-oriented
                      programming, Test-Driven Development (TDD), and
                      Domain-Driven Design (DDD). I also work with modern
                      AI-augmented workflows like{" "}
                      <strong className="text-white">
                        Spec-Driven Development (SDD)
                      </strong>{" "}
                      and{" "}
                      <strong className="text-white">
                        Receipt-Driven Development (RDD)
                      </strong>
                      , integrating coding agents through harnesses and
                      scaffolding to get the most out of the latest LLM
                      tooling — always framed within a structured workflow.
                    </p>
                  </Reveal>
                  <Reveal delay={300}>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Independent Projects
                    </h3>
                    <p>
                      I have built several independent projects involving AI
                      integration, including chatbots, recommendation systems,
                      and data analysis tools, proficient to deliver end-to-end
                      solutions.
                    </p>
                  </Reveal>
                  <Reveal delay={400}>
                    <LazyEffect as={Peel} side="right">
                      <h3 className="text-xl font-bold text-white mb-2">
                        Technical Stack
                      </h3>
                      <p className="text-zinc-300">
                        <strong className="text-white">
                          NestJS, Spring Boot & Java
                        </strong>{" "}
                        for backend development,{" "}
                        <strong className="text-white">
                          React, Next.js & Angular
                        </strong>{" "}
                        for frontend,{" "}
                        <strong className="text-white">Python/PyTorch</strong>{" "}
                        for machine learning,{" "}
                        <strong className="text-white">
                          LangChain, LangGraph, Mastra & Vercel AI SDK
                        </strong>{" "}
                        for AI integration, and{" "}
                        <strong className="text-white">
                          n8n, Make & Zapier
                        </strong>{" "}
                        for automation.
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
                  <h2 className="font-anton text-4xl font-black uppercase text-zinc-100 tracking-wide">
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
                      <h3 className="text-3xl md:text-4xl font-anton font-black text-zinc-700 uppercase tracking-wider">
                        {cat.name}
                      </h3>
                    </Reveal>
                  </div>
                  <div className="lg:col-span-7 flex flex-wrap gap-x-6 gap-y-3">
                    {cat.items.map((item, itemIdx) => (
                      <Reveal key={itemIdx} delay={idx * 100 + itemIdx * 50}>
                        <div className="flex items-center gap-2">
                          <img
                            src={item.icon}
                            alt={item.name}
                            className="w-5 h-5"
                          />
                          <span className="text-sm md:text-base font-anton font-normal text-zinc-400 hover:text-white transition-colors cursor-default">
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
                    <h3 className="text-3xl md:text-4xl font-anton font-black text-zinc-200 uppercase tracking-wider mb-2">
                      Core Competencies
                    </h3>
                    <p className="text-zinc-500 font-manrope text-sm uppercase tracking-widest">
                      Technical Expertise & Specializations
                    </p>
                  </div>
                </LazyEffect>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
                  {Object.entries(CORE_SKILLS).map(
                    ([category, skills], idx) => (
                      <Reveal key={category} delay={700 + idx * 100}>
                        <div className="group">
                          <h4 className="text-lg md:text-xl font-anton font-bold text-zinc-300 mb-4 uppercase tracking-wide group-hover:text-white transition-colors">
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
                  <h2 className="font-anton text-2xl font-black uppercase text-zinc-500 tracking-widest">
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
                    <h3 className="text-3xl md:text-4xl font-anton font-black text-white mb-2">
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
                  <h2 className="font-anton text-2xl font-black uppercase text-zinc-500 tracking-widest">
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
                    <h3 className="text-3xl md:text-4xl font-anton font-black text-white mb-2">
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
                <h2 className="text-3xl font-anton font-black uppercase mb-16 text-zinc-300">
                  Featured Projects
                </h2>
              </LazyEffect>
            </Reveal>

            <div className="flex flex-col">
              {PROJECTS.map((project, index) => (
                <Reveal key={index} delay={index * 100} className="w-full">
                  <div className="group block text-left w-full py-12 border-t border-zinc-800 last:border-b relative overflow-hidden transition-all hover:bg-zinc-900/30">
                    <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 relative z-10">
                      <span className="font-anton text-zinc-700 text-2xl">
                        0{index + 1}
                      </span>

                      <div className="flex-1">
                        <p className="text-xs font-bold text-blue-500 mb-2 uppercase tracking-widest">
                          {project.category}
                        </p>
                        <h4 className="font-anton text-4xl md:text-6xl font-black uppercase text-zinc-300 group-hover:text-white transition-colors duration-300">
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
          className="py-32 px-6 md:px-20 text-center bg-[#0a0a0a] text-white border-t border-zinc-900"
        >
          <Reveal>
            <LazyEffect as={GlyphRain} density={0.3} speed={0.4}>
              <p className="text-xl font-manrope text-zinc-500 mb-8 tracking-wide">
                Ready to build intelligent systems?
              </p>
            </LazyEffect>
            <LazyEffect as={Ripple} trigger="click" amplitude={1.2}>
              <a
                href={SOCIAL_LINKS.email}
                className="block py-4 font-anton text-[8vw] md:text-7xl font-black hover:text-blue-500 transition-colors leading-tight text-zinc-100"
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
                © {new Date().getFullYear()} Facundo Majda. Formosa, Argentina.
              </p>
            </LazyEffect>
          </Reveal>
        </footer>
      </main>
    </div>
  );
}
