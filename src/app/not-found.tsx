"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export default function NotFoundPage() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Управление подсветкой кнопок
  const [activeButton, setActiveButton] = useState<string | null>(null);

  // Монтирование компонента
  useEffect(() => {
    setMounted(true);
  }, []);

  // Обработка движения мыши для интерактивных эффектов
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  // Пока не монтировано, отображаем простой контейнер с такой же структурой
  if (!mounted) {
    return (
      <div className="min-h-screen max-h-screen flex items-center justify-center relative overflow-hidden pt-1 md:pt-0">
        <div className="w-full max-w-3xl px-4 relative z-10">
          <div className="bg-background/60 backdrop-blur-lg rounded-3xl border border-border/50 p-8 md:p-12 shadow-lg">
            <div className="flex flex-col items-center">
              <div className="h-24 w-full flex items-center justify-center mb-8"></div>
              <div className="h-10 w-3/4 mb-3"></div>
              <div className="h-20 w-4/5 mb-8"></div>
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs mx-auto">
                <div className="h-11 w-full rounded-lg border border-border"></div>
                <div className="h-11 w-full rounded-lg border border-border"></div>
              </div>
              <div className="mt-10 pt-5 text-xs text-center text-muted-foreground border-t border-border/50 w-full">
                Версия 1.0 • Интеграция 1С и YandexGPT
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen max-h-screen flex items-center justify-center relative overflow-hidden pt-1 md:pt-0"
    >
      {/* Фоновая сетка */}
      <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] opacity-[0.15]">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`grid-col-${i}`}
            className="border-r border-border h-full"
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`grid-row-${i}`}
            className="border-b border-border w-full"
          />
        ))}
      </div>

      {/* Декоративные градиенты */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl opacity-20" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-accent-foreground/20 blur-3xl opacity-20" />
      </div>

      {/* Контейнер с содержимым */}
      <div className="w-full max-w-3xl px-4 relative z-10">
        <div className="bg-background/60 backdrop-blur-lg rounded-3xl border border-border/50 p-8 md:p-12 shadow-lg">
          <div className="flex flex-col items-center">
            {/* Анимированный 404 - улучшенная видимость */}
            <motion.div
              className="relative flex items-center justify-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="flex items-center">
                {["4", "logo", "4"].map((digit, index) => (
                  <motion.div
                    key={`digit-${index}`}
                    className="relative"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2 + index * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                    whileHover={{
                      scale: 1.05,
                      transition: { type: "spring", stiffness: 400 },
                    }}
                  >
                    {digit === "logo" ? (
                      <motion.div
                        className="flex items-center justify-center mx-2 md:mx-4"
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          repeatType: "loop",
                          ease: "linear",
                        }}
                      >
                        <div className="relative h-16 w-16 md:h-24 md:w-24 lg:h-32 lg:w-32">
                          <Image
                            src="/Yandex_icon.svg"
                            alt="Яндекс"
                            fill
                            className="object-contain brightness-90"
                          />
                        </div>
                      </motion.div>
                    ) : (
                      <span className="text-8xl md:text-9xl font-bold px-1 relative z-10 text-primary">
                        {digit}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Плавно появляющаяся линия */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="absolute -bottom-4 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
              />
            </motion.div>

            {/* Заголовок и текст */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-2xl md:text-3xl font-semibold mb-3 text-center"
            >
              Страница не найдена
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-muted-foreground text-center mb-8 max-w-md"
            >
              К сожалению, запрашиваемая страница не существует или была
              перемещена. Пожалуйста, проверьте URL или вернитесь на главную.
            </motion.p>

            {/* Кнопки навигации */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4 w-full max-w-xs mx-auto"
            >
              <NavButton
                href="/"
                label="На главную"
                isActive={activeButton === "home"}
                onMouseEnter={() => setActiveButton("home")}
                onMouseLeave={() => setActiveButton(null)}
              />

              <NavButton
                onClick={() => window.history.back()}
                label="Вернуться назад"
                isActive={activeButton === "back"}
                onMouseEnter={() => setActiveButton("back")}
                onMouseLeave={() => setActiveButton(null)}
              />
            </motion.div>
          </div>

          {/* Информация о версии */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="mt-10 pt-5 text-xs text-center text-muted-foreground border-t border-border/50"
          >
            Версия 1.0 • Интеграция 1С и YandexGPT
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Компонент кнопки навигации
interface NavButtonProps {
  href?: string;
  onClick?: () => void;
  label: string;
  primary?: boolean;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function NavButton({
  href,
  onClick,
  label,
  primary = false,
  isActive,
  onMouseEnter,
  onMouseLeave,
}: NavButtonProps) {
  const buttonContent = (
    <motion.div
      className={cn(
        "relative w-full h-11 rounded-lg overflow-hidden flex items-center justify-center",
        primary
          ? "text-white bg-primary"
          : "border border-border text-foreground"
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Фон кнопки */}
      <div className="absolute inset-0">
        {primary ? (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary to-primary/90"
            initial={false}
            animate={{
              backgroundPosition: isActive
                ? ["0% 0%", "100% 0%", "0% 0%"]
                : "0% 0%",
            }}
            transition={{ duration: 2.5 }}
            style={{ backgroundSize: "200% 100%" }}
          />
        ) : (
          <div className="absolute inset-0 bg-card" />
        )}
      </div>

      {/* Эффект свечения при наведении */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 0.5, x: "100%" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      )}

      {/* Текст кнопки */}
      <span className="relative z-10 font-medium text-sm">{label}</span>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="w-full">
        {buttonContent}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className="w-full">
      {buttonContent}
    </button>
  );
}
