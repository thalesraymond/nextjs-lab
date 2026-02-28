"use client";

import { CopyIcon, CheckIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

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

  return (
    <button
      onClick={handleCopy}
      title={title}
      className={cn("p-1.5 hover:bg-white/10 rounded-md transition-colors inline-flex items-center justify-center", className)}
      aria-label={title}
    >
      {copied ? <CheckIcon size={14} className="text-green-500" /> : <CopyIcon size={14} className="text-muted-foreground hover:text-white transition-colors" />}
    </button>
  );
}