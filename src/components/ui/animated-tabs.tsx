"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  initialTab?: number;
  className?: string;
}

export function AnimatedTabs({
  tabs,
  initialTab = 0,
  className,
}: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [contentHeight, setContentHeight] = useState<number | undefined>(
    undefined
  );
  const [isMobile, setIsMobile] = useState(false);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Инициализируем массив для всех вкладок
  useEffect(() => {
    contentRefs.current = Array(tabs.length).fill(null);
  }, [tabs.length]);

  // Определяем, является ли устройство мобильным
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Вычисляем максимальную высоту всех вкладок
  useEffect(() => {
    // Сбрасываем ограничение высоты, чтобы получить натуральные размеры
    const calculateMaxHeight = () => {
      const heights = contentRefs.current
        .filter(Boolean)
        .map((ref) => ref?.scrollHeight || 0);

      if (heights.length) {
        const maxHeight = Math.max(...heights);
        setContentHeight(maxHeight);
      }
    };

    // Выполняем после рендера, когда все DOM элементы доступны
    calculateMaxHeight();

    // Также пересчитываем при изменении размера окна
    window.addEventListener("resize", calculateMaxHeight);
    return () => window.removeEventListener("resize", calculateMaxHeight);
  }, [tabs]);

  return (
    <div className={cn("w-full", className)}>
      {/* Вкладки */}
      <div className="flex justify-center mb-8 relative">
        <div className="flex items-center gap-2 p-1 rounded-full border border-border bg-muted/50 overflow-hidden">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={cn(
                "relative z-20 px-5 py-2.5 text-sm font-medium text-foreground/60 transition-colors rounded-full",
                activeTab === index
                  ? "text-foreground"
                  : "hover:text-foreground"
              )}
            >
              {tab.label}
              {activeTab === index && (
                <motion.div
                  className="absolute inset-0 bg-background rounded-full shadow-sm"
                  layoutId="active-tab"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Контентная область - на мобильных устройствах высота адаптивная и добавлен больший отступ */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card">
        <div
          className="p-6 pt-8 md:p-8 relative flex flex-col" // Добавлен больший отступ сверху на мобильных
          style={{
            minHeight:
              !isMobile && contentHeight ? `${contentHeight}px` : undefined,
          }}
        >
          {/* Фоновый градиент, меняющийся в зависимости от активной вкладки */}
          <motion.div
            key={`gradient-${activeTab}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 opacity-10 pointer-events-none bg-gradient-to-br"
          />

          {/* Декоративные элементы */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-accent/30 rounded-full blur-3xl opacity-20 pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/30 rounded-full blur-3xl opacity-20 pointer-events-none transform -translate-x-1/2 translate-y-1/2"></div>

          {/* Скрытые контейнеры для измерения высоты - не отображаются, но нужны для измерения */}
          <div className="absolute opacity-0 pointer-events-none">
            {tabs.map((tab, index) => (
              <div
                key={`measure-${index}`}
                ref={(el) => {
                  contentRefs.current[index] = el;
                }}
                className="absolute top-0 left-0 w-full p-6 md:p-8"
              >
                {tab.content}
              </div>
            ))}
          </div>

          {/* Активный контент с анимацией */}
          <AnimatePresence mode="wait">
            <AnimatedTabContent
              key={activeTab}
              content={tabs[activeTab].content}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function AnimatedTabContent({ content }: { content: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="relative z-10 flex-1 flex w-full"
    >
      {content}
    </motion.div>
  );
}
