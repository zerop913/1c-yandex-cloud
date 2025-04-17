"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BsCheck2Circle, BsLightningChargeFill } from "react-icons/bs";
import { useTheme } from "next-themes";

export default function DashboardPreview() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();

  // Устанавливаем флаг монтирования и отслеживаем движение мыши только после монтирования компонента
  useEffect(() => {
    setIsMounted(true);

    function handleMouseMove(e: MouseEvent) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Вычисляем трансформацию только на стороне клиента
  const getTransformStyle = () => {
    if (!isMounted) return {};

    const rotateY =
      (mousePosition.x -
        (typeof window !== "undefined" ? window.innerWidth : 0) / 2) /
      100;
    const rotateX =
      -(
        mousePosition.y -
        (typeof window !== "undefined" ? window.innerHeight : 0) / 2
      ) / 100;

    return {
      transform: `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
      transition: "transform 0.2s ease-out",
    };
  };

  // Защита от рендеринга с window на сервере
  const transformStyle = getTransformStyle();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative mx-auto hidden md:block"
    >
      <div
        className="relative rounded-3xl border border-border p-4 shadow-xl bg-white/20 dark:bg-zinc-900/40 backdrop-blur-sm transform-gpu"
        style={transformStyle}
      >
        <div className="flex flex-col space-y-4">
          {/* Панель управления в стиле 1С */}
          <div className="bg-card dark:bg-zinc-900 rounded-t-lg border border-border overflow-hidden">
            <div className="flex items-center justify-between p-2 bg-muted dark:bg-zinc-800 border-b border-border">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs font-medium">
                1С:Предприятие - Справочник.Номенклатура
              </div>
              <div className="w-16"></div>
            </div>

            {/* Верхняя панель с кнопками */}
            <div className="flex items-center p-2 bg-card dark:bg-zinc-900 border-b border-border overflow-x-auto">
              {[
                "Создать",
                "Изменить",
                "Копировать",
                "ГенерироватьОписание",
              ].map((btn, i) => (
                <motion.button
                  key={btn}
                  className={`px-3 py-1.5 text-xs rounded-md mr-2 transition-colors ${
                    btn === "ГенерироватьОписание"
                      ? "bg-primary text-primary-foreground font-medium"
                      : "bg-muted dark:bg-zinc-800 hover:bg-accent dark:hover:bg-zinc-700 text-foreground"
                  }`}
                  whileTap={{ scale: 0.97 }}
                >
                  {btn}
                </motion.button>
              ))}
            </div>

            {/* Таблица номенклатуры */}
            <div className="p-2">
              <div className="rounded border border-border">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-muted dark:bg-zinc-800">
                      <th className="py-1.5 px-2 text-left font-medium border-b border-r border-border">
                        Код
                      </th>
                      <th className="py-1.5 px-2 text-left font-medium border-b border-r border-border">
                        Наименование
                      </th>
                      <th className="py-1.5 px-2 text-left font-medium border-b border-border">
                        Описание
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        code: "000123",
                        name: "Смартфон Z100",
                        desc: "Сгенерировано AI",
                      },
                      {
                        code: "000124",
                        name: "Ноутбук Traveller X1",
                        desc: "Сгенерировано AI",
                      },
                      {
                        code: "000125",
                        name: "Монитор ViewMax Pro",
                        desc: "В очереди...",
                      },
                      {
                        code: "000126",
                        name: "Клавиатура KBT-500",
                        desc: "В очереди...",
                      },
                    ].map((item, i) => (
                      <motion.tr
                        key={item.code}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className={
                          i % 2 === 0
                            ? "bg-white/50 dark:bg-zinc-900/50"
                            : "dark:bg-zinc-800/30"
                        }
                      >
                        <td className="py-1.5 px-2 border-r border-border">
                          {item.code}
                        </td>
                        <td className="py-1.5 px-2 border-r border-border">
                          {item.name}
                        </td>
                        <td className="py-1.5 px-2">
                          <div className="flex items-center">
                            <span
                              className={
                                item.desc === "В очереди..."
                                  ? "text-muted-foreground"
                                  : "text-green-600 dark:text-green-400"
                              }
                            >
                              {item.desc}
                            </span>
                            {item.desc !== "В очереди..." && (
                              <BsCheck2Circle className="ml-1 text-green-600 dark:text-green-400" />
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Панель с активной генерацией - исправлена для темной темы */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="rounded-lg dark:bg-zinc-800 backdrop-blur-sm p-4 border border-border"
          >
            <div className="flex items-center">
              <div className="rounded-full w-10 h-10 flex items-center justify-center bg-primary/20 dark:bg-primary/10 mr-3">
                <div className="relative h-6 w-6">
                  <Image
                    src="/Yandex_icon.svg"
                    alt="Яндекс"
                    fill
                    className="object-contain dark:brightness-150"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium dark:text-gray-200">
                  YandexGPT создает описание
                </h4>
                <div className="flex items-center justify-between mt-0.5">
                  <div className="text-xs text-muted-foreground dark:text-gray-300">
                    Монитор ViewMax Pro - новый монитор с функцией...
                  </div>
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-xs text-primary font-medium"
                  >
                    генерация
                  </motion.div>
                </div>

                {/* Прогресс бар генерации текста */}
                <div className="w-full h-1.5 bg-muted dark:bg-zinc-700 rounded-full mt-2 overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "65%" }}
                    className="h-full bg-gradient-to-r from-primary to-accent-foreground"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Индикатор статистики и скорости */}
          <div className="flex justify-between items-center p-3 bg-card/80 dark:bg-zinc-800 backdrop-blur-sm rounded-lg border border-border">
            <div className="flex items-center">
              <BsLightningChargeFill className="text-amber-500 mr-2" />
              <span className="text-sm">2 из 4 позиций</span>
            </div>
            <div className="text-sm">
              <span className="font-medium">3.2</span>{" "}
              <span className="text-muted-foreground dark:text-gray-400 text-xs">
                сек/описание
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Плавающие декоративные элементы */}
      <motion.div
        initial={{ opacity: 0, y: -20, x: -30 }}
        animate={{ opacity: 0.9, y: 0, x: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute -left-10 -top-10 w-20 h-20 rounded-full bg-primary/20 blur-xl"
      />
      <motion.div
        initial={{ opacity: 0, y: 20, x: 30 }}
        animate={{ opacity: 0.8, y: 0, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-accent-foreground/20 blur-xl"
      />

      {/* Метадата элемент в правом верхнем углу */}
      <motion.div
        initial={{ opacity: 0, x: 50, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute -right-10 -top-6 bg-card/90 dark:bg-zinc-800 backdrop-blur-md p-3 rounded-lg border border-border shadow-md flex items-center transform rotate-3"
        style={{
          transformOrigin: "right bottom",
          ...(isMounted && typeof window !== "undefined"
            ? {
                transform: `perspective(1000px) 
                      rotateY(${
                        (mousePosition.x - window.innerWidth / 2) / 120
                      }deg) 
                      rotateX(${
                        -(mousePosition.y - window.innerHeight / 2) / 120
                      }deg) 
                      rotate(3deg)`,
              }
            : { transform: "rotate(3deg)" }),
        }}
      >
        <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
          <Image src="/1C-logo.svg" alt="1С" fill className="object-contain" />
        </div>
        <div>
          <h4 className="text-xs font-semibold dark:text-gray-200">База 1С</h4>
          <p className="text-[10px] text-muted-foreground">250+ товаров</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
