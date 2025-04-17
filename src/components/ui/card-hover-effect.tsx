"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export function HoverEffect({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
  className?: string;
}) {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group block p-1"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-primary to-accent-foreground opacity-70 blur-md"
                layoutId="hoverEffect"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 0.8,
                  scale: 1.05,
                  transition: { type: "spring", bounce: 0.25 },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                transition={{
                  type: "spring",
                  bounce: 0.25,
                }}
              />
            )}
          </AnimatePresence>
          <div className="bg-card relative z-20 h-full rounded-xl border border-border p-5 group-hover:border-primary/50 transition-all overflow-hidden">
            <div className="relative z-20">
              <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center mb-5">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
