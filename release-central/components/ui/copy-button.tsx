"use client";

import { CopyIcon, CheckIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CopyButtonProps {
  text: string;
  className?: string;
  title?: string;
}

export function CopyButton({ text, className, title = "Copy to clipboard" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentTitle = copied ? "Copied!" : title;

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleCopy}
            className={cn("p-1.5 hover:bg-white/10 rounded-md transition-colors inline-flex items-center justify-center focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-hidden", className)}
            aria-label={currentTitle}
          >
            {copied ? <CheckIcon size={14} className="text-green-500" /> : <CopyIcon size={14} className="text-muted-foreground hover:text-white transition-colors" />}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{currentTitle}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}