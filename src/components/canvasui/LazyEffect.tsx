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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref}>
      {active ? <Effect {...effectProps}>{children}</Effect> : children}
    </div>
  );
}

export default LazyEffect;
