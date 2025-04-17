"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaIdCard,
  FaArrowLeft,
  FaCopy,
  FaExternalLinkAlt,
  FaTerminal,
  FaInfoCircle,
  FaCheck,
} from "react-icons/fa";
import { Spotlight } from "@/components/ui/spotlight";
import { useTheme } from "next-themes";
import { Alert } from "@/components/ui/alert";
import { AnimatedButton } from "@/components/ui/animated-button";

export default function FolderIdPage() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  // Команда для получения ID каталога
  const folderIdCommand = "yc resource-manager folder get default";

  // Маркер успешного завершения для анимации
  const [completed, setCompleted] = useState<Record<string, boolean>>({
    step1: false,
    step2: false,
    step3: false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopySuccess(label);
        setTimeout(() => setCopySuccess(null), 2000);
      },
      (err) => {
        console.error("Не удалось скопировать текст: ", err);
      }
    );
  };

  const markStepComplete = (step: string) => {
    setCompleted((prev) => ({ ...prev, [step]: true }));
  };

  if (!mounted) {
    return (
      <div className="flex flex-col p-6 h-full">
        <div className="h-10 bg-muted animate-pulse rounded mb-6"></div>
        <div className="h-96 bg-muted/50 animate-pulse rounded"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-8 pb-16">
      {/* Заголовок страницы */}
      <div className="text-center max-w-3xl mx-auto mb-4">
        <div className="inline-flex items-center justify-center p-1 mb-4 rounded-full bg-muted">
          <span className="px-3 py-0.5 text-xs font-medium rounded-full bg-background border border-border shadow-sm">
            Инструкция
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
          Получение ID каталога
        </h1>
        <p className="text-lg text-muted-foreground">
          Подробная инструкция по получению идентификатора каталога
          Яндекс.Облака
        </p>
      </div>

      {/* Навигация назад */}
      <div className="max-w-4xl mx-auto w-full">
        <Link
          href="/tokens"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <FaArrowLeft className="mr-2 h-3 w-3" />
          Вернуться к токенам
        </Link>
      </div>

      {/* Основной контейнер */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl border border-border bg-card shadow-md"
      >
        {theme === "dark" && (
          <Spotlight
            className="-top-40 left-0 md:left-60 opacity-20"
            fill={`hsl(0 100% 50% / 0.1)`}
          />
        )}

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-primary/70 to-primary text-current">
              <FaIdCard size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">
                ID каталога Яндекс.Облака
              </h2>
              <p className="text-muted-foreground text-sm">
                Используется для указания каталога ресурсов в Яндекс.Облаке
              </p>
            </div>
          </div>

          {/* Уведомления */}
          {copySuccess && (
            <Alert
              variant="success"
              title="Скопировано"
              description={`${copySuccess} скопирован в буфер обмена`}
              className="mb-6"
            />
          )}

          {/* Информационный блок */}
          <div className="bg-accent/10 rounded-xl p-4 mb-8 border border-border">
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                <FaInfoCircle className="h-5 w-5 text-primary" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-foreground">
                  О ID каталога
                </h3>
                <div className="mt-2 text-sm text-muted-foreground">
                  <p>
                    Идентификатор каталога (folder ID) в Яндекс.Облаке -
                    уникальный идентификатор, который используется для указания
                    каталога ресурсов при работе с API. Каталог - это контейнер,
                    в котором размещаются ваши ресурсы Яндекс.Облака, такие как
                    виртуальные машины, базы данных и другие сервисы.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Шаги по получению токена */}
          <div className="space-y-8">
            {/* Шаг 1 */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      completed.step1
                        ? "bg-green-100 dark:bg-green-900"
                        : "bg-primary/10"
                    }`}
                  >
                    {completed.step1 ? (
                      <FaCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <span className="text-xl font-semibold text-primary">
                        1
                      </span>
                    )}
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-medium">
                    Убедитесь, что CLI установлен и настроен
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    Перед тем как приступить к получению ID каталога, вам
                    необходимо:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-sm mt-3">
                    <li>
                      Установить интерфейс командной строки Яндекс.Облака (
                      <Link
                        href="/tokens/install"
                        className="text-primary hover:underline"
                      >
                        инструкция по установке
                      </Link>
                      )
                    </li>
                    <li>Выполните команду:</li>
                  </ul>

                  <div className="mt-2 bg-background rounded-md p-3 border border-border/50">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium flex items-center">
                        <FaTerminal className="mr-2 h-4 w-4 text-primary" />
                        Команда CLI
                      </h4>
                      <button
                        onClick={() =>
                          copyToClipboard("yc init", "Команда yc init")
                        }
                        className="inline-flex items-center px-3 py-1.5 text-xs rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      >
                        <FaCopy className="mr-1.5 h-3 w-3" />
                        Копировать
                      </button>
                    </div>
                    <div className="mt-2">
                      <div className="bg-muted p-2 rounded-md font-mono text-xs overflow-x-auto">
                        yc init
                      </div>
                    </div>
                  </div>

                  <ul className="list-disc list-inside space-y-2 text-sm mt-2">
                    <li>Пройдите процесс инициализации</li>
                    <li>Выберите каталог по умолчанию при настройке CLI</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Шаг 2 */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      completed.step2
                        ? "bg-green-100 dark:bg-green-900"
                        : "bg-primary/10"
                    }`}
                  >
                    {completed.step2 ? (
                      <FaCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <span className="text-xl font-semibold text-primary">
                        2
                      </span>
                    )}
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-medium">
                    Выполните команду для получения ID каталога
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    Откройте командную строку (или терминал) и выполните
                    следующую команду:
                  </p>
                  <div className="mt-3 bg-accent/5 p-4 rounded-xl border border-border">
                    <div className="bg-background rounded-md p-3 border border-border/50">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium flex items-center">
                          <FaTerminal className="mr-2 h-4 w-4 text-primary" />
                          Команда для получения ID каталога
                        </h4>
                        <button
                          onClick={() => {
                            copyToClipboard(
                              folderIdCommand,
                              "Команда ID каталога"
                            );
                            markStepComplete("step2");
                          }}
                          className="inline-flex items-center px-3 py-1.5 text-xs rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        >
                          <FaCopy className="mr-1.5 h-3 w-3" />
                          Копировать
                        </button>
                      </div>
                      <div className="mt-2">
                        <div className="bg-muted p-2 rounded-md font-mono text-xs overflow-x-auto">
                          {folderIdCommand}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Шаг 3 */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      completed.step3
                        ? "bg-green-100 dark:bg-green-900"
                        : "bg-primary/10"
                    }`}
                  >
                    {completed.step3 ? (
                      <FaCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <span className="text-xl font-semibold text-primary">
                        3
                      </span>
                    )}
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-medium">
                    Найдите и сохраните ID каталога
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    После выполнения команды вы увидите информацию о каталоге.
                    Найдите строку{" "}
                    <code className="px-1.5 py-0.5 bg-muted rounded text-xs">
                      id: b1g8o9jbt58********
                    </code>{" "}
                    - это и есть ID вашего каталога. Скопируйте его и
                    используйте для интеграции с Яндекс.Облаком.
                  </p>

                  <div className="mt-3 bg-accent/5 p-4 rounded-xl border border-border">
                    <div className="bg-background rounded-md p-3 border border-border/50">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium flex items-center">
                          <FaTerminal className="mr-2 h-4 w-4 text-primary" />
                          Пример вывода команды
                        </h4>
                      </div>
                      <div className="mt-2">
                        <div className="bg-muted p-2 rounded-md font-mono text-xs overflow-x-auto">
                          id: b1grs8tevb7mhcs3gp68
                          <br />
                          cloud_id: b1g159pa15cd********
                          <br />
                          created_at: "2023-01-15T14:30:45.123Z"
                          <br />
                          name: default
                          <br />
                          status: ACTIVE
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 p-3 bg-primary/5 rounded-md border border-primary/10 text-sm">
                      <div className="flex flex-col">
                        <strong>Совет:</strong> Вы также можете проверить
                        текущий ID каталога, выполнив команду:
                      </div>

                      <div className="mt-2 bg-background rounded-md p-3 border border-border/50">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium flex items-center">
                            <FaTerminal className="mr-2 h-4 w-4 text-primary" />
                            Команда CLI
                          </h4>
                          <button
                            onClick={() =>
                              copyToClipboard(
                                "yc config list",
                                "Команда yc config list"
                              )
                            }
                            className="inline-flex items-center px-3 py-1.5 text-xs rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                          >
                            <FaCopy className="mr-1.5 h-3 w-3" />
                            Копировать
                          </button>
                        </div>
                        <div className="mt-2">
                          <div className="bg-muted p-2 rounded-md font-mono text-xs overflow-x-auto">
                            yc config list
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Завершение */}
          <div className="mt-10 pt-6 border-t border-border">
            <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4">
              <Link
                href="/tokens/iam-token"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center"
              >
                <FaArrowLeft className="mr-1.5 h-3 w-3" />
                Назад: IAM токен
              </Link>

              <Link
                href="/tokens"
                className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  Object.values(completed).every((val) => val)
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                Завершить и вернуться
                <FaArrowLeft className="ml-1.5 h-3 w-3 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Ссылки на документацию */}
      <div className="max-w-4xl mx-auto mt-4 p-5 bg-accent/10 rounded-xl border border-border text-sm text-muted-foreground">
        <h3 className="font-medium text-foreground text-base mb-3">
          Дополнительная информация
        </h3>
        <p className="mb-4">
          Подробнее о работе с ресурсами в Яндекс.Облаке вы можете узнать в
          официальной документации:
        </p>
        <a
          href="https://cloud.yandex.ru/docs/resource-manager/operations/folder/get-id"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 rounded-lg bg-background border border-border hover:bg-accent/5 transition-colors"
        >
          <FaExternalLinkAlt className="mr-2 h-3 w-3 text-primary" />
          <span>Документация по работе с каталогами</span>
        </a>
      </div>
    </div>
  );
}
