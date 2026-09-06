import { useEffect, useRef, useState } from "react";
import { createRenderer } from "./blackhole/renderer";

export function BlackHoleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof navigator === "undefined" || !("gpu" in navigator))
      return;

    let cancelled = false;
    const renderer = createRenderer({ canvas });
    renderer.ready
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      renderer.dispose();
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className={`block h-full w-full touch-none transition-opacity duration-700 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
    </div>
  );
}

export default BlackHoleBackground;
