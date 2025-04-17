"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMovement = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMovement);

    return () => {
      window.removeEventListener("mousemove", handleMouseMovement);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        background:
          "radial-gradient(circle at center, rgba(var(--primary-rgb), 0.08) 0, rgba(var(--primary-rgb), 0) 60%)",
      }}
    >
      <svg className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div
        className="absolute inset-0 filter blur-[32px] opacity-30"
        style={{
          backdropFilter: "blur(32px)",
          background:
            "radial-gradient(circle at center, rgba(var(--primary-rgb)/0.3) 0%, rgba(var(--primary-rgb)/0.1) 100%)",
        }}
      ></div>

      <motion.div
        animate={{
          x: mousePosition.x - 75,
          y: mousePosition.y - 75,
        }}
        transition={{
          type: "spring",
          duration: 0.2,
          stiffness: 100,
          damping: 30,
        }}
        className="hidden md:block absolute w-[150px] h-[150px] rounded-full filter blur-[20px] opacity-50"
        style={{
          background: "var(--primary)",
          mixBlendMode: "soft-light",
        }}
      ></motion.div>

      <motion.div
        animate={{
          x: mousePosition.x - 50,
          y: mousePosition.y - 50,
        }}
        transition={{
          type: "spring",
          duration: 0.4,
          stiffness: 100,
          damping: 30,
        }}
        className="absolute w-[100px] h-[100px] rounded-full filter blur-[20px] opacity-50"
        style={{
          background: "var(--primary)",
          mixBlendMode: "soft-light",
        }}
      ></motion.div>
    </div>
  );
};
