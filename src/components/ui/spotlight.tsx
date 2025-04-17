"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function Spotlight({
  children,
  className = "",
  fill = "white",
}: {
  children?: React.ReactNode;
  className?: string;
  fill?: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [autoMoving, setAutoMoving] = useState(true);
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Устанавливаем ограничение на передвижение при наведении
    const handleMouseEnter = () => {
      setAutoMoving(false);
    };

    const handleMouseLeave = () => {
      setAutoMoving(true);
    };

    if (divRef.current) {
      divRef.current.addEventListener("mouseenter", handleMouseEnter);
      divRef.current.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (divRef.current) {
        divRef.current.removeEventListener("mouseenter", handleMouseEnter);
        divRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  // Более плавное автономное движение
  useEffect(() => {
    if (!mounted || !autoMoving) return;

    // Используем requestAnimationFrame для более плавной анимации
    let animationId: number;
    let lastTime = 0;
    const speed = 0.05; // Снижаем скорость для более плавного движения

    const animate = (time: number) => {
      if (!lastTime) lastTime = time;
      const deltaTime = time - lastTime;
      lastTime = time;

      // Плавное изменение позиции с меньшей амплитудой
      positionRef.current.x += Math.sin(time * 0.0005) * speed * deltaTime;
      positionRef.current.y += Math.cos(time * 0.0005) * speed * deltaTime;

      setPosition({
        x: positionRef.current.x,
        y: positionRef.current.y,
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [mounted, autoMoving]);

  if (!mounted) {
    return (
      <div
        className={`fixed inset-0 pointer-events-none spotlight ${className}`}
      />
    );
  }

  return (
    <div
      ref={divRef}
      className={`fixed inset-0 overflow-hidden pointer-events-none spotlight ${className}`}
      style={{ zIndex: 0 }}
    >
      {windowDimensions.width > 0 && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{
            x: position.x,
            y: position.y,
          }}
          transition={{
            type: "spring",
            damping: 80, // Увеличиваем затухание
            stiffness: 10, // Уменьшаем жесткость
            mass: 2,
          }}
        >
          <svg width="100%" height="100%">
            <defs>
              <radialGradient
                id="spotlight-gradient"
                cx="50%"
                cy="50%"
                r="100%"
                fx="50%"
                fy="50%"
              >
                <stop offset="0%" stopColor={fill} stopOpacity="0.3" />{" "}
                {/* Уменьшаем непрозрачность */}
                <stop offset="40%" stopColor={fill} stopOpacity="0.15" />
                <stop offset="70%" stopColor={fill} stopOpacity="0.05" />
                <stop offset="100%" stopColor={fill} stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect
              x="0"
              y="0"
              width="200%"
              height="200%"
              fill="url(#spotlight-gradient)"
              transform="translate(-25%, -25%)"
            />
          </svg>
        </motion.div>
      )}
      {children}
    </div>
  );
}
