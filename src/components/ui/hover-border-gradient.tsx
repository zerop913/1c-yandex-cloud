"use client";

import { HTMLAttributes, forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

type HoverBorderGradientProps = {
  containerClassName?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  from?: string;
  to?: string;
  animateProps?: any;
  width?: number;
  href?: string; // добавляем пропс для ссылок
  [key: string]: any; // разрешаем дополнительные пропсы
} & HTMLAttributes<HTMLDivElement>;

export const HoverBorderGradient = forwardRef<
  HTMLDivElement,
  HoverBorderGradientProps
>(
  (
    {
      containerClassName,
      className,
      as: Tag = "div",
      from = "from-primary",
      to = "to-accent-foreground",
      width = 2,
      children,
      animateProps,
      href,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);

    // Создаем объект пропсов, который включает href только если он указан
    const allProps = {
      ...props,
      ...(href ? { href } : {}),
      className: cn(
        "relative rounded-full p-[1px] overflow-hidden",
        containerClassName
      ),
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      ref,
    };

    return (
      <Tag {...allProps}>
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              {...animateProps}
              className={cn(
                "absolute inset-0 z-10 rounded-full opacity-70",
                `bg-gradient-to-r ${from} ${to}`
              )}
            />
          )}
        </AnimatePresence>
        <div className={cn("relative z-20", className)}>{children}</div>
      </Tag>
    );
  }
);

// Добавляем displayName для forwardRef
HoverBorderGradient.displayName = "HoverBorderGradient";
