"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  index: number;
}

export default function FeatureCard({
  title,
  description,
  icon,
  index,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group rounded-xl border border-border overflow-hidden"
    >
      {/* Простой фон без градиентов и эффектов */}
      <div className="relative bg-card p-6 h-full">
        {/* Иконка */}
        <div className="inline-flex h-12 w-12 rounded-full bg-accent items-center justify-center mb-5 font-bold text-xl">
          {icon}
        </div>

        {/* Заголовок и описание */}
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}
