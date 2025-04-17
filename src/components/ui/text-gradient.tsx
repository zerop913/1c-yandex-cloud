import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextGradientProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function TextGradient({
  children,
  className,
  ...props
}: TextGradientProps) {
  return (
    <div
      className={cn(
        "bg-gradient-to-r from-primary to-accent-foreground text-transparent bg-clip-text",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
