"use client";

import React from "react";
import { motion } from "framer-motion";
import { AnimatedButton } from "@/components/ui/animated-button";
import { FaArrowRight } from "react-icons/fa";

export function CallToAction() {
  return (
    <section className="py-16 bg-card/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Заголовок */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-4">
              Готовы автоматизировать создание описаний?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Интеграция 1С и ЯндексGPT повысит эффективность вашего бизнеса
            </p>

            {/* Кнопка в стиле главной кнопки интеграции */}
            <AnimatedButton
              href="/setup"
              variant="primary"
              icon={<FaArrowRight className="h-5 w-5" />}
              className="px-8 py-4 text-base font-semibold tracking-wide"
            >
              Начать интеграцию
            </AnimatedButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
