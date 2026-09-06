import React, { useEffect, useRef, useState } from "react";

export const useOnScreen = (options: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(node);
    return () => {
      observer.unobserve(node);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- options intentionally captured on mount only; changing them would re-fire the observer and re-trigger setState, causing an infinite render loop in callers (e.g. <Reveal>) that pass a fresh options object each render.
  }, []);

  return { ref, isVisible };
};

export const Reveal = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}): React.JSX.Element => {
  const { ref, isVisible } = useOnScreen({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
