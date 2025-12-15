import {
  ArrowUpRight,
  BrainCircuit,
  Database,
  Layout,
  MoveUpRight,
  Server,
  Terminal,
} from "lucide-react";
import { Anton, Manrope } from "next/font/google";

interface StackItem {
  name: string;
  icon: string;
}

interface StackCategory {
  name: string;
  items: StackItem[];
  icon: React.ReactElement;
}

interface EducationItem {
  institution: string;
  degree: string;
  date: string;
  desc: string;
}

interface ExperienceItem {
  company: string;
  role: string;
  date: string;
  desc: string;
}

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tech: string[];
  desc: string;
  link: string;
  color: string;
}

interface MenuItem {
  name: string;
  href: string;
  color: string;
}
import React, { useEffect, useRef, useState } from "react";

const anton = Anton({ subsets: ["latin"], weight: ["400"] });
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const useOnScreen = (options: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [options]);

  return { ref, isVisible };
};

const Reveal = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const { ref, isVisible } = useOnScreen({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const SOCIAL_LINKS = {
  github: "https://github.com/FacundoMajda",
  linkedin: "https://www.linkedin.com/in/facundo-majda/",
  upwork: "https://www.upwork.com/freelancers/~014f767f0225d54d8e",
  email: "mailto:facundomajda13@gmail.com",
};

const MENU_ITEMS: MenuItem[] = [
  { name: "Home", href: "#banner", color: "bg-blue-500" },
  { name: "About Me", href: "#about-me", color: "bg-purple-500" },
  { name: "Expertise", href: "#stack", color: "bg-emerald-500" },
  { name: "Projects", href: "#projects", color: "bg-indigo-500" },
];

const EDUCATION: EducationItem[] = [
  {
    institution: "Instituto Politécnico Formosa (IPF)",
    degree: "Tecnicatura Superior en Desarrollo de Software Multiplataforma",
    date: "2023 — 2025",
    desc: "Intensive technical program focused on cross-platform software development. Covered software architecture, object-oriented design, database modeling, and full-stack development through hands-on projects. Built foundation in design patterns, clean code principles, and systematic problem-solving that I now apply to AI-driven backend systems.",
  },
  {
    institution: "Instituto Politécnico Formosa (IPF)",
    degree: "Artificial Intelligence – Models and Applications",
    date: "2024 — 2025",
    desc: "Centered on artificial intelligence models and their practical applications. Included implementation of machine learning and deep learning models, AI-driven solution design, and hands-on projects integrating AI into real-world use cases.",
  },
  {
    institution: "Instituto Politécnico Formosa (IPF)",
    degree: "Data Science",
    date: "2024 — 2025",
    desc: "Focused on data science, statistical analysis, and applied machine learning. Covered data preprocessing, exploratory data analysis, predictive modeling, and communication of insights through visualizations.",
  },
];

const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Push Software / Orbitalab",
    role: "Fullstack Developer",
    date: "Mar 2024 — Aug 2024",
    desc: "Design of microservices architecture with NestJS. Development of RESTful APIs applying SOLID principles and Clean Architecture.",
  },
  {
    company: "Freelancing",
    role: "AI Engineer",
    date: "2024 — Present",
    desc: "Development of RAG systems, autonomous agents with LLMs, and data pipelines. Self-taught specialization in Deep Learning (PyTorch) and Vector Databases.",
  },
];

