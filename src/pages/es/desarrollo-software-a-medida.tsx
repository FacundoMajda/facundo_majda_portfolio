import { ServicePage } from "@/components/services/ServicePage";

export default function CustomSoftwarePage() {
  return (
    <ServicePage
      path="/es/desarrollo-software-a-medida"
      title="Desarrollo de Software a Medida | Sistemas y APIs — Facundo Majda"
      description="Desarrollo de software a medida para empresas: sistemas de gestión, plataformas, backend y APIs. Arquitectura, desarrollo, despliegue y mantenimiento. Facundo Majda, desde Formosa, Argentina."
      kicker="[ SOFTWARE A MEDIDA · SISTEMAS · APIs ]"
      h1="Desarrollo de software a medida"
      servicesHeading="Qué incluye"
      lede={
        <>
          Software pensado para tu operación, no una plantilla adaptada.{" "}
          <strong className="text-foreground">Sistemas de gestión, plataformas
          y herramientas propias</strong> donde yo me hago cargo de la
          arquitectura, el desarrollo, la base de datos, las APIs y el
          despliegue. Trabajo desde Formosa para toda Argentina y el exterior.
        </>
      }
      services={[
        {
          title: "Relevamiento y arquitectura",
          body: "Entiendo el proceso real antes de escribir código: qué entra, qué sale, quién lo usa y qué tiene que pasar. De ahí sale la arquitectura y el modelo de datos.",
        },
        {
          title: "Backend y APIs",
          body: "Servicios y APIs que sostienen el sistema, con validaciones, permisos y datos consistentes desde el primer día.",
        },
        {
          title: "Paneles e interfaz",
          body: "Las pantallas que tu equipo usa todos los días: claras, rápidas y sin pasos de más.",
        },
        {
          title: "Integraciones",
          body: "El sistema habla con lo que ya tenés: e-commerce, pagos, facturación, correo, sistemas de terceros y bases existentes.",
        },
        {
          title: "Migración de datos",
          body: "Si venís de planillas o de un sistema viejo, planifico la migración para no perder ni duplicar información.",
        },
        {
          title: "Despliegue y mantenimiento",
          body: "Queda funcionando en producción, con respaldos, monitoreo y la posibilidad de seguir sumando funcionalidades.",
        },
      ]}
      stack={[
        { group: "Backend", items: ["Python", "FastAPI", "NestJS", "Node.js", "Java", "Spring Boot"] },
        { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
        { group: "Datos", items: ["PostgreSQL", "Supabase", "Redis", "Drizzle ORM"] },
        { group: "Infra", items: ["Docker", "Linux", "Git", "OpenTelemetry"] },
      ]}
      faq={[
        {
          q: "¿Cómo empieza un proyecto a medida?",
          a: "Con una charla para entender el problema y el proceso. De ahí sale un alcance por etapas, con lo mínimo que ya te sirve funcionando desde la primera.",
        },
        {
          q: "¿Puedo empezar con algo chico?",
          a: "Sí, y es lo recomendable. Arrancamos por el núcleo que resuelve el dolor más grande y crecemos desde ahí, en lugar de esperar meses por un sistema enorme.",
        },
        {
          q: "¿Qué pasa con el código y los datos?",
          a: "El sistema queda en tu infraestructura o en una cuenta tuya. El código y los datos son tuyos, sin dependencias raras.",
        },
        {
          q: "¿Das soporte después de la entrega?",
          a: "Sí. Puedo quedarme para mantenimiento y mejoras, o dejar todo documentado para que lo tome otro equipo.",
        },
      ]}
    />
  );
}
