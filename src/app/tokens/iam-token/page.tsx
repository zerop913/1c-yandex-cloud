"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaCog,
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

export default function IAMTokenPage() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  // Команда для получения IAM токена
  const iamTokenCommand = "yc iam create-token";

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
          Получение IAM токена
        </h1>
        <p className="text-lg text-muted-foreground">
          Подробная инструкция по получению IAM токена для Яндекс.Облака
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
              <FaCog size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">IAM токен Яндекс</h2>
              <p className="text-muted-foreground text-sm">
                Используется для аутентификации запросов к API Яндекс.Облака
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
                  О IAM токене
                </h3>
                <div className="mt-2 text-sm text-muted-foreground">
                  <p>
                    IAM токен (Identity and Access Management) - временный ключ
                    доступа, который используется для авторизации в API
                    Яндекс.Облака. В отличие от OAuth токена,
                    <span className="font-medium text-foreground">
                      {" "}
                      IAM токен действителен только 12 часов
                    </span>
                    . После истечения этого срока вам потребуется сгенерировать
                    новый IAM токен.
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
                    Убедитесь, что CLI установлен и OAuth токен настроен
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    Перед тем как приступить к получению IAM токена, вам
                    необходимо:
                  </p>
                  <div className="mt-3 bg-accent/5 p-4 rounded-xl border border-border">
                    <ul className="list-disc list-inside space-y-2 text-sm">
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
                      <li>
                        Настроить OAuth токен в CLI (
                        <Link
                          href="/tokens/oauth-token"
                          className="text-primary hover:underline"
                        >
                          инструкция по получению OAuth токена
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
                            copyToClipboard("yc init", "Команда CLI")
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
                    </ul>
                  </div>
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
                    Выполните команду для получения IAM токена
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
                          Команда для получения IAM токена
                        </h4>
                        <button
                          onClick={() => {
                            copyToClipboard(
                              iamTokenCommand,
                              "Команда IAM токена"
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
                          {iamTokenCommand}
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
                    Сохраните полученный IAM токен
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    После выполнения команды вы получите IAM токен. Скопируйте
                    его и используйте для аутентификации в API Яндекс.Облака. Не
                    забудьте сохранить токен, так как он потребуется для работы
                    с интеграцией.
                  </p>

                  <div className="mt-3 bg-accent/5 p-4 rounded-xl border border-border">
                    <div className="bg-background rounded-md p-3 border border-border/50">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium flex items-center">
                          <FaTerminal className="mr-2 h-4 w-4 text-primary" />
                          Пример IAM токена
                        </h4>
                      </div>
                      <div className="mt-2">
                        <div className="bg-muted p-2 rounded-md font-mono text-xs overflow-x-auto break-all">
                          t1.9euel1zGmhyZip-TnZOYmsqalc_Lyfj_c87Uy...
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 p-3 bg-primary/5 rounded-md border border-primary/10 text-sm">
                      <p>
                        <strong>Важно:</strong> IAM токен действителен в течение
                        12 часов. После истечения этого срока вам нужно будет
                        сгенерировать новый токен.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Следующий шаг */}
          <div className="mt-10 pt-6 border-t border-border">
            <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4">
              <Link
                href="/tokens/oauth-token"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center"
              >
                <FaArrowLeft className="mr-1.5 h-3 w-3" />
                Назад: OAuth токен
              </Link>

              <Link
                href="/tokens/folder-id"
                className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  Object.values(completed).every((val) => val)
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                Следующий шаг: Получение ID каталога
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
          Подробнее о работе с IAM токенами в Яндекс.Облаке вы можете узнать в
          официальной документации:
        </p>
        <a
          href="https://cloud.yandex.ru/docs/iam/concepts/authorization/iam-token"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 rounded-lg bg-background border border-border hover:bg-accent/5 transition-colors"
        >
          <FaExternalLinkAlt className="mr-2 h-3 w-3 text-primary" />
          <span>Документация IAM токен</span>
        </a>
      </div>
    </div>
  );
}
