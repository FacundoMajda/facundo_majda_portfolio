"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";

interface LazyEffectProps {
  as: ComponentType<{ children: ReactNode; [key: string]: unknown }>;
  rootMargin?: string;
  children: ReactNode;
  [key: string]: unknown;
}

// ponytail: mounts the WebGL effect only near the viewport and unmounts it
// once scrolled away, so a page with many canvasui effects stays under the
// browser's simultaneous WebGL context limit instead of holding all of them live.
export function LazyEffect({
  as: Effect,
  rootMargin = "300px",
  children,
  ...effectProps
}: LazyEffectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const renderCount = useRef(0);
  renderCount.current += 1;
  // eslint-disable-next-line no-console -- debug instrumentation
  console.log(
    `[clg] LazyEffect render #${renderCount.current} active=${active} rootMargin=${rootMargin}`,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // eslint-disable-next-line no-console -- debug instrumentation
    console.log("[clg] LazyEffect mount, creating observer");
    const observer = new IntersectionObserver(
      ([entry]) => {
        // eslint-disable-next-line no-console -- debug instrumentation
        console.log(
          "[clg] LazyEffect intersection isIntersecting=",
          entry.isIntersecting,
        );
        setActive(entry.isIntersecting);
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => {
      // eslint-disable-next-line no-console -- debug instrumentation
      console.log("[clg] LazyEffect cleanup");
      observer.disconnect();
    };
  }, [rootMargin]);

  return (
    <div ref={ref}>
      {active ? <Effect {...effectProps}>{children}</Effect> : children}
    </div>
  );
}

export default LazyEffect;
