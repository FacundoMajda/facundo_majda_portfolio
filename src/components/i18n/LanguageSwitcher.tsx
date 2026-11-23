import Link from "next/link";
import { useRouter } from "next/router";

const LOCALE_COOKIE = "NEXT_LOCALE";

function rememberLocale(locale: "en" | "es") {
  try {
    window.localStorage.setItem("locale", locale);
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
  } catch {
    // Preference is best-effort; navigation still works without it.
  }
}

// Language switcher for the localized site. The English site lives at `/` and
// the Spanish services at `/es/*`; switching records the choice so the proxy
// sends the visitor to their language on later visits.
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { pathname } = useRouter();
  const isSpanish = pathname === "/es" || pathname.startsWith("/es/");

  const base = "t-label transition-colors";

  return (
    <div
      role="group"
      aria-label="Language / Idioma"
      className={`inline-flex items-center gap-2 ${className}`}
    >
      <Link
        href="/"
        hrefLang="en"
        onClick={() => rememberLocale("en")}
        aria-current={isSpanish ? undefined : "true"}
        className={`${base} ${
          isSpanish
            ? "text-muted-foreground hover:text-primary"
            : "text-foreground"
        }`}
      >
        EN
      </Link>
      <span aria-hidden="true" className="text-muted-foreground">
        /
      </span>
      <Link
        href="/es"
        hrefLang="es-AR"
        onClick={() => rememberLocale("es")}
        aria-current={isSpanish ? "true" : undefined}
        className={`${base} ${
          isSpanish
            ? "text-foreground"
            : "text-muted-foreground hover:text-primary"
        }`}
      >
        ES
      </Link>
    </div>
  );
}

export default LanguageSwitcher;