const PROJECTS: ProjectItem[] = [
  {
    id: "01",
    title: "Intelligent Tutoring System",
    category: "AI & EdTech",
    tech: [
      "NestJS",
      "TypeORM",
      "Qdrant",
      "LangChain",
      "LCEL",
      "React",
      "AI Elements UI",
      "Streaming SSE",
    ],
    desc: "RAG-powered educational platform with intelligent notebook features and streaming LLM responses. An AI-driven tutoring system built with NestJS and LangChain that provides personalized educational assistance through RAG architecture. Implements vector database (Qdrant) for semantic search across syllabi, activities, and competencies. Features streaming LLM responses via Server-Sent Events, modular backend with TypeORM for syllabus management, activity tracking, and submission processing. Includes context-aware agents that retrieve relevant educational content and generate adaptive learning experiences with proper source citations.",
    link: SOCIAL_LINKS.github,
    color: "from-blue-600 to-purple-600",
  },
  {
    id: "02",
    title: "Hackathon Formosa 2024",
    category: "Computer Vision",
    tech: [
      "PyTorch",
      "CNN Models",
      "RAG",
      "Vector Embeddings",
      "React",
      "Computer Vision",
    ],
    desc: "RAG-enhanced computer vision application for image analysis and intelligent recommendations. Developed a computer vision system integrating convolutional neural networks with RAG architecture for semantic image analysis. Combined PyTorch-based CNN models with vector embeddings for similarity search and context-aware recommendations. Implemented React frontend with real-time inference and intelligent retrieval from visual knowledge base.",
    link: SOCIAL_LINKS.github,
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "03",
    title: "Hackathon IPF 2025 - Intelligent Incident Reporting System",
    category: "Human-Centered AI",
    tech: [
      "NestJS",
      "TypeORM",
      "PostgreSQL (Neon)",
      "Google Gemini 2.0 Flash",
      "Zod",
      "JWT",
      "Multer",
      "class-validator",
      "Swagger",
    ],
    desc: "Human-Centered AI system for incident routing with multi-option recommendation engine and transparent decision support. Intelligent API backend for civic incident reporting with AI-powered analysis and authority routing. Built a human-in-the-loop system where AI provides ranked recommendations (2-4 options) with explicit pros/cons, but operators make final decisions. Implements Google Gemini 2.0 Flash for multidimensional analysis: severity classification, urgency levels, automatic keyword detection, and confidence scoring. Features modular NestJS backend with TypeORM and PostgreSQL, communication module with intelligent routing service using structured LLM output, zero-automation principle, historical context learning, full transparency, human override capability, and soft delete architecture.",
    link: SOCIAL_LINKS.github,
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: "04",
    title: "Clinical RAG Assistant",
    category: "AI & Healthcare",
    tech: [
      "Python",
      "FastAPI",
      "LangChain",
      "LangChain Expression Language",
      "Vector DB",
      "Medical PDF Processing",
      "Streaming Responses",
    ],
    desc: "Clinical decision support system using RAG for diagnostic assistance with medical literature. A medical assistant using retrieval-augmented generation to process clinical practice guidelines, pathology records, and pharmacopeia PDFs. Implements dual-mode operation: urgent mode for rapid differential diagnosis in critical cases, and academic mode for comprehensive analysis with detailed citations. Generates structured diagnoses with medication recommendations, ICD-10 codes, and source references. Built with LangChain 1.x using LCEL pipelines, structured output with Pydantic, and query expansion for improved medical document retrieval.",
    link: SOCIAL_LINKS.github,
    color: "from-red-500 to-pink-600",
  },
];

