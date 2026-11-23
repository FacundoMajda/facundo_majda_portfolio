import { useRouter } from "next/router";
import { COPY, type Copy } from "./copy";

// The Spanish section lives under /es, everything else is English. The active
// locale is derived from the route, so the same page component serves both.
export function useCopy(): Copy {
  const { pathname } = useRouter();
  const isSpanish = pathname === "/es" || pathname.startsWith("/es/");
  return isSpanish ? COPY.es : COPY.en;
}
