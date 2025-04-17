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

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Автономное плавное перемещение градиента
    const interval = setInterval(() => {
      const maxX = windowDimensions.width / 3;
      const maxY = windowDimensions.height / 3;

      // Расчёт новой позиции с плавным перемещением
      setPosition((prevPosition) => ({
        x: prevPosition.x + (Math.random() * 2 - 1) * 2,
        y: prevPosition.y + (Math.random() * 2 - 1) * 2,
      }));
    }, 50);

    // Периодическое изменение целевой точки движения
    const targetInterval = setInterval(() => {
      const maxX = windowDimensions.width / 2;
      const maxY = windowDimensions.height / 2;

      setPosition({
        x: (Math.random() - 0.5) * maxX,
        y: (Math.random() - 0.5) * maxY,
      });
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(targetInterval);
    };
  }, [windowDimensions, mounted]);

  if (!mounted) {
    return <div className={`fixed inset-0 pointer-events-none ${className}`} />;
  }

  return (
    <div
      ref={divRef}
      className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}
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
            damping: 100,
            stiffness: 20,
            mass: 3,
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
                <stop offset="0%" stopColor={fill} stopOpacity="0.4" />
                <stop offset="40%" stopColor={fill} stopOpacity="0.2" />
                <stop offset="70%" stopColor={fill} stopOpacity="0.1" />
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
