import { ServicePage } from "@/components/services/ServicePage";

export default function SaasPage() {
  return (
    <ServicePage
      path="/es/saas"
      title="Desarrollo de SaaS | Plataformas Multiempresa — Facundo Majda"
      description="Desarrollo de plataformas SaaS: arquitectura multiempresa, autenticación y roles, suscripciones, facturación, APIs y despliegue. Facundo Majda, desde Formosa, Argentina."
      kicker="[ SAAS · MULTIEMPRESA · PLATAFORMAS ]"
      h1="Desarrollo de SaaS y plataformas"
      servicesHeading="Qué construyo"
      lede={
        <>
          Un producto que muchos clientes usan a la vez tiene exigencias
          propias: <strong className="text-foreground">aislamiento entre
          cuentas, permisos, escalabilidad y una operación que no se caiga</strong>.
          Diseño y construyo la base para que tu producto SaaS aguante el
          crecimiento. Desde Formosa, para toda Argentina y el exterior.
        </>
      }
      services={[
        {
          title: "Arquitectura multiempresa",
          body: "El modelo de datos correcto para que cada cliente vea solo lo suyo, desde el primer usuario hasta miles.",
        },
        {
          title: "Cuentas, roles y permisos",
          body: "Autenticación, invitaciones, roles y permisos granulares: quién puede ver y hacer qué.",
        },
        {
          title: "Suscripciones y facturación",
          body: "Planes, cobros recurrentes e integración con la pasarela de pago que uses.",
        },
        {
          title: "API para tus clientes",
          body: "Si tu producto expone una API, queda documentada, versionada y con control de acceso.",
        },
        {
          title: "Paneles y experiencia",
          body: "El panel donde tus clientes trabajan todos los días: rápido, claro y sin fricción.",
        },
        {
          title: "Despliegue y escala",
          body: "Infraestructura que aguanta el uso real, con observabilidad para ver qué pasa antes de que se rompa.",
        },
      ]}
      stack={[
        { group: "Backend", items: ["Python", "FastAPI", "NestJS", "Node.js"] },
        { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
        { group: "Datos", items: ["PostgreSQL", "Supabase", "Redis", "Drizzle ORM"] },
        { group: "Infra", items: ["Docker", "AWS", "Vercel", "OpenTelemetry"] },
      ]}
      faq={[
        {
          q: "¿Tengo la idea o el diseño, falta construir?",
          a: "Sí. Puedo tomar tu idea o tu diseño y llevarlo a un producto funcionando. También participo en las decisiones técnicas desde el inicio.",
        },
        {
          q: "¿Puedo empezar con un MVP?",
          a: "Es lo que recomiendo. Una versión mínima pero real, con usuarios, que valide antes de invertir en funcionalidades que quizá no usen.",
        },
        {
          q: "¿Se puede escalar después?",
          a: "Sí, si la base está bien pensada. Tomo decisiones que evitan reescribir todo cuando la plataforma crece.",
        },
        {
          q: "¿Qué pasa con la seguridad de los datos?",
          a: "Es parte del diseño: aislamiento entre cuentas, permisos, cifrado y control de acceso, no algo que se agrega al final.",
        },
      ]}
    />
  );
}
