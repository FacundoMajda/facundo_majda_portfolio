import { ServicePage } from "@/components/services/ServicePage";

export default function ServicesHubPageEs() {
  return (
    <ServicePage
      path="/es/servicios"
      title="Desarrollador de Software e Ingeniero de IA en Argentina | Facundo Majda"
      description="Facundo Majda, desarrollador de software freelance radicado en Formosa, Argentina. Software a medida, sistemas empresariales, SaaS, backend y APIs, inteligencia artificial, visión por computadora y automatización. Remoto y presencial."
      kicker="[ DESARROLLADOR DE SOFTWARE · IA · FORMOSA, ARGENTINA ]"
      h1="Desarrollador de software e ingeniero de IA"
      servicesHeading="Áreas de trabajo"
      lede={
        <>
          Soy <strong className="text-foreground">Facundo Majda</strong>, y
          desarrollo software que funciona en producción, con la inteligencia
          artificial como especialidad. Estoy radicado en{" "}
          <strong className="text-foreground">Formosa, Argentina</strong>, y
          trabajo con empresas y equipos de la ciudad, del NEA, de todo el país
          y del exterior.
        </>
      }
      services={[
        {
          title: "Software a medida y sistemas",
          body: "Sistemas de gestión, plataformas y herramientas propias: arquitectura, backend, APIs, paneles y despliegue.",
        },
        {
          title: "Inteligencia artificial",
          body: "Asistentes con RAG, aplicaciones con LLM, agentes, fine-tuning con LoRA y procesamiento de documentos, llevados a producción.",
        },
        {
          title: "Automatización",
          body: "Integración entre sistemas y automatización de flujos para eliminar el trabajo manual repetitivo.",
        },
        {
          title: "SaaS y plataformas",
          body: "Productos multiempresa: cuentas, roles, suscripciones, APIs y todo lo que necesita un SaaS para escalar.",
        },
        {
          title: "Visión por computadora",
          body: "Detección y seguimiento de objetos, análisis de video y monitoreo en tiempo real.",
        },
        {
          title: "Backend, datos e infraestructura",
          body: "APIs, bases de datos, integraciones y despliegue con observabilidad. La base que sostiene todo lo anterior.",
        },
      ]}
      stack={[
        { group: "Lenguajes", items: ["Python", "TypeScript", "JavaScript", "Java"] },
        { group: "Backend", items: ["FastAPI", "NestJS", "Node.js", "Spring Boot"] },
        { group: "Frontend", items: ["React", "Next.js", "Angular", "Tailwind CSS"] },
        { group: "Datos", items: ["PostgreSQL", "Supabase", "Redis", "Qdrant"] },
        { group: "IA / ML", items: ["PyTorch", "LangChain", "RAG", "LLM", "Computer Vision"] },
        { group: "Infra", items: ["Docker", "Linux", "AWS", "Vercel", "n8n"] },
      ]}
      faq={[
        {
          q: "¿Dónde estás radicado y a quién atendés?",
          a: "En Formosa, Argentina. Trabajo con clientes de la ciudad, del NEA, de todo el país y del exterior, de forma remota y presencial cuando el proyecto lo requiere.",
        },
        {
          q: "¿Hacés solo inteligencia artificial?",
          a: "No. Desarrollo software completo — sistemas, backend, APIs e infraestructura — con IA/ML como especialidad diferencial.",
        },
        {
          q: "¿Podés tomar un proyecto desde cero?",
          a: "Sí. Participo desde la definición técnica y la arquitectura hasta el desarrollo, el despliegue y el mantenimiento.",
        },
        {
          q: "¿Cómo contacto?",
          a: "Escribime contando qué necesitás y qué problema querés resolver. Te respondo con un enfoque técnico y una propuesta por etapas.",
        },
      ]}
    />
  );
}
