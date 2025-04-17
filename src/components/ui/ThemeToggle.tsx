"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  // Защита от гидратации
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDarkMode = () => {
    if (isChanging) return;

    setIsChanging(true);
    setTheme(theme === "dark" ? "light" : "dark");

    // Задержка чтобы дать завершиться анимации
    setTimeout(() => {
      setIsChanging(false);
    }, 300);
  };

  if (!mounted) {
    return (
      <div className="w-10 h-10 flex items-center justify-center">
        <div className="w-5 h-5 rounded-full bg-muted animate-pulse"></div>
      </div>
    );
  }

  return (
    <button
      onClick={toggleDarkMode}
      disabled={isChanging}
      className={`w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center relative overflow-hidden transition-colors cursor-pointer ${
        isChanging ? "pointer-events-none" : ""
      }`}
      aria-label={
        theme === "dark"
          ? "Переключиться на светлую тему"
          : "Переключиться на тёмную тему"
      }
    >
      <AnimatePresence mode="wait">
        {theme === "dark" ? (
          <motion.div
            key="sun"
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 180, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <SunIcon className="h-5 w-5 text-amber-400" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ scale: 0, rotate: 180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: -180, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <MoonIcon className="h-5 w-5 text-muted-foreground" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Эффект ripple при клике */}
      <span className="absolute inset-0 rounded-full hover:bg-muted/30 transition-colors"></span>
    </button>
  );
}
