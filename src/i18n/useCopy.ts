import { useRouter } from "next/router";
import { COPY, type Copy } from "./copy";

// The Spanish section lives under /es, everything else is English. The active
// locale is derived from the route, so the same page component serves both.
export function useIsSpanish(): boolean {
  const { pathname } = useRouter();
  return pathname === "/es" || pathname.startsWith("/es/");
}

export function useCopy(): Copy {
  return useIsSpanish() ? COPY.es : COPY.en;
}

