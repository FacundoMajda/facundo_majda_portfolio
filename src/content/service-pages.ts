// Single source of truth for the Spanish service pages. The page nav and the
// sitemap both read from here, so a new page is linked everywhere at once.
export type ServicePageLink = { path: string; label: string };

export const SERVICE_PAGES: ServicePageLink[] = [
  { path: "/es/servicios", label: "Desarrollador de software" },

  {
    path: "/es/desarrollador-software-formosa",
    label: "Desarrollador de software en Formosa",
  },
  {
    path: "/es/inteligencia-artificial-formosa",
    label: "Inteligencia artificial en Formosa",
  },
  {
    path: "/es/desarrollo-software-a-medida",
    label: "Desarrollo de software a medida",
  },
  { path: "/es/automatizacion-empresas", label: "Automatización para empresas" },
  { path: "/es/saas", label: "Desarrollo de SaaS" },
  { path: "/es/computer-vision", label: "Visión por computadora" },
];
