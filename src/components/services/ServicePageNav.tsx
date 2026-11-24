import Link from "next/link";
import { SERVICE_PAGES } from "@/content/service-pages";

// Star topology: every service page links to every other one, so Google reads
// them as one topical cluster and distributes authority between them.
export function ServicePageNav({ current }: { current: string }) {
  // The cluster links Spanish pages only: never render it on the English page.
  if (!current.startsWith("/es")) return null;
  const others = SERVICE_PAGES.filter((page) => page.path !== current);
  return (
    <section className="mt-16 border-t border-border pt-8">
      <p className="t-label text-muted-foreground">[ SERVICIOS ]</p>
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
        {others.map((page) => (
          <li key={page.path}>
            <Link
              href={page.path}
              className="t-label text-muted-foreground transition-colors hover:text-primary"
            >
              {page.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ServicePageNav;
