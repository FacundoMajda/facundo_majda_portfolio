import { ServicePage } from "@/components/services/ServicePage";

export default function ServicesHubPageEn() {
  return (
    <ServicePage
      path="/services"
      title="Software Developer & AI Engineer | Facundo Majda"
      description="Facundo Majda, freelance software developer based in Formosa, Argentina. Custom software, business systems, SaaS, backend and APIs, artificial intelligence, computer vision and automation. Remote and on-site."
      kicker="[ SOFTWARE DEVELOPER · AI · FORMOSA, ARGENTINA ]"
      h1="Software developer and AI engineer"
      servicesHeading="Areas of work"
      lede={
        <>
          I&apos;m <strong className="text-foreground">Facundo Majda</strong>, and
          I build software that works in production, with artificial intelligence
          as my specialty. I&apos;m based in{" "}
          <strong className="text-foreground">Formosa, Argentina</strong>, and I
          work with companies and teams in the city, the region, across the
          country and abroad.
        </>
      }
      services={[
        {
          title: "Custom software and systems",
          body: "Management systems, platforms and in-house tools: architecture, backend, APIs, dashboards and deployment.",
        },
        {
          title: "Artificial intelligence",
          body: "RAG assistants, LLM applications, agents, LoRA fine-tuning and document processing, taken all the way to production.",
        },
        {
          title: "Automation",
          body: "Integration between systems and workflow automation to remove repetitive manual work.",
        },
        {
          title: "SaaS and platforms",
          body: "Multi-tenant products: accounts, roles, subscriptions, APIs and everything a SaaS needs to scale.",
        },
        {
          title: "Computer vision",
          body: "Object detection and tracking, video analysis and real-time monitoring.",
        },
        {
          title: "Backend, data and infrastructure",
          body: "APIs, databases, integrations and deployment with observability. The base that holds everything else up.",
        },
      ]}
      stack={[
        { group: "Languages", items: ["Python", "TypeScript", "JavaScript", "Java"] },
        { group: "Backend", items: ["FastAPI", "NestJS", "Node.js", "Spring Boot"] },
        { group: "Frontend", items: ["React", "Next.js", "Angular", "Tailwind CSS"] },
        { group: "Data", items: ["PostgreSQL", "Supabase", "Redis", "Qdrant"] },
        { group: "AI / ML", items: ["PyTorch", "LangChain", "RAG", "LLM", "Computer Vision"] },
        { group: "Infra", items: ["Docker", "Linux", "AWS", "Vercel", "n8n"] },
      ]}
      faq={[
        {
          q: "Where are you based and who do you work with?",
          a: "In Formosa, Argentina. I work with clients in the city, the region, across the country and abroad, remotely and on-site when the project calls for it.",
        },
        {
          q: "Do you only do artificial intelligence?",
          a: "No. I build complete software — systems, backend, APIs and infrastructure — with AI/ML as a differentiating specialty.",
        },
        {
          q: "Can you take a project from scratch?",
          a: "Yes. I take part from the technical definition and architecture through development, deployment and maintenance.",
        },
        {
          q: "How do I get in touch?",
          a: "Write to me about what you need and the problem you want to solve. You get a technical approach and a staged proposal back.",
        },
      ]}
    />
  );
}
