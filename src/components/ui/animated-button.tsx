"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface AnimatedButtonProps {
  href: string;
  variant: "primary" | "secondary" | "outline";
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  scrollTo?: boolean;
}

export function AnimatedButton({
  href,
  variant = "primary",
  children,
  className,
  icon,
  iconPosition = "right",
  scrollTo = false,
}: AnimatedButtonProps) {
  const { theme } = useTheme();
  const isLightTheme = theme === "light";

  // Определяем стили в зависимости от варианта
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-r from-rose-600 via-primary to-amber-500 shadow-lg shadow-primary/20 dark:shadow-primary/10 border border-primary/30 text-white font-semibold";
      case "secondary":
        // Белая с черной окантовкой на светлой теме, черная с белой окантовкой на темной
        return isLightTheme
          ? "bg-white border border-gray-800 hover:bg-gray-100 text-gray-800 font-medium"
          : "bg-gray-900 border border-gray-200 hover:bg-gray-800 text-gray-100 font-medium";
      case "outline":
        return "bg-transparent border border-primary/50 text-primary hover:bg-primary/5";
      default:
        return "bg-primary text-white";
    }
  };

  // Обработчик клика для плавного скролла
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!scrollTo || !href.startsWith("#")) return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 100,
      behavior: "smooth",
    });

    // Обновляем URL без перезагрузки страницы
    window.history.pushState(null, "", href);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        "relative group overflow-hidden rounded-full px-7 py-3.5 inline-flex items-center justify-center font-medium transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
        getVariantStyles(),
        className
      )}
    >
      <motion.span
        className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/10 via-white/30 to-white/10"
        style={{ rotate: -35, scale: 1.5, opacity: 0, x: -100 }}
        animate={{ x: 200, opacity: [0, 0.1, 0] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 2.5,
          delay: 0.5,
        }}
      />

      {icon && iconPosition === "left" && (
        <span className="mr-2.5 relative z-10 text-current">{icon}</span>
      )}

      <span className="relative z-10 tracking-wide">{children}</span>

      {icon && iconPosition === "right" && (
        <motion.span
          className="ml-2.5 relative z-10 text-current"
          animate={{ x: [0, 5, 0] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 1.5,
            repeatDelay: 2,
          }}
        >
          {icon}
        </motion.span>
      )}

      {variant === "primary" && (
        <motion.span
          className="absolute inset-0 bg-gradient-to-br from-rose-500 via-primary to-amber-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  );
}
