import { BarChart3, BrainCircuit, Database, Layout, Server, Terminal } from "lucide-react";
import {
  EducationItem,
  ExperienceItem,
  MenuItem,
  ProjectItem,
  StackCategory,
} from "@/types";

export const SOCIAL_LINKS = {
  github: "https://github.com/FacundoMajda",
  linkedin: "https://www.linkedin.com/in/facundo-majda/",
  upwork: "https://www.upwork.com/freelancers/~014f767f0225d54d8e",
  email: "mailto:facundomajda13@gmail.com",
};

export const MENU_ITEMS: MenuItem[] = [
  { name: "Home", href: "#banner", color: "bg-blue-500" },
  { name: "About Me", href: "#about-me", color: "bg-purple-500" },
  { name: "Skills", href: "#skills", color: "bg-rose-500" },
  { name: "Expertise", href: "#stack", color: "bg-emerald-500" },
  { name: "Education", href: "#education", color: "bg-yellow-500" },
  { name: "Experience", href: "#experience", color: "bg-pink-500" },
  { name: "Projects", href: "#projects", color: "bg-indigo-500" },
];

export const EDUCATION: EducationItem[] = [
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
    desc: "Deep dive into modern AI engineering: Deep Learning with PyTorch (CNNs, MLPs, computer vision), Transformers and LLMs (BERT, GPT, LLaMa), RAG systems with LangChain, AI Agents with Model Context Protocol (MCP), and production deployment with Ollama. Built RAG-powered assistants, chatbots, and image classifiers. Integrated LLM APIs (Gemini, DeepSeek) and vector databases (ChromaDB, Qdrant) for semantic search and context-aware generation.",
  },
  {
    institution: "Instituto Politécnico Formosa (IPF)",
    degree: "Python for Data Science & Machine Learning",
    date: "2024 — 2025",
    desc: "Comprehensive data science training covering the full ML pipeline: data manipulation with NumPy/Pandas, statistical visualization with Matplotlib, classical ML algorithms (KNN, Linear Regression) with Scikit-learn, and deep learning with Keras/TensorFlow. Focused on algorithm optimization, complexity analysis, model evaluation, and end-to-end project development from data cleaning to deployment.",
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Push Software / Orbitalab",
    role: "Fullstack Developer",
    date: "Mar 2024 — Aug 2024",
    desc: "Design of microservices architecture with NestJS. Development of RESTful APIs applying SOLID principles and Clean Architecture. Implemented TypeORM for database modeling and PostgreSQL integration.",
  },
  {
    company: "Freelancing",
    role: "AI Engineer & Backend Specialist",
    date: "2024 — Present",
    desc: "Development of production-ready RAG systems with LangChain, autonomous AI agents using Model Context Protocol (MCP), and streaming LLM integrations (Gemini, DeepSeek, OpenAI). Built data pipelines with vector databases (Qdrant, ChromaDB, Pinecone). Self-taught specialization in Deep Learning with PyTorch (CNNs, computer vision), Transformers with Hugging Face, and classical ML with Scikit-learn. Deployed scalable AI solutions with FastAPI and NestJS.",
  },
];

export const PROJECTS: ProjectItem[] = [
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

export const STACK_CATEGORIES: StackCategory[] = [
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