const STACK_CATEGORIES: StackCategory[] = [
  {
    name: "AI & Machine Learning",
    items: [
      { name: "LangChain", icon: "https://cdn.simpleicons.org/langchain" },
      { name: "LangGraph", icon: "https://cdn.simpleicons.org/langgraph" },
      { name: "PyTorch", icon: "https://cdn.simpleicons.org/pytorch" },
      { name: "Ollama", icon: "https://cdn.simpleicons.org/ollama" },
      { name: "Hugging Face", icon: "https://cdn.simpleicons.org/huggingface" },
      { name: "Vercel AI SDK", icon: "https://cdn.simpleicons.org/vercel" },
      {
        name: "Mastra",
        icon: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/mastra.svg",
      },
      { name: "Google Gemini", icon: "https://cdn.simpleicons.org/google" },
      { name: "OpenAI", icon: "https://cdn.simpleicons.org/openai" },
      {
        name: "DeepSeek",
        icon: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/deepseek.svg",
      },
      { name: "TensorFlow", icon: "https://cdn.simpleicons.org/tensorflow" },
      { name: "scikit-learn", icon: "https://cdn.simpleicons.org/scikitlearn" },
      { name: "Keras", icon: "https://cdn.simpleicons.org/keras" },
    ],
    icon: <BrainCircuit className="w-8 h-8 text-purple-500" />,
  },
  {
    name: "Backend Architecture",
    items: [
      { name: "NestJS", icon: "https://cdn.simpleicons.org/nestjs" },
      { name: "Express", icon: "https://cdn.simpleicons.org/express" },
      { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs" },
      { name: "Python", icon: "https://cdn.simpleicons.org/python" },
      { name: "FastAPI", icon: "https://cdn.simpleicons.org/fastapi" },
      { name: "Flask", icon: "https://cdn.simpleicons.org/flask" },
    ],
    icon: <Server className="w-8 h-8 text-blue-500" />,
  },
  {
    name: "Data & Vector DBs",
    items: [
      { name: "Qdrant", icon: "https://logo.svgcdn.com/l/qdrant.svg" },
      {
        name: "ChromaDB",
        icon: "https://files.brandlogos.net/svg/aqOfS52Rxn/chroma-logo-brandlogos.net_k7cayrasq.svg",
      },
      {
        name: "Pinecone",
        icon: "https://images.seeklogo.com/logo-png/48/1/pinecone-icon-logo-png_seeklogo-482365.png",
      },
      { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql" },
      { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb" },
      { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql" },
      { name: "TypeORM", icon: "https://cdn.simpleicons.org/typeorm" },
      { name: "Prisma", icon: "https://cdn.simpleicons.org/prisma" },
      { name: "Pandas", icon: "https://cdn.simpleicons.org/pandas" },
    ],
    icon: <Database className="w-8 h-8 text-emerald-500" />,
  },
  {
    name: "DevOps & Tools",
    items: [
      { name: "Docker", icon: "https://cdn.simpleicons.org/docker" },
      { name: "Kubernetes", icon: "https://cdn.simpleicons.org/kubernetes" },
      { name: "Git", icon: "https://cdn.simpleicons.org/git" },
      { name: "GitHub", icon: "https://cdn.simpleicons.org/github" },
      { name: "Jira", icon: "https://cdn.simpleicons.org/jira" },
      { name: "ClickUp", icon: "https://cdn.simpleicons.org/clickup" },
      { name: "Slack", icon: "https://cdn.simpleicons.org/slack" },
    ],
    icon: <Terminal className="w-8 h-8 text-gray-500" />,
  },
  {
    name: "Frontend Development",
    items: [
      { name: "React", icon: "https://cdn.simpleicons.org/react" },
      { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs" },
      { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript" },
      { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss" },
    ],
    icon: <Layout className="w-8 h-8 text-indigo-500" />,
  },
];

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

  return (
    <div
      className={`bg-[#050505] text-slate-200 min-h-screen ${manrope.className} overflow-x-hidden selection:bg-blue-500 selection:text-white`}
    >
      <div className="fixed top-0 right-0 z-50 p-6 md:p-10 mix-blend-difference">
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
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="group text-4xl font-anton flex items-center gap-4 hover:pl-2 transition-all"
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
                  </button>
                </li>
              ))}
            </ul>
          </div>
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
          className="relative min-h-screen flex flex-col justify-center px-12 md:px-20 lg:px-24 overflow-hidden"
        >
          <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

          <div className="container mx-auto h-full flex flex-col md:flex-row justify-center md:justify-between items-center z-10">
            <div className="max-w-[800px] space-y-1">
              <Reveal>
                <h1
                  className="font-anton text-6xl md:text-7xl lg:text-8xl font-black leading-none text-white"
                  style={{ letterSpacing: "0.02em" }}
                >
                  <span className="text-white">BACKEND & </span>
                  <span className="text-blue-600">AI ENGINEER</span>
                </h1>
              </Reveal>
              <Reveal delay={50}>
                <h2 className="font-manrope font-light text-zinc-300 mt-4">
                  <span className="text-2xl md:text-3xl block">
                    Hi, I'm Facundo Majda
                  </span>
                  <span className="text-lg md:text-xl block mt-2">
                    Building{" "}
                    <span className="text-blue-500">
                      LLM agents and RAG systems
                    </span>{" "}
                    with{" "}
                    <span className="text-purple-500">
                      TypeScript, Python, and modern AI frameworks
                    </span>
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <div className="mt-6 overflow-hidden">
                  <div className="marquee whitespace-nowrap text-sm md:text-base text-zinc-300 font-manrope">
                    <span className="font-bold text-white">
                      AI Engineer & Full‑Stack Developer
                    </span>{" "}
                    | Agents, LLMs, RAG & AI‑Driven Apps | LangChain · LangGraph
                    · Mastra · AI SDK · MCP | Python · TypeScript · Rust |
                    Node/Nest · FastAPI · Flask · React/Next{" "}
                    <span className="font-bold text-white">
                      AI Engineer & Full‑Stack Developer
                    </span>{" "}
                    | Agents, LLMs, RAG & AI‑Driven Apps | LangChain · LangGraph
                    · Mastra · AI SDK · MCP | Python · TypeScript · Rust |
                    Node/Nest · FastAPI · Flask · React/Next
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

            <div className="mt-16 md:mt-0 flex md:flex-col gap-8 text-center md:text-right absolute right-8 md:right-16 top-1/2 -translate-y-1/2 space-y-8">
              <Reveal delay={300}>
                <div>
                  <h5 className="text-5xl font-anton font-black bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent mb-1">
                    4+
                  </h5>
                  <p className="text-zinc-500 font-manrope text-xs md:text-sm uppercase tracking-widest">
                    Years Exp.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={400}>
                <div>
                  <h5 className="text-5xl font-anton font-black bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent mb-1">
                    5+
                  </h5>
                  <p className="text-zinc-500 font-manrope text-xs md:text-sm uppercase tracking-widest">
                    AI Projects
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section
          id="about-me"
          className="py-32 px-6 md:px-20 bg-[#0a0a0a] border-t border-zinc-900"
        >
          <div className="container mx-auto">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-manrope font-light mb-20 leading-tight text-zinc-200">
                I specialize in building{" "}
                <span className="text-blue-500">
                  intelligent backend systems
                </span>{" "}
                that bridge traditional software engineering with{" "}
                <span className="text-purple-500">AI capabilities</span>.
              </h2>
            </Reveal>

            <Reveal>
              <p className="pb-3 border-b border-zinc-800 text-zinc-500 font-manrope mb-10 uppercase tracking-widest text-sm"></p>
            </Reveal>

            <div className="grid md:grid-cols-12 gap-16">
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
                      I build scalable backend systems with{" "}
                      <strong className="text-white">NestJS</strong>, applying
                      design patterns like SOLID, DDD, and Clean Architecture. I
                      integrate AI technologies such as{" "}
                      <span className="text-blue-400 underline decoration-blue-500/50 hover:text-blue-300">
                        RAG pipelines
                      </span>{" "}
                      and{" "}
                      <span className="text-purple-400 underline decoration-purple-500/50 hover:text-purple-300">
                        LLM agents
                      </span>{" "}
                      into production-ready applications.
                    </p>
                  </Reveal>
                  <Reveal delay={200}>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Development Approach
                    </h3>
                    <p>
                      As a fullstack developer, I focus on object-oriented
                      programming, Test-Driven Development (TDD), and
                      Domain-Driven Design (DDD). I design microservices with
                      clean separation of concerns and maintainable
                      architecture.
                    </p>
                  </Reveal>
                  <Reveal delay={300}>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Independent Projects
                    </h3>
                    <p>
                      I've developed a Sistema Tutor Inteligente with RAG
                      architecture for educational context and LLM agents for
                      automated workflows, plus a Computer Vision app using RAG
                      in a hackathon.
                    </p>
                  </Reveal>
                  <Reveal delay={400}>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Technical Stack
                    </h3>
                    <p className="text-zinc-300">
                      <strong className="text-white">NestJS</strong> for backend
                      development,{" "}
                      <strong className="text-white">Python/PyTorch</strong> for
                      machine learning, and{" "}
                      <strong className="text-white">
                        LangChain, LangGraph, Mastra & Vercel AI SDK
                      </strong>{" "}
                      for AI integration.
                    </p>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="stack" className="py-32 px-6 md:px-20 bg-[#050505]">
          <div className="container mx-auto">
            <Reveal>
              <div className="flex items-center gap-4 mb-20">
                <SpinningBrain />
                <h2 className="font-anton text-4xl font-black uppercase text-zinc-100 tracking-wide">
                  My Expertise
                </h2>
              </div>
            </Reveal>

            <div className="space-y-16">
              {STACK_CATEGORIES.map((cat, idx) => (
                <div
                  key={idx}
                  className="grid sm:grid-cols-12 gap-y-8 border-b border-zinc-900 pb-12 last:border-0"
                >
                  <div className="sm:col-span-5">
                    <Reveal delay={idx * 100}>
                      <h3 className="text-3xl md:text-4xl font-anton font-black text-zinc-700 uppercase tracking-wider">
                        {cat.name}
                      </h3>
                    </Reveal>
                  </div>
                  <div className="sm:col-span-7 flex flex-wrap gap-x-6 gap-y-3">
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
          </div>
        </section>

        <section id="education" className="py-32 px-6 md:px-20 bg-[#0a0a0a]">
          <div className="container mx-auto">
            <Reveal>
              <div className="flex items-center gap-4 mb-16">
                <div className="w-2 h-2 bg-green-500 animate-pulse"></div>
                <h2 className="font-anton text-2xl font-black uppercase text-zinc-500 tracking-widest">
                  Education
                </h2>
              </div>
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
              <div className="flex items-center gap-4 mb-16">
                <div className="w-2 h-2 bg-blue-500 animate-pulse"></div>
                <h2 className="font-anton text-2xl font-black uppercase text-zinc-500 tracking-widest">
                  Experience Timeline
                </h2>
              </div>
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
              <h2 className="text-3xl font-anton font-black uppercase mb-16 text-zinc-300">
                Featured Projects
              </h2>
            </Reveal>

            <div className="flex flex-col">
              {PROJECTS.map((project, index) => (
                <Reveal key={index} delay={index * 100} className="w-full">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block py-12 border-t border-zinc-800 last:border-b relative overflow-hidden transition-all hover:bg-zinc-900/30"
                  >
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
                          View Case Study <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </a>
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
            <p className="text-xl font-manrope text-zinc-500 mb-8 tracking-wide">
              Ready to build intelligent systems?
            </p>
            <a
              href={SOCIAL_LINKS.email}
              className="font-anton text-[8vw] md:text-7xl font-black hover:text-blue-500 transition-colors inline-block leading-tight text-zinc-100"
            >
              LETS TALK
            </a>

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

            <p className="mt-24 text-zinc-800 text-xs font-manrope uppercase tracking-widest">
              © {new Date().getFullYear()} Facundo Majda. Formosa, Argentina.
            </p>
          </Reveal>
        </footer>
      </main>
    </div>
  );
}
