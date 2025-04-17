"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface LogoProps {
  variant?: "full" | "compact";
  className?: string;
  linkProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
  asLink?: boolean;
}

export function Logo({
  variant = "full",
  className,
  linkProps = {},
  asLink = true,
}: LogoProps) {
  const { theme } = useTheme();

  const logoContent = (
    <div
      className={cn(
        "flex items-center transition-all duration-300 group",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center bg-white/90 dark:bg-zinc-900 border border-border rounded-lg shadow-sm overflow-hidden",
          variant === "full" ? "pl-2.5 pr-2.5 py-1.5" : "p-1.5"
        )}
      >
        {variant === "full" ? (
          <div className="relative h-6 w-[70px]">
            <Image
              src="/Yandex_main.svg"
              alt="Яндекс"
              fill
              className="object-contain"
              priority
            />
          </div>
        ) : (
          <div className="relative h-5 w-5">
            <Image
              src="/Yandex_icon.svg"
              alt="Я"
              fill
              className="object-contain"
              priority
            />
          </div>
        )}

        <div className="h-6 mx-1.5 border-r border-muted"></div>

        {/* Логотип 1С */}
        <div className="relative h-6 w-6">
          <Image
            src="/1C-logo.svg"
            alt="1C"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );

  return asLink ? (
    <Link href="/" {...linkProps}>
      {logoContent}
    </Link>
  ) : (
    logoContent
  );
}
