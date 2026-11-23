import { ServicePage } from "@/components/services/ServicePage";

export default function ComputerVisionPage() {
  return (
    <ServicePage
      path="/es/computer-vision"
      title="Visión por Computadora | Detección y Análisis de Video — Facundo Majda"
      description="Sistemas de visión por computadora: detección y seguimiento de objetos, análisis de video y monitoreo en tiempo real con YOLO y ByteTrack. Facundo Majda, desde Formosa, Argentina."
      kicker="[ COMPUTER VISION · DETECCIÓN · VIDEO ]"
      h1="Visión por computadora"
      servicesHeading="Qué desarrollo"
      lede={
        <>
          Cámaras que generan información útil, no solo grabaciones que nadie
          mira. <strong className="text-foreground">Detección y seguimiento
          de objetos, análisis de video y monitoreo en tiempo real</strong>{" "}
          con modelos como YOLO y ByteTrack, pensados para correr en
          infraestructura realista. Desde Formosa, para toda Argentina y el exterior.
        </>
      }
      services={[
        {
          title: "Detección de objetos",
          body: "Identificar qué aparece en la imagen y dónde, con modelos entrenados o ajustados a tu caso.",
        },
        {
          title: "Seguimiento de personas y objetos",
          body: "Seguir el mismo objeto a través del video y respetar zonas de interés: qué pasa dónde.",
        },
        {
          title: "Análisis de video",
          body: "Procesar grabaciones o stream en vivo para extraer eventos, conteos y patrones.",
        },
        {
          title: "Automatización de inspección",
          body: "Revisión visual automática de productos o activos, sin depender del ojo humano para lo repetitivo.",
        },
        {
          title: "Métricas y alertas",
          body: "Convertir la detección en algo accionable: conteos, cruces, alertas cuando ocurre un evento.",
        },
        {
          title: "Despliegue realista",
          body: "Considero el hardware disponible: GPU, edge o servidor, y la latencia que el caso necesita.",
        },
      ]}
      stack={[
        { group: "Modelos y librerías", items: ["PyTorch", "YOLO", "ByteTrack", "Scikit-learn"] },
        { group: "Lenguajes", items: ["Python", "TypeScript"] },
        { group: "Serving", items: ["FastAPI", "ONNX", "vLLM", "OpenTelemetry"] },
        { group: "Infra", items: ["Docker", "Linux", "RunPod", "CoreWeave"] },
      ]}
      faq={[
        {
          q: "¿Cómo arranco sin dataset propio?",
          a: "Con modelos preentrenados ajustados a tu caso son suficientes. Si hace falta, definimos qué datos juntar y cómo etiquetarlos.",
        },
        {
          q: "¿Trabajás con video en vivo o grabado?",
          a: "Los dos. Stream en tiempo real para monitoreo, o procesamiento de grabaciones para análisis y reportes.",
        },
        {
          q: "¿Necesito hardware especial?",
          a: "Depende del caso. Puede ser una GPU en la nube, un equipo en el lugar o una sola máquina. Lo dimensiono antes de proponer.",
        },
        {
          q: "¿Se integra con mi sistema actual?",
          a: "Sí. La detección termina en eventos y datos que se conectan a tu backend, tus alertas o tu panel.",
        },
      ]}
    />
  );
}
