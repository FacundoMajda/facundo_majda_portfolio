import Link from "next/link";
import { useRouter } from "next/router";

const LOCALE_COOKIE = "NEXT_LOCALE";

// Pages that exist in both languages, so the switcher translates in place.
// Anything else falls back to the section hub of the target language.
const ENGLISH_TO_SPANISH: Record<string, string> = {
  "/": "/es",
  "/services": "/es/servicios",
};
const SPANISH_TO_ENGLISH: Record<string, string> = {
  "/es": "/",
  "/es/servicios": "/services",
};

function rememberLocale(locale: "en" | "es") {
  try {
    window.localStorage.setItem("locale", locale);
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
  } catch {
    // Preference is best-effort; navigation still works without it.
  }
}

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { pathname } = useRouter();
  const isSpanish = pathname === "/es" || pathname.startsWith("/es/");

  const spanishHref = ENGLISH_TO_SPANISH[pathname] ?? "/es";
  const englishHref = SPANISH_TO_ENGLISH[pathname] ?? "/services";

  const base = "t-label transition-colors";

  return (
    <div
      role="group"
      aria-label="Language / Idioma"
      className={`inline-flex items-center gap-2 ${className}`}
    >
      <Link
        href={englishHref}
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
        href={spanishHref}
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
