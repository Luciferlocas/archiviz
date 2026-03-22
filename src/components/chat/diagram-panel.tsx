"use client";

import { useState } from "react";
import {
  PenTool,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useChat } from "@/store";
import { useIsMobile } from "@/hooks/use-mobile";
import MermaidDiagram from "@/components/chat/mermaid-diagram";
import { Button } from "../ui/button";

export default function DiagramPanel() {
  const { activeDiagram, setActiveDiagram } = useChat();
  const isMobile = useIsMobile();
  const [scale, setScale] = useState(1);

  return (
    <AnimatePresence>
      {activeDiagram && (
        <motion.div
          initial={isMobile ? { x: "100%", opacity: 0 } : { width: 0, opacity: 0 }}
          animate={isMobile ? { x: 0, opacity: 1 } : { width: "50%", opacity: 1 }}
          exit={isMobile ? { x: "100%", opacity: 0 } : { width: 0, opacity: 0 }}
          transition={{ type: "spring", bounce: 0, duration: 0.5 }}
          className={
            isMobile
              ? "fixed inset-0 z-50 bg-stone-950 flex flex-col overflow-hidden shadow-2xl"
              : "h-full bg-stone-950 border-l border-stone-800 flex flex-col overflow-hidden shadow-2xl z-20"
          }
        >
          <TransformWrapper
            initialScale={1}
            minScale={0.2}
            maxScale={4}
            smooth
            centerOnInit
            doubleClick={{ mode: "reset" }}
            wheel={{ step: 0.1 }}
            onTransformed={(_, state) => setScale(state.scale)}
          >
            {({ zoomIn, zoomOut, resetTransform, centerView }) => (
              <>
                <header className="px-5 py-3 border-b border-stone-800 flex md:flex-row flex-col items-center justify-between bg-stone-900/80 backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <PenTool size={18} className="text-stone-400" />
                    <h2 className="text-lg font-semibold text-stone-200">
                      Architecture Diagram
                    </h2>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-stone-400 tabular-nums min-w-[4ch] text-right mr-1">
                      {Math.round(scale * 100)}%
                    </span>
                    <Button
                      onClick={() => zoomIn()}
                      size="icon-sm"
                      variant="ghost"
                      title="Zoom in"
                    >
                      <ZoomIn size={16} />
                    </Button>
                    <Button
                      onClick={() => zoomOut()}
                      size="icon-sm"
                      variant="ghost"
                      title="Zoom out"
                    >
                      <ZoomOut size={16} />
                    </Button>
                    <Button
                      onClick={() => resetTransform()}
                      size="icon-sm"
                      variant="ghost"
                      title="Reset zoom"
                    >
                      <RotateCcw size={16} />
                    </Button>
                    <Button
                      onClick={() => centerView()}
                      size="icon-sm"
                      variant="ghost"
                      title="Fit to view"
                    >
                      <Maximize2 size={16} />
                    </Button>
                    <div className="w-px h-5 bg-stone-700 mx-1" />
                    <Button
                      onClick={() => setActiveDiagram(null)}
                      size="icon-sm"
                      variant="ghost"
                      title="Close panel"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                </header>
                <div className="flex-1 overflow-hidden relative bg-neutral-600/40">
                  <TransformComponent
                    wrapperStyle={{ width: "100%", height: "100%" }}
                    contentStyle={{ width: "100%", height: "100%" }}
                  >
                    <div className="w-full h-full p-8">
                      <MermaidDiagram
                        chart={activeDiagram}
                        id={`mermaid-${Date.now()}`}
                      />
                    </div>
                  </TransformComponent>
                </div>
              </>
            )}
          </TransformWrapper>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
