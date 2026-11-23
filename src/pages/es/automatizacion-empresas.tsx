import { ServicePage } from "@/components/services/ServicePage";

export default function BusinessAutomationPage() {
  return (
    <ServicePage
      path="/es/automatizacion-empresas"
      title="Automatización de Procesos para Empresas | Facundo Majda"
      description="Automatización de procesos e integraciones para empresas: conecto tus sistemas, elimino tareas manuales y proceso información con Python, APIs y n8n. Desde Formosa, Argentina."
      kicker="[ AUTOMATIZACIÓN · INTEGRACIONES · n8n ]"
      h1="Automatización para empresas"
      servicesHeading="Qué automatizo"
      lede={
        <>
          Las tareas repetitivas se comen el día.{" "}
          <strong className="text-foreground">Conecto tus sistemas y automatizo
          el trabajo manual</strong> — pasar datos entre herramientas, armar
          reportes, procesar documentos, mandar avisos — para que tu equipo se
          dedique a lo que suma. Desde Formosa, para toda Argentina y el exterior.
        </>
      }
      services={[
        {
          title: "Integración entre sistemas",
          body: "Que tus herramientas dejen de estar aisladas: los datos viajan solos de una a otra, sin copiar y pegar.",
        },
        {
          title: "Automatización de flujos",
          body: "Procesos que corren solos: altas, notificaciones, aprobaciones, seguimiento. Con n8n, APIs propias o lo que pida el caso.",
        },
        {
          title: "Procesamiento de documentos",
          body: "Extraer datos de facturas, planillas o PDFs, ordenarlos y cargarlos donde corresponden.",
        },
        {
          title: "Reportes y alertas",
          body: "Informes que se generan y se envían solos, y avisos cuando algo se sale de rango.",
        },
        {
          title: "IA dentro del flujo",
          body: "Clasificar, resumir o responder dentro del proceso. La IA como una pieza más, no como un juguete aparte.",
        },
        {
          title: "Monitoreo del proceso",
          body: "Cada automatización deja traza: si falla, se sabe dónde y por qué. Nada de cajas negras.",
        },
      ]}
      stack={[
        { group: "Integración y orquestación", items: ["n8n", "Make", "Zapier", "REST APIs", "Webhooks"] },
        { group: "Código", items: ["Python", "TypeScript", "Node.js"] },
        { group: "Datos", items: ["PostgreSQL", "Supabase", "Redis"] },
        { group: "IA aplicada", items: ["RAG", "LLM", "Document parsing"] },
      ]}
      faq={[
        {
          q: "¿Sirve si mis sistemas no tienen API?",
          a: "En la mayoría de los casos sí: se resuelve con exportaciones, base de datos intermedia o automatización de la interfaz. Lo evaluamos en concreto.",
        },
        {
          q: "¿Cuánto tarda una automatización?",
          a: "Un flujo puntual puede estar en días. Un conjunto de procesos integrados, algunas semanas. Empezamos por el que más tiempo te ahorra.",
        },
        {
          q: "¿Qué pasa si algo falla de noche?",
          a: "La automatización deja registro y, si algo se rompe, avisa. No queda a ciegas esperando a que alguien lo note.",
        },
        {
          q: "¿Reemplaza a mi equipo?",
          a: "No. Le saca la parte mecánica. Las decisiones y el criterio siguen siendo humanos; lo repetitivo se automatiza.",
        },
      ]}
    />
  );
}
