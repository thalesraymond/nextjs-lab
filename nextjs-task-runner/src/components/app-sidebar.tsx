"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Workflow, LayoutDashboard, Zap } from "lucide-react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ModeToggle } from "@/components/mode-toggle";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function AppSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/workflow", label: "Workflow", icon: Workflow },
    { href: "/performance-showcase", label: "Performance ShowCase", icon: Zap },
  ];

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
      <div className="p-4 flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800">
        <LayoutDashboard className="h-6 w-6 text-zinc-900 dark:text-zinc-50" />
        <span className="font-bold text-lg text-zinc-900 dark:text-zinc-50">Task Runner</span>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
                <Link
                key={link.href}
                href={link.href}
                className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium",
                    isActive
                    ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900"
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                )}
                >
                <Icon className="h-4 w-4" />
                {link.label}
                </Link>
            );
        })}
      </nav>
      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <div className="text-xs text-zinc-500">
            OpenSpec Lab
        </div>
        <ModeToggle />
      </div>
    </div>
  );
}
