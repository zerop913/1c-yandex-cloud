"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Logo } from "./ui/Logo";
import ThemeToggle from "./ui/ThemeToggle";
import { useState, useEffect } from "react";

export default function MobileHeader({
  onOpenSidebar,
  isOpen,
}: {
  onOpenSidebar: () => void;
  isOpen: boolean;
}) {
  const [pathname, setPathname] = useState("/");
  const [mounted, setMounted] = useState(false);

  // Защита от гидратации - устанавливаем флаг mounted и получаем pathname только на клиенте
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
    }
  }, []);

  if (!mounted) {
    return (
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 px-4 py-3">
        <div className="bg-background/80 backdrop-blur-xl shadow-sm rounded-2xl border border-border/50 h-14 flex items-center justify-between px-4">
          <Link href="/" className="flex items-center">
            <span className="w-12 h-8"></span>
          </Link>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-24 h-6"></div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-9 h-9"></div>
            <div className="w-9 h-9"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-background/80 backdrop-blur-xl shadow-sm rounded-2xl border border-border/50 h-14 flex items-center justify-between px-4"
      >
        {/* Логотип */}
        <Link href="/" className="flex items-center">
          <Logo variant="compact" asLink={false} />
        </Link>

        {/* Центр - индикатор страницы с плавной анимацией перехода */}
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-medium">
              {getTitleFromPathname(pathname)}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Правая группа */}
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            className="ml-1 w-9 h-9 rounded-full flex items-center justify-center hover:bg-muted/70 active:bg-primary/10 transition-colors"
            onClick={onOpenSidebar}
            aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <XMarkIcon className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Bars3Icon className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.div>
    </header>
  );
}

// Функция для получения заголовка на основе пути
function getTitleFromPathname(pathname: string): string {
  switch (pathname) {
    case "/":
      return "Главная";
    case "/setup":
      return "Настройка";
    case "/integration":
      return "Подключение";
    case "/tokens":
      return "API Токены";
    case "/docs":
      return "Документация";
    case "/guide":
      return "Руководство";
    case "/stats":
      return "Статистика";
    default:
      return "1С+YandexGPT";
  }
}
