"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarProps {
  language: string;
  sections: string[];
}

export function Sidebar({ language, sections }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border p-6 h-screen overflow-y-auto sticky top-0">
      <nav className="space-y-2">
        <h2 className="font-semibold text-lg mb-4 capitalize">{language}</h2>
        {sections.map((section) => {
          const href = `/learn/${language}/${section}`;
          const isActive = pathname === href;
          return (
            <Link
              key={section}
              href={href}
              className={cn(
                "block px-3 py-2 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {section.replace(/-/g, " ")}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

