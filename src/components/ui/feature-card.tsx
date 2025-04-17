"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ContentFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  items?: string[];
  imageComponent?: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "accent";
}

export function ContentFeatureCard({
  icon,
  title,
  description,
  items = [],
  imageComponent,
  className = "",
  variant = "primary",
}: ContentFeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Обновляем размеры компонента при маунте и изменении размера окна
  useEffect(() => {
    const updateDimensions = () => {
      if (cardRef.current) {
        const { width, height } = cardRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // Отслеживаем движение мыши относительно карточки
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    }
  };

  // Получаем стили для градиента в зависимости от варианта
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          background: "from-primary/20 to-accent-foreground/5",
          border: "border-primary/20",
          icon: "bg-primary/10 text-primary",
          highlight: "bg-gradient-to-r from-primary/30 to-accent-foreground/20",
        };
      case "secondary":
        return {
          background: "to-primary/5",
          border: "border-blue-500/20",
          icon: "bg-blue-500/10 text-blue-500",
          highlight: "bg-gradient-to-r from-blue-500/30 to-primary/20",
        };
      case "accent":
        return {
          background: "from-accent-foreground/20 to-primary/5",
          border: "border-accent-foreground/20",
          icon: "bg-accent-foreground/10 text-accent-foreground",
          highlight: "bg-gradient-to-r from-accent-foreground/30 to-primary/20",
        };
      default:
        return {
          background: "from-primary/20 to-accent-foreground/5",
          border: "border-primary/20",
          icon: "bg-primary/10 text-primary",
          highlight: "bg-gradient-to-r from-primary/30 to-accent-foreground/20",
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-2xl border transition-all",
        variantStyles.border,
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Задний фон с градиентом */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-50",
          variantStyles.background
        )}
      />

      {/* Следующий за мышью блик */}
      {isHovered && dimensions.width > 0 && (
        <motion.div
          className="absolute w-40 h-40 rounded-full opacity-50 blur-xl pointer-events-none"
          animate={{
            x: mousePosition.x - 80,
            y: mousePosition.y - 80,
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 15,
            mass: 0.1,
          }}
          style={{
            background: "var(--primary)",
          }}
        />
      )}

      {/* Основное содержимое */}
      <div className="relative p-6 md:p-8 z-10 backdrop-blur-sm bg-card/70 h-full flex flex-col">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Левая колонка с текстом */}
          <div className="flex-1">
            <div
              className={cn(
                "h-12 w-12 rounded-xl flex items-center justify-center mb-6",
                variantStyles.icon
              )}
            >
              <div className="text-2xl">{icon}</div>
            </div>

            <motion.h3
              className="text-2xl font-bold mb-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {title}
            </motion.h3>

            <motion.p
              className="text-muted-foreground mb-6 leading-relaxed"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {description}
            </motion.p>

            {/* Список элементов */}
            {items && items.length > 0 && (
              <ul className="space-y-3">
                {items.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.3 + i * 0.1,
                    }}
                  >
                    <span
                      className={cn(
                        "h-5 w-5 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0",
                        variantStyles.icon
                      )}
                    >
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>

          {/* Правая колонка с интерактивным компонентом */}
          {imageComponent && (
            <motion.div
              className="lg:w-1/2 h-64 lg:h-auto relative rounded-xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="w-full h-full">{imageComponent}</div>

              {/* Декоративные элементы вокруг imageComponent */}
              <div
                className={cn(
                  "absolute -bottom-4 -right-4 w-20 h-20 rounded-full blur-xl opacity-60",
                  variantStyles.highlight
                )}
              />
              <div
                className={cn(
                  "absolute -top-4 -left-4 w-16 h-16 rounded-full blur-xl opacity-40",
                  variantStyles.highlight
                )}
              />
            </motion.div>
          )}
        </div>

        {/* Нижний градиентный бордер */}
        <motion.div
          className={cn(
            "absolute bottom-0 left-0 h-1 w-0",
            variantStyles.highlight
          )}
          animate={{
            width: isHovered ? "100%" : "0%",
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
}
