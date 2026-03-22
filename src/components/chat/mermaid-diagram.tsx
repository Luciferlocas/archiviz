import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { Loader2 } from "lucide-react";

mermaid.initialize({
  startOnLoad: false,
  theme: "base",
  look: "handDrawn",
  securityLevel: "loose",
  fontFamily: "Inter, sans-serif",
});

export default function MermaidDiagram({
  chart,
  id,
}: {
  chart: string;
  id: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const renderDiagram = async () => {
      if (!chart) return;

      setIsRendering(true);
      setError(null);

      try {
        // Clear previous content
        if (ref.current) {
          ref.current.innerHTML = "";
        }

        const { svg } = await mermaid.render(id, chart);

        if (isMounted && ref.current) {
          ref.current.innerHTML = svg;
          setIsRendering(false);
        }
      } catch (e: any) {
        console.error("Mermaid rendering error", e);
        if (isMounted) {
          setError(e.message || "Failed to render diagram");
          setIsRendering(false);
        }
      }
    };

    renderDiagram();

    return () => {
      isMounted = false;
    };
  }, [chart, id]);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {isRendering && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
          <Loader2 className="animate-spin text-stone-400" size={32} />
        </div>
      )}
      {error ? (
        <div className="text-red-500 p-4 border border-red-200 bg-red-50 rounded-xl max-w-lg text-sm font-mono overflow-auto">
          <p className="font-bold mb-2">Diagram Error:</p>
          {error}
        </div>
      ) : (
        <div
          ref={ref}
          className="w-full h-full flex items-center justify-center overflow-auto"
        />
      )}
    </div>
  );
}
