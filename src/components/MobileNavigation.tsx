"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  HomeIcon,
  AdjustmentsHorizontalIcon,
  CodeBracketIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export default function MobileNavigation() {
  const pathname = usePathname();

  // Основные пункты навигации для мобильной версии
  const navItems = [
    { name: "Главная", href: "/", icon: HomeIcon },
    { name: "Настройка", href: "/setup", icon: AdjustmentsHorizontalIcon },
    { name: "API Токены", href: "/tokens", icon: KeyIcon },
    { name: "Подключение", href: "/integration", icon: CodeBracketIcon },
  ];

  return (
    <div className="md:hidden fixed bottom-6 left-0 right-0 z-40 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-background/80 backdrop-blur-md shadow-lg rounded-2xl border border-border/50 overflow-hidden"
      >
        <div className="h-16 flex items-center justify-around gap-1 p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className="relative flex-1 h-full flex flex-col items-center justify-center rounded-xl transition-colors"
              >
                {isActive && (
                  <motion.div
                    layoutId="navHighlight"
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent-foreground/20 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                <span className="relative flex items-center justify-center">
                  <Icon
                    className={cn(
                      "h-5 w-5 transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}
                  />

                  {/* Активный индикатор */}
                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute -bottom-1.5 h-1 w-1 rounded-full bg-primary"
                    />
                  )}
                </span>

                <span
                  className={cn(
                    "text-[10px] mt-1 transition-colors",
                    isActive
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
