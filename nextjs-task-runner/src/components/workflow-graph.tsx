"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

interface WorkflowGraphProps {
  graphDefinition: string;
}

export function WorkflowGraph({ graphDefinition }: WorkflowGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>("");

  useEffect(() => {
    if (graphDefinition && containerRef.current) {
      mermaid.initialize({ 
        startOnLoad: false, 
        theme: 'neutral',
        securityLevel: 'loose',
      });
      
      const renderGraph = async () => {
        try {
          // Generate a unique ID for the SVG
          const id = `mermaid-${Date.now()}`;
          const { svg } = await mermaid.render(id, graphDefinition);
          setSvgContent(svg);
        } catch (error) {
          console.error("Mermaid failed to render", error);
          setSvgContent(`<div class="text-red-500">Failed to render graph</div>`);
        }
      };

      renderGraph();
    }
  }, [graphDefinition]);

  return (
    <div 
      className="w-full overflow-auto bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 min-h-[400px] flex items-center justify-center"
      ref={containerRef}
    >
        {svgContent ? (
            <div dangerouslySetInnerHTML={{ __html: svgContent }} className="w-full h-full flex justify-center" />
        ) : (
            <div className="text-zinc-400 animate-pulse">Rendering workflow...</div>
        )}
    </div>
  );
}
