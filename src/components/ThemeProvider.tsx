"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Определяем типы более точно
type Attribute = "class" | "data-theme" | "data-mode";

interface ThemeProviderProps {
  children?: React.ReactNode;
  defaultTheme?: string;
  forcedTheme?: string;
  themes?: string[];
  attribute?: Attribute | Attribute[];
  value?: Record<string, any>;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  enableColorScheme?: boolean;
  storageKey?: string;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
