import { db } from "@/db";
import {
  profile,
  socialLink,
  techTag,
  experience,
  education,
  project,
} from "@/db/schema";

// NOTE: User/session/account/verification tables are managed by Neon Auth
// in the `neon_auth` schema. We don't manage them here.

const isoDate = (s: string) => new Date(s);

const PROFILE = {
  heroTitle: "AI/ML & Automation Engineer",
  heroTagline:
    "SWE | Data & AI-Driven Apps | FDE | Full-Stack + Automation | LangChain · LangGraph · Mastra · AI SDK · MCP | Python · TypeScript · Java · Rust | NestJS · Spring Boot · FastAPI · Flask | React · Next.js · Angular | n8n · Make · Zapier",
  aboutText:
    "I design and ship production AI and automation systems — RAG pipelines, LLM agents, computer vision, NLP, and the workflows that connect them to real operations. My work spans backend services, APIs, and the frontends that make those systems usable, end to end.",
  statusLine:
    "Available for remote engineering roles and selected projects",
  yearsExp: 3,
  contactEmail: "facundomajda13@gmail.com",
  seoTitle: "Facundo Majda — AI/ML & Automation Engineer",
  seoDescription:
    "AI/ML & Automation Engineer. I design and ship production AI systems — RAG pipelines, LLM agents, computer vision, and the backend that holds them up.",
  seoUrl: "https://facundomajda.dev",
};

const SOCIAL_LINKS = [
  { platform: "github", url: "https://github.com/FacundoMajda", order: 0 },
  { platform: "linkedin", url: "https://www.linkedin.com/in/facundo-majda/", order: 1 },
  { platform: "upwork", url: "https://www.upwork.com/freelancers/~014f767f0225d54d8e", order: 2 },
  { platform: "email", url: "mailto:facundomajda13@gmail.com", order: 3 },
];

