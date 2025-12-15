import {
  BarChart3,
  BrainCircuit,
  Database,
  Layout,
  Server,
  Terminal,
  Smartphone,
  CreditCard,
} from "lucide-react";
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
    desc: "Development of RAG systems with LangChain, autonomous AI agents using Model Context Protocol (MCP), and streaming LLM integrations (Gemini, DeepSeek, OpenAI). Built data pipelines with vector databases (Qdrant, ChromaDB, Pinecone). Proficient in Deep Learning with PyTorch (CNNs, computer vision), Transformers with Hugging Face, and classical ML with Scikit-learn.",
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "01",
    title: "Syllabi - Intelligent Tutoring System",
    category: "AI & EdTech",
    tech: [
      "NestJS",
      "TypeORM",
      "PostgreSQL",
      "Qdrant",
      "LangChain",
      "Mastra",
      "React",
      "TypeScript",
      "AI SDK",
      "Gemini/OpenAI",
      "SSE",
      "Zod",
    ],
    desc: "Syllabi is an intelligent tutoring platform that adapts to each student's learning style and knowledge level.",
    longDesc:
      "Hook: Personalized ITS that adapts instruction to each student's profile and reduces manual work for educators.\n\nKey features:\n- Personalized conversational tutor with context-aware explanations tailored to student level\n- Competency mapping and mastery tracking across knowledge domains\n- Generative exercise/assessment creator and adaptive summaries\n- Real-time analytics dashboards and academic calendar\n- Collaborative learning spaces and centralized knowledge repository\n\nTech & architecture:\n- NestJS (TypeORM + PostgreSQL), Qdrant vector DB, LangChain + Mastra for RAG/orchestration, Vercel AI SDK & Gemini/OpenAI for LLMs, SSE for streaming responses, Zod for input validation\n\nImpact:\n- 24/7 personalized tutoring, faster content creation for educators, and data-driven teaching insights.",
    projectPdf: {
      title: "Syllabi - Project Document",
      link: "https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/1807196/90ee7887-7a55-4e58-b85f-a4e96a7eed08/Presentacion-del-Documento-Base-Actualizado-SYLLABI-.docx.pdf",
      note: "Full spec with competency maps, architecture diagrams, and use cases.",
    },
    evidence: [
      {
        title: "Project screenshots",
        images: [
          "https://via.placeholder.com/800x450?text=Syllabi+Screenshot+1",
          "https://via.placeholder.com/800x450?text=Syllabi+Screenshot+2",
        ],
        note: "UI mockups and sample tutor conversation snapshots.",
        type: "image",
      },
      {
        title: "GitHub Repository",
        link: SOCIAL_LINKS.github,
        note: "Main repo with backend and frontend code",
        type: "repo",
      },
    ],
    devNotes: [
      {
        date: "2024-08-XX",
        author: "Facundo Majda",
        content:
          "Project kickoff: Started Syllabi as a three-person team. Built V1 as a basic RAG system that divided knowledge domains into subjects and enabled interaction with PDF documents.",
      },
      {
        date: "2024-XX-XX",
        author: "Facundo Majda",
        content:
          "From POC to MVP V1 success: First working version handling subject-based domains with PDF processing. Simple retrieval, limited scope, but validated the core concept of AI-assisted academic guidance.",
      },
      {
        date: "2025-03-XX",
        author: "Facundo Majda",
        content:
          "Realizing we're building an ITS: As V2 development began, we recognized Syllabi wasn't just a content platform—it was becoming an Intelligent Tutoring System (STI). This realization shaped the entire V2 architecture around adaptive learning, personalized instruction, and student modeling.",
      },
      {
        date: "2025-XX-XX",
        author: "Facundo Majda",
        content:
          "V2: Competency-based STI: Launched V2 with a complete architectural shift from subject-based to competency-based learning. The STI now tracks skill development, identifies knowledge gaps, maps prerequisites, and adapts content to each student's trajectory.",
      },
      {
        date: "2025-XX-XX",
        author: "Facundo Majda",
        content:
          "Advanced resource management: Implemented high-precision web retrieval capable of recovering nearly any external resource available on the web. The STI can now contextualize external content alongside locally uploaded materials for personalized learning paths.",
      },
      {
        date: "2025-08-XX",
        author: "Facundo Majda",
        content:
          "Document analysis & syllabus extraction: Introduced document analysis pipeline with automatic syllabus extraction as the flagship feature. The system parses institutional documents and generates structured learning plans that feed directly into the STI's competency model.",
      },
      {
        date: "2025-12-10",
        author: "Facundo Majda",
        content:
          "200+ endpoints: Backend reached over 200 endpoints covering student features, intelligent tutoring capabilities, and back office operations. The platform evolved from prototype to production-grade STI infrastructure.",
      },
    ],
    link: SOCIAL_LINKS.github,
    color: "from-blue-600 to-purple-600",
  },
  {
    id: "02",
    title: "Hackathon Formosa 2024 - Plant Recognition",
    category: "AI Engineering",
    tech: ["Plant Detection API", "LangChain", "RAG", "React Native", "Expo"],
    desc: "Mobile app for plant identification that provides safety guidance about edible and toxic parts.",
    longDesc:
      "The system integrated a third-party plant detection API to identify species from photos, and then used a RAG pipeline with LangChain to retrieve specific information about which parts of each plant are poisonous or edible. The architecture combined external computer vision (without training our own models) with AI engineering for practical security use cases.\n\nTechnological Stack\nIt was developed as a mobile application with React Native + Expo, using the plant API for visual recognition and RAG for intelligent retrieval of safety information. The project demonstrated practical integration of AI services in cross-platform applications, focusing on AI engineering.",
    projectPdf: {
      title: "Hackathon slides & notes",
      link: SOCIAL_LINKS.github,
      note: "Presentation slides and architecture notes used during the hackathon.",
    },
    evidence: [
      {
        title: "App screenshots",
        images: [
          "https://via.placeholder.com/800x450?text=Plant+Recognition+1",
          "https://via.placeholder.com/800x450?text=Plant+Recognition+2",
        ],
        note: "Detection and results screen showing safety guidance and source citations.",
        type: "image",
      },
    ],
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
    desc: "Human-centered incident routing system that provides ranked, transparent recommendations to operators.",
    longDesc:
      "Hook: Improves civic incident routing by offering ranked, explainable recommendations while keeping humans in the loop.\n\nKey features:\n- Multi-option recommendation engine (ranked choices with pros/cons)\n- Severity classification and urgency scoring for triage\n- Transparent reasoning and human override capability\n- Historical context learning and soft-delete for auditability\n\nTech & architecture:\n- NestJS (TypeORM + PostgreSQL), structured LLM output for analysis (Gemini/OpenAI), Zod for validation, modular routing microservice and audit logs\n\nImpact:\n- Faster, more accurate routing decisions and improved accountability for civic services.",
    projectPdf: {
      title: "Project notes",
      link: SOCIAL_LINKS.github,
      note: "Design and routing diagrams.",
    },
    evidence: [
      {
        title: "Architecture screenshot",
        images: [
          "https://via.placeholder.com/800x450?text=Incident+Reporting+Diagram",
        ],
        note: "System diagram and data flow.",
        type: "image",
      },
    ],
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
    desc: "Clinical decision support assistant that uses RAG to provide evidence-backed diagnostic guidance and citations.",
    longDesc:
      "Hook: A clinician-facing assistant that accelerates evidence retrieval and presents concise, cited diagnostic guidance.\n\nKey features:\n- Dual-mode: urgent mode for rapid differential diagnosis and academic mode for detailed evidence review\n- Structured outputs (ICD-10 codes, medication suggestions) and explicit source citations\n- Streaming LLM responses for fast, interactive consultations\n\nTech & architecture:\n- Python + FastAPI backend, LangChain for RAG pipelines, Vector DB for embeddings, medical PDF processing and structured output with Pydantic\n\nImpact:\n- Reduces time to relevant evidence and improves traceability of clinical recommendations.",
    projectPdf: {
      title: "Clinical assistant notes",
      link: SOCIAL_LINKS.github,
      note: "Design notes and test cases.",
    },
    evidence: [
      {
        title: "UI mockups",
        images: [
          "https://via.placeholder.com/800x450?text=Clinical+Assistant+1",
        ],
        note: "Screenshots of urgent vs academic modes.",
        type: "image",
      },
    ],
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
      { name: "torchvision", icon: "https://cdn.simpleicons.org/pytorch" },
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
      {
        name: "sentence-transformers",
        icon: "https://cdn.simpleicons.org/huggingface",
      },
      { name: "Scikit-learn", icon: "https://cdn.simpleicons.org/scikitlearn" },
      { name: "TensorFlow", icon: "https://cdn.simpleicons.org/tensorflow" },
      { name: "Keras", icon: "https://cdn.simpleicons.org/keras" },
    ],
    icon: <BrainCircuit className="w-8 h-8 text-purple-500" />,
  },
  {
    name: "Data Science & Analysis",
    items: [
      { name: "NumPy", icon: "https://cdn.simpleicons.org/numpy" },
      { name: "Pandas", icon: "https://cdn.simpleicons.org/pandas" },
      {
        name: "Matplotlib",
        icon: "https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg",
      },
      { name: "Jupyter", icon: "https://cdn.simpleicons.org/jupyter" },
      { name: "Streamlit", icon: "https://cdn.simpleicons.org/streamlit" },
    ],
    icon: <BarChart3 className="w-8 h-8 text-orange-500" />,
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
      { name: "Postman", icon: "https://cdn.simpleicons.org/postman" },
      { name: "Jira", icon: "https://cdn.simpleicons.org/jira" },
      { name: "ClickUp", icon: "https://cdn.simpleicons.org/clickup" },
      { name: "Slack", icon: "https://cdn.simpleicons.org/slack" },
    ],
    icon: <Terminal className="w-8 h-8 text-gray-500" />,
  },
  {
    name: "Payments",
    items: [
      { name: "Stripe", icon: "https://cdn.simpleicons.org/stripe" },
      { name: "Mercado Pago", icon: "https://cdn.simpleicons.org/mercadopago" },
    ],
    icon: <CreditCard className="w-8 h-8 text-yellow-500" />,
  },
  {
    name: "Mobile",
    items: [
      { name: "React Native", icon: "https://cdn.simpleicons.org/react" },
      { name: "Expo", icon: "https://cdn.simpleicons.org/expo" },
    ],
    icon: <Smartphone className="w-8 h-8 text-pink-500" />,
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
