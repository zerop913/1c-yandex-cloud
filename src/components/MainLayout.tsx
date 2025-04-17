"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";
import MobileNavigation from "./MobileNavigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  DocumentTextIcon as DocumentIcon,
  BookOpenIcon as BookIcon,
  ChartBarIcon as ChartIcon,
  HomeIcon,
  AdjustmentsHorizontalIcon,
  CodeBracketIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [pathname, setPathname] = useState(""); // Инициализируем пустым значением
  const [mounted, setMounted] = useState(false);

  // Определяем, является ли устройство мобильным и устанавливаем текущий путь только на клиенте
  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);

      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };

      // Проверяем при монтировании
      checkIfMobile();

      // Проверяем при изменении размера окна
      window.addEventListener("resize", checkIfMobile);
      return () => window.removeEventListener("resize", checkIfMobile);
    }
  }, []);

  // Закрываем сайдбар при нажатии на Esc
  useEffect(() => {
    if (!mounted) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [mounted]);

  // Блокировка скролла при открытом сайдбаре на мобильном
  useEffect(() => {
    if (!mounted) return;

    if (sidebarOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen, isMobile, mounted]);

  // Если компонент не смонтирован, возвращаем разметку-заполнитель идентичную серверной версии
  if (!mounted) {
    return (
      <div className="flex min-h-screen flex-col">
        <div className="md:hidden h-14"></div>
        <div className="flex flex-1 flex-col md:flex-row">
          <div className="hidden md:block">
            {/* Заполнитель для сайдбара */}
            <div className="fixed inset-y-0 left-0 z-40 w-72"></div>
          </div>
          <div className="flex-1 md:ml-72">
            <main className="px-4 pb-24 md:py-8 md:px-8 max-w-7xl mx-auto">
              {children}
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Мобильный хедер с закругленными углами */}
      <MobileHeader
        onOpenSidebar={() => setSidebarOpen(!sidebarOpen)}
        isOpen={sidebarOpen}
      />

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Десктопный сайдбар - не изменяется */}
        <div className="hidden md:block">
          <Sidebar isOpen={false} onClose={() => {}} />
        </div>

        {/* Основной контент с отступом для десктопного сайдбара */}
        <div className="flex-1 md:ml-72">
          {/* Раскрывающееся меню для мобильной версии */}
          <AnimatePresence>
            {sidebarOpen && isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-40 flex flex-col"
                onClick={() => setSidebarOpen(false)}
              >
                {/* Градиентный размытый фон */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gradient-to-b from-background/95 to-background/90 backdrop-blur-md"
                />

                {/* Контент меню */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="relative z-10 flex-1 pt-24 px-6 pb-24 flex flex-col"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Группы меню с анимированным появлением */}
                  <div className="space-y-6">
                    <MenuGroup title="Навигация" delay={0}>
                      <MenuItem
                        href="/"
                        icon="home"
                        current={pathname === "/"}
                        onClick={() => setSidebarOpen(false)}
                        delay={0.1}
                      >
                        Главная
                      </MenuItem>
                      <MenuItem
                        href="/setup"
                        icon="setup"
                        current={pathname === "/setup"}
                        onClick={() => setSidebarOpen(false)}
                        delay={0.15}
                        badge="Старт"
                      >
                        Настройка
                      </MenuItem>
                    </MenuGroup>

                    <MenuGroup title="Интеграция" delay={0.2}>
                      <MenuItem
                        href="/integration"
                        icon="code"
                        current={pathname === "/integration"}
                        onClick={() => setSidebarOpen(false)}
                        delay={0.25}
                      >
                        Подключение
                      </MenuItem>
                      <MenuItem
                        href="/tokens"
                        icon="key"
                        current={pathname === "/tokens"}
                        onClick={() => setSidebarOpen(false)}
                        delay={0.3}
                      >
                        API Токены
                      </MenuItem>
                    </MenuGroup>

                    <MenuGroup title="Информация" delay={0.35}>
                      <MenuItem
                        href="/docs"
                        icon="docs"
                        current={pathname === "/docs"}
                        onClick={() => setSidebarOpen(false)}
                        delay={0.4}
                      >
                        Документация
                      </MenuItem>
                      <MenuItem
                        href="/guide"
                        icon="guide"
                        current={pathname === "/guide"}
                        onClick={() => setSidebarOpen(false)}
                        delay={0.45}
                      >
                        Руководство
                      </MenuItem>
                      <MenuItem
                        href="/stats"
                        icon="stats"
                        current={pathname === "/stats"}
                        onClick={() => setSidebarOpen(false)}
                        delay={0.5}
                        badge="Новое"
                      >
                        Статистика
                      </MenuItem>
                    </MenuGroup>
                  </div>

                  {/* Информация о версии */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-auto pt-6 text-center text-xs text-muted-foreground"
                  >
                    Версия 1.0 • 1C+YandexGPT
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Основной контент */}
          <main
            className={cn(
              "px-4 pb-24 md:py-8 md:px-8 max-w-7xl mx-auto",
              sidebarOpen && isMobile && "blur-sm transition-all duration-300"
            )}
          >
            {children}
          </main>

          {/* Нижняя навигация для мобильных */}
          {isMobile && <MobileNavigation />}
        </div>
      </div>
    </div>
  );
}

// Вспомогательные компоненты для мобильного меню

interface MenuGroupProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
}

function MenuGroup({ title, children, delay = 0 }: MenuGroupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {title}
      </div>
      <div className="space-y-1">{children}</div>
    </motion.div>
  );
}

interface MenuItemProps {
  href: string;
  icon: string;
  current: boolean;
  onClick: () => void;
  children: React.ReactNode;
  delay?: number;
  badge?: string;
}

function MenuItem({
  href,
  icon,
  current,
  onClick,
  children,
  delay = 0,
  badge,
}: MenuItemProps) {
  // Иконки для пунктов меню
  const getIcon = () => {
    switch (icon) {
      case "home":
        return <HomeIcon className="h-5 w-5" />;
      case "setup":
        return <AdjustmentsHorizontalIcon className="h-5 w-5" />;
      case "code":
        return <CodeBracketIcon className="h-5 w-5" />;
      case "key":
        return <KeyIcon className="h-5 w-5" />;
      case "docs":
        return <DocumentIcon className="h-5 w-5" />;
      case "guide":
        return <BookIcon className="h-5 w-5" />;
      case "stats":
        return <ChartIcon className="h-5 w-5" />;
      default:
        return <HomeIcon className="h-5 w-5" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
    >
      <Link
        href={href}
        className={cn(
          "flex items-center px-3 py-3 rounded-xl transition-colors",
          current
            ? "bg-gradient-to-r from-primary/20 to-accent-foreground/10 text-primary font-medium"
            : "text-foreground hover:bg-muted"
        )}
        onClick={onClick}
      >
        <span
          className={cn(
            "mr-3",
            current ? "text-primary" : "text-muted-foreground"
          )}
        >
          {getIcon()}
        </span>
        <span className="flex-1">{children}</span>
        {badge && (
          <span
            className={cn(
              "text-xs py-0.5 px-2 rounded-full",
              badge === "Новое"
                ? "bg-primary/10 text-primary"
                : "bg-accent/70 text-accent-foreground"
            )}
          >
            {badge}
          </span>
        )}
      </Link>
    </motion.div>
  );
}