const STACK_CATEGORIES = [
  {
    name: "AI & Machine Learning",
    items: [
      { name: "LangChain", icon: "https://cdn.simpleicons.org/langchain" },
      { name: "LangGraph", icon: "https://cdn.simpleicons.org/langgraph" },
      { name: "PyTorch", icon: "https://cdn.simpleicons.org/pytorch" },
      { name: "torchvision", icon: "https://cdn.simpleicons.org/pytorch" },
      { name: "Ultralytics", icon: "https://cdn.simpleicons.org/ultralytics" },
      { name: "Supervision", icon: "https://cdn.simpleicons.org/roboflow" },
      { name: "Ollama", icon: "https://cdn.simpleicons.org/ollama/ffffff" },
      { name: "Hugging Face", icon: "https://cdn.simpleicons.org/huggingface" },
      { name: "Vercel AI SDK", icon: "https://cdn.simpleicons.org/vercel/ffffff" },
      { name: "Mastra", icon: "/icons/mastra.svg" },
      { name: "Google Gemini", icon: "https://cdn.simpleicons.org/google" },
      { name: "OpenAI", icon: "/icons/openai.svg" },
      { name: "DeepSeek", icon: "/icons/deepseek.svg" },
      { name: "Scikit-learn", icon: "https://cdn.simpleicons.org/scikitlearn" },
      { name: "TensorFlow", icon: "https://cdn.simpleicons.org/tensorflow" },
      { name: "Keras", icon: "https://cdn.simpleicons.org/keras" },
      { name: "RunPod", icon: "https://avatars.githubusercontent.com/u/95939477?v=4" },
    ],
  },
  {
    name: "Backend Architecture",
    items: [
      { name: "NestJS", icon: "https://cdn.simpleicons.org/nestjs" },
      { name: "Express", icon: "https://cdn.simpleicons.org/express/ffffff" },
      { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs" },
      { name: "Python", icon: "https://cdn.simpleicons.org/python" },
      { name: "FastAPI", icon: "https://cdn.simpleicons.org/fastapi" },
      { name: "Flask", icon: "https://cdn.simpleicons.org/flask" },
      { name: "Java", icon: "https://cdn.simpleicons.org/openjdk/ffffff" },
      { name: "Spring Boot", icon: "https://cdn.simpleicons.org/springboot" },
    ],
  },
  {
    name: "Mobile & Frontend Dev",
    items: [
      { name: "React", icon: "https://cdn.simpleicons.org/react" },
      { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
      { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript" },
      { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss" },
      { name: "shadcn/ui", icon: "https://cdn.simpleicons.org/shadcnui/ffffff" },
      { name: "Angular", icon: "https://cdn.simpleicons.org/angular/ffffff" },
      { name: "React Native", icon: "https://cdn.simpleicons.org/react" },
      { name: "Expo", icon: "https://cdn.simpleicons.org/expo/ffffff" },
    ],
  },
  {
    name: "Databases",
    items: [
      { name: "Qdrant", icon: "https://cdn.simpleicons.org/qdrant" },
      { name: "ChromaDB", icon: "https://api.iconify.design/logos/chroma.svg" },
      { name: "Pinecone", icon: "/icons/pinecone.svg" },
      { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql" },
      { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb" },
      { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql" },
      { name: "TypeORM", icon: "https://cdn.simpleicons.org/typeorm" },
      { name: "Prisma", icon: "https://cdn.simpleicons.org/prisma" },
    ],
  },
  {
    name: "Data Science & Analysis",
    items: [
      { name: "NumPy", icon: "https://cdn.simpleicons.org/numpy" },
      { name: "Pandas", icon: "https://cdn.simpleicons.org/pandas" },
      { name: "Matplotlib", icon: "https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg" },
      { name: "Jupyter", icon: "https://cdn.simpleicons.org/jupyter" },
      { name: "Streamlit", icon: "https://cdn.simpleicons.org/streamlit" },
    ],
  },
  {
    name: "Automation",
    items: [
      { name: "n8n", icon: "https://cdn.simpleicons.org/n8n" },
      { name: "Make", icon: "https://cdn.simpleicons.org/make" },
      { name: "Zapier", icon: "https://cdn.simpleicons.org/zapier" },
    ],
  },
  {
    name: "DevOps & Tools",
    items: [
      { name: "Docker", icon: "https://cdn.simpleicons.org/docker" },
      { name: "Kubernetes", icon: "https://cdn.simpleicons.org/kubernetes" },
      { name: "Git", icon: "https://cdn.simpleicons.org/git" },
      { name: "GitHub", icon: "https://cdn.simpleicons.org/github/ffffff" },
      { name: "Postman", icon: "https://cdn.simpleicons.org/postman" },
      { name: "GitHub Actions", icon: "https://cdn.simpleicons.org/githubactions" },
      { name: "Dokploy", icon: "https://api.iconify.design/logos/dokploy.svg" },
    ],
  },
];

const EXPERIENCE = [
  {
    company: "Push Software",
    link: "https://www.pushsoftware.com.ar/",
    role: "Full Stack Engineer",
    startDate: isoDate("2024-03-01"),
    endDate: isoDate("2024-08-01"),
    description:
      "Built and maintained production web applications end-to-end with TypeScript and Node.js, applying clean architecture to keep the codebase maintainable as it grew. Designed RESTful APIs with Express and NestJS, and modeled databases across MongoDB, PostgreSQL, and MySQL.",
    isCurrent: false,
    order: 4,
  },
  {
    company: "Freelancing",
    link: null,
    role: "AI Engineer & Backend Specialist",
    startDate: isoDate("2024-01-01"),
    endDate: null,
    description:
      "Designed and delivered AI systems for client workflows, including RAG pipelines, document intelligence, agentic workflows, real-time conversational systems, and backend services integrating LLMs with operational data.",
    isCurrent: true,
    order: 3,
  },
  {
    company: "MF Legal & Consulting",
    link: null,
    role: "Solutions Architect",
    startDate: isoDate("2026-03-01"),
    endDate: isoDate("2026-07-01"),
    description:
      "Designed and delivered a custom CRM/ERP platform with dynamic data modeling across three offices, architected end-to-end sales and prospecting workflows for insurance and legal clients, and orchestrated integrations with external systems and law firm databases for seamless case and client management.",
    isCurrent: false,
    order: 2,
  },
  {
    company: "Lumenlab",
    link: "https://www.lumenlab.ai/",
    role: "Automation Specialist",
    startDate: isoDate("2026-04-01"),
    endDate: null,
    description:
      "Building end-to-end AI automations for international clients — from rapid proof-of-concept to optimized production — with hands-on work in agentic workflows, fine-tuning, RAG, API/LLM orchestration, and inference tuning.",
    isCurrent: true,
    order: 1,
  },
];

const EDUCATION = [
  {
    institution: "Instituto Politécnico Formosa (IPF)",
    link: "https://www.ipf.edu.ar/",
    degree: "Higher Technical Degree in Cross-Platform Software Development",
    startDate: isoDate("2023-01-01"),
    endDate: isoDate("2025-12-01"),
    description:
      "Intensive technical program focused on cross-platform software development. Covered software architecture, object-oriented design, database modeling, and full-stack development through hands-on projects.",
    order: 0,
  },
  {
    institution: "Instituto Politécnico Formosa (IPF)",
    link: "https://www.ipf.edu.ar/",
    degree: "Artificial Intelligence – Models and Applications",
    startDate: isoDate("2024-01-01"),
    endDate: isoDate("2025-12-01"),
    description:
      "Advanced training in AI and LLMs, from deep learning fundamentals through Transformers, RAG, and AI agents to production deployment of LLM APIs.",
    order: 1,
  },
  {
    institution: "Instituto Politécnico Formosa (IPF)",
    link: "https://www.ipf.edu.ar/",
    degree: "Python for Data Science & Machine Learning",
    startDate: isoDate("2024-01-01"),
    endDate: isoDate("2025-12-01"),
    description:
      "Full data science and machine learning pipeline in Python, from data analysis and preprocessing through classical ML and deep learning to end-to-end project deployment.",
    order: 2,
  },
  {
    institution: "Universidad de la Defensa Nacional (UNDEF)",
    link: "https://undef.edu.ar/",
    degree: "Bachelor's Degree in Cyber Defense",
    startDate: isoDate("2026-03-01"),
    endDate: null,
    description:
      "Argentina's first cyber defense degree — covering secure software development, cryptography, digital forensics, risk and threat assessment, and AI/ML applications in defensive cybersecurity contexts.",
    order: 3,
  },
];

const PROJECTS = [
  {
    slug: "syllabi-intelligent-tutoring",
    title: "Syllabi - Intelligent Tutoring System",
    category: "AI & EdTech",
    tech: ["NestJS", "TypeORM", "PostgreSQL", "Qdrant", "LangChain", "Mastra", "React", "TypeScript", "AI SDK", "Gemini/OpenAI", "SSE", "Zod"],
    shortDesc: "Syllabi is an intelligent tutoring platform that adapts to each student's learning style and knowledge level.",
    longDesc: "Hook: Personalized ITS that adapts instruction to each student's profile and reduces manual work for educators.\n\nKey features:\n- Personalized conversational tutor\n- Competency mapping and mastery tracking\n- Generative exercise creator\n- Real-time analytics dashboards\n- 200+ endpoints covering student features and back office operations.",
    repoUrl: null,
    caseStudyUrl: null,
    color: "from-blue-600 to-purple-600",
    metrics: { endpoints: "200+", students: "ongoing" },
    isClientWork: true,
    featured: true,
    order: 0,
  },
  {
    slug: "hackathon-ipf-2025-incident-reporting",
    title: "Hackathon IPF 2025 - Intelligent Incident Reporting System",
    category: "Human-Centered AI",
    tech: ["NestJS", "TypeORM", "PostgreSQL (Neon)", "Google Gemini 2.0 Flash", "Zod", "JWT", "Multer", "class-validator", "Swagger"],
    shortDesc: "Human-centered incident routing system that provides ranked, transparent recommendations to operators.",
    longDesc: "Improves civic incident routing by offering ranked, explainable recommendations while keeping humans in the loop. Multi-option recommendation engine with severity classification and urgency scoring for triage.",
    repoUrl: null,
    caseStudyUrl: null,
    color: "from-purple-500 to-indigo-600",
    metrics: null,
    isClientWork: false,
    featured: true,
    order: 1,
  },
  {
    slug: "clinical-rag-assistant",
    title: "Clinical RAG Assistant",
    category: "AI & Healthcare",
    tech: ["Python", "FastAPI", "LangChain", "LangChain Expression Language", "Vector DB", "Medical PDF Processing", "Streaming Responses"],
    shortDesc: "Clinical decision support assistant that uses RAG to provide evidence-backed diagnostic guidance and citations.",
    longDesc: "Dual-mode clinical RAG: urgent mode for rapid differential diagnosis and academic mode for detailed evidence review. Structured outputs (ICD-10 codes) and explicit source citations.",
    repoUrl: null,
    caseStudyUrl: null,
    color: "from-red-500 to-pink-600",
    metrics: null,
    isClientWork: true,
    featured: true,
    order: 2,
  },
  {
    slug: "talkitdown-offline-dictation",
    title: "talkitdown - Offline Dictation & Transcription",
    category: "Privacy-First AI",
    tech: ["Parakeet v3 (NVIDIA)", "Local Inference", "CPU-only", "Multilingual", "Desktop", "System Audio Capture", "Offline-First"],
    shortDesc: "Offline dictation and transcription app that runs NVIDIA's Parakeet v3 locally on your CPU.",
    longDesc: "talkitdown is built on the idea that your words are yours: no cloud, no upload, no bot joining your calls. Dictate mode writes at your cursor. Transcribe mode captures mic or system audio. Cross-platform desktop app.",
    repoUrl: null,
    caseStudyUrl: "https://tid-landing.vercel.app/",
    color: "from-slate-500 to-zinc-700",
    metrics: { latency: "real-time", platform: "Win/Mac/Linux" },
    isClientWork: true,
    featured: true,
    order: 3,
  },
  {
    slug: "hackathon-formosa-2024-plant-recognition",
    title: "Hackathon Formosa 2024 - Plant Recognition",
    category: "AI Engineering",
    tech: ["Plant Detection API", "LangChain", "RAG", "React Native", "Expo"],
    shortDesc: "Mobile app for plant identification that provides safety guidance about edible and toxic parts.",
    longDesc: "Integrated a third-party plant detection API with RAG pipeline using LangChain to retrieve safety information. Mobile app with React Native + Expo.",
    repoUrl: null,
    caseStudyUrl: null,
    color: "from-emerald-500 to-teal-600",
    metrics: null,
    isClientWork: false,
    featured: true,
    order: 4,
  },
];

async function seed() {
  console.log("🌱 Seeding portfolio content (Neon Auth handles users in neon_auth schema)...\n");

  console.log("→ Profile");
  await db.insert(profile).values({ id: "singleton", ...PROFILE }).onConflictDoUpdate({
    target: profile.id,
    set: PROFILE,
  });

  console.log("→ Social links");
  await db.delete(socialLink);
  if (SOCIAL_LINKS.length > 0) {
    await db.insert(socialLink).values(SOCIAL_LINKS);
  }

  console.log("→ Tech tags");
  await db.delete(techTag);
  const techTags = STACK_CATEGORIES.flatMap((cat, catIdx) =>
    cat.items.map((item, itemIdx) => ({
      name: item.name,
      category: cat.name,
      iconUrl: item.icon,
      featured: true,
      order: catIdx * 100 + itemIdx,
    })),
  );
  if (techTags.length > 0) {
    await db.insert(techTag).values(techTags);
  }

  console.log("→ Experience");
  await db.delete(experience);
  if (EXPERIENCE.length > 0) {
    await db.insert(experience).values(EXPERIENCE);
  }

  console.log("→ Education");
  await db.delete(education);
  if (EDUCATION.length > 0) {
    await db.insert(education).values(EDUCATION);
  }

  console.log("→ Projects");
  await db.delete(project);
  if (PROJECTS.length > 0) {
    await db.insert(project).values(
      PROJECTS.map((p) => ({
        ...p,
        publishedAt: new Date(),
      })),
    );
  }

  console.log("\n✅ Seed complete.");
  console.log(`   - 1 profile row`);
  console.log(`   - ${SOCIAL_LINKS.length} social links`);
  console.log(`   - ${techTags.length} tech tags`);
  console.log(`   - ${EXPERIENCE.length} experience entries`);
  console.log(`   - ${EDUCATION.length} education entries`);
  console.log(`   - ${PROJECTS.length} projects (all published)`);
  console.log(`\n   Users are managed by Neon Auth — sign in at /admin/login to create yours.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
