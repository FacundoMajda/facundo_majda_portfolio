import { useEffect, useRef, useState } from "react";
import { createRenderer } from "./flare/renderer";

export function FlareLogo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof navigator === "undefined" || !("gpu" in navigator)) {
      setSupported(false);
      return;
    }

    const renderer = createRenderer({ canvas });
    renderer.ready.catch(() => setSupported(false));

    return () => renderer.dispose();
  }, []);

  const radialFade = {
    maskImage: "radial-gradient(circle, black 40%, transparent 72%)",
    WebkitMaskImage: "radial-gradient(circle, black 40%, transparent 72%)",
  };

  return (
    <div className="relative h-32 w-32 md:h-40 md:w-40" style={radialFade}>
      {supported ? (
        <canvas ref={canvasRef} className="block h-full w-full touch-none" />
      ) : (
        <span className="flex h-full w-full items-center justify-center font-anton text-3xl text-white">
          F
        </span>
      )}
    </div>
  );
}

export default FlareLogo;
