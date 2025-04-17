"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaTerminal,
  FaArrowLeft,
  FaCopy,
  FaExternalLinkAlt,
  FaInfoCircle,
  FaCheck,
  FaWindows,
  FaApple,
  FaLinux,
} from "react-icons/fa";
import { Spotlight } from "@/components/ui/spotlight";
import { useTheme } from "next-themes";
import { Alert } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedButton } from "@/components/ui/animated-button";

export default function InstallPage() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("windows");

  // Команды для установки
  const installCommands = {
    windows: {
      powershell: `iex (New-Object System.Net.WebClient).DownloadString('https://storage.yandexcloud.net/yandexcloud-yc/install.ps1')`,
      cmd: `@"%SystemRoot%\\System32\\WindowsPowerShell\\v1.0\\powershell.exe" -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://storage.yandexcloud.net/yandexcloud-yc/install.ps1'))" && SET "PATH=%PATH%;%USERPROFILE%\\yandex-cloud\\bin"`,
    },
    linux: `curl -sSL https://storage.yandexcloud.net/yandexcloud-yc/install.sh | bash`,
    mac: `curl -sSL https://storage.yandexcloud.net/yandexcloud-yc/install.sh | bash`,
  };

  // Маркеры прогресса для каждой ОС
  const [completed, setCompleted] = useState({
    windows: {
      step1: false,
      step2: false,
      step3: false,
    },
    linux: {
      step1: false,
      step2: false,
    },
    mac: {
      step1: false,
      step2: false,
      step3: false,
    },
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

  const markStepComplete = (os: string, step: string) => {
    setCompleted((prev) => ({
      ...prev,
      [os]: {
        ...prev[os as keyof typeof prev],
        [step]: true,
      },
    }));
  };

  // Проверка, все ли шаги активной вкладки завершены
  const isTabCompleted = (tab: string) => {
    const steps = completed[tab as keyof typeof completed];
    return Object.values(steps).every((step) => step);
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
          Установка CLI Яндекс.Облака
        </h1>
        <p className="text-lg text-muted-foreground">
          Подробная инструкция по установке интерфейса командной строки для
          разных операционных систем
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
              <FaTerminal size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">CLI Яндекс.Облака</h2>
              <p className="text-muted-foreground text-sm">
                Интерфейс командной строки для управления ресурсами
                Яндекс.Облака
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
                  О CLI Яндекс.Облака
                </h3>
                <div className="mt-2 text-sm text-muted-foreground">
                  <p>
                    Интерфейс командной строки (CLI) Яндекс.Облака — это
                    инструмент, который позволяет управлять ресурсами и
                    сервисами Яндекс.Облака из командной строки. С его помощью
                    вы можете создавать и настраивать облачные ресурсы, получать
                    токены доступа и выполнять другие операции с облачной
                    инфраструктурой.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Вкладки для разных ОС */}
          <Tabs
            defaultValue="windows"
            className="w-full"
            onValueChange={(value: string) => setActiveTab(value)}
          >
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="windows" className="flex items-center gap-2">
                <FaWindows className="h-4 w-4" /> Windows
              </TabsTrigger>
              <TabsTrigger value="linux" className="flex items-center gap-2">
                <FaLinux className="h-4 w-4" /> Linux
              </TabsTrigger>
              <TabsTrigger value="mac" className="flex items-center gap-2">
                <FaApple className="h-4 w-4" /> macOS
              </TabsTrigger>
            </TabsList>

            {/* Контент вкладки Windows */}
            <TabsContent value="windows" className="space-y-8">
              {/* Шаг 1 - PowerShell */}
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
                        completed.windows.step1
                          ? "bg-green-100 dark:bg-green-900"
                          : "bg-primary/10"
                      }`}
                    >
                      {completed.windows.step1 ? (
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
                      Установка через PowerShell
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      Откройте PowerShell (рекомендуется с правами
                      администратора) и выполните следующую команду:
                    </p>
                    <div className="mt-3 bg-accent/5 p-4 rounded-xl border border-border">
                      <div className="bg-background rounded-md p-3 border border-border/50">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium flex items-center">
                            <FaWindows className="mr-2 h-4 w-4 text-primary" />
                            Команда для PowerShell
                          </h4>
                          <button
                            onClick={() => {
                              copyToClipboard(
                                installCommands.windows.powershell,
                                "Команда для PowerShell"
                              );
                              markStepComplete("windows", "step1");
                            }}
                            className="inline-flex items-center px-3 py-1.5 text-xs rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                          >
                            <FaCopy className="mr-1.5 h-3 w-3" />
                            Копировать
                          </button>
                        </div>
                        <div className="mt-2">
                          <div className="bg-muted p-2 rounded-md font-mono text-xs overflow-x-auto whitespace-nowrap">
                            {installCommands.windows.powershell}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Шаг 2 - CMD */}
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
                        completed.windows.step2
                          ? "bg-green-100 dark:bg-green-900"
                          : "bg-primary/10"
                      }`}
                    >
                      {completed.windows.step2 ? (
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
                      Установка через командную строку (CMD)
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      Альтернативный способ: откройте командную строку (cmd.exe)
                      и выполните:
                    </p>
                    <div className="mt-3 bg-accent/5 p-4 rounded-xl border border-border">
                      <div className="bg-background rounded-md p-3 border border-border/50">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium flex items-center">
                            <FaTerminal className="mr-2 h-4 w-4 text-primary" />
                            Команда для CMD
                          </h4>
                          <button
                            onClick={() => {
                              copyToClipboard(
                                installCommands.windows.cmd,
                                "Команда для CMD"
                              );
                              markStepComplete("windows", "step2");
                            }}
                            className="inline-flex items-center px-3 py-1.5 text-xs rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                          >
                            <FaCopy className="mr-1.5 h-3 w-3" />
                            Копировать
                          </button>
                        </div>
                        <div className="mt-2">
                          <div className="bg-muted p-2 rounded-md font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                            {installCommands.windows.cmd}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Шаг 3 - Завершение */}
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
                        completed.windows.step3
                          ? "bg-green-100 dark:bg-green-900"
                          : "bg-primary/10"
                      }`}
                    >
                      {completed.windows.step3 ? (
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
                      Завершение установки
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      После установки CLI Яндекс.Облака:
                    </p>

                    <div className="mt-3 bg-accent/5 p-4 rounded-xl border border-border">
                      <ul className="list-disc list-inside space-y-3 text-sm">
                        <li>
                          При установке согласитесь добавить каталог с yc в
                          переменную PATH, ответив{" "}
                          <code className="px-1.5 py-0.5 bg-muted rounded text-xs">
                            Y
                          </code>
                        </li>
                        <li>Перезапустите командную строку или терминал</li>
                        <li>Проверьте установку, выполнив команду:</li>
                      </ul>

                      <div className="mt-2 bg-background rounded-md p-3 border border-border/50">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium flex items-center">
                            <FaTerminal className="mr-2 h-4 w-4 text-primary" />
                            Команда CLI
                          </h4>
                          <button
                            onClick={() =>
                              copyToClipboard("yc --version", "Команда CLI")
                            }
                            className="inline-flex items-center px-3 py-1.5 text-xs rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                          >
                            <FaCopy className="mr-1.5 h-3 w-3" />
                            Копировать
                          </button>
                        </div>
                        <div className="mt-2">
                          <div className="bg-muted p-2 rounded-md font-mono text-xs overflow-x-auto">
                            yc --version
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            {/* Контент вкладки Linux */}
            <TabsContent value="linux" className="space-y-8">
              {/* Шаг 1 - Установка */}
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
                        completed.linux.step1
                          ? "bg-green-100 dark:bg-green-900"
                          : "bg-primary/10"
                      }`}
                    >
                      {completed.linux.step1 ? (
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
                      Установка CLI в Linux
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      Откройте терминал и выполните следующую команду:
                    </p>
                    <div className="mt-3 bg-accent/5 p-4 rounded-xl border border-border">
                      <div className="bg-background rounded-md p-3 border border-border/50">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium flex items-center">
                            <FaLinux className="mr-2 h-4 w-4 text-primary" />
                            Команда для установки
                          </h4>
                          <button
                            onClick={() => {
                              copyToClipboard(
                                installCommands.linux,
                                "Команда для Linux"
                              );
                              markStepComplete("linux", "step1");
                            }}
                            className="inline-flex items-center px-3 py-1.5 text-xs rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                          >
                            <FaCopy className="mr-1.5 h-3 w-3" />
                            Копировать
                          </button>
                        </div>
                        <div className="mt-2">
                          <div className="bg-muted p-2 rounded-md font-mono text-xs overflow-x-auto">
                            {installCommands.linux}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Шаг 2 - Примечания по Linux */}
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
                        completed.linux.step2
                          ? "bg-green-100 dark:bg-green-900"
                          : "bg-primary/10"
                      }`}
                    >
                      {completed.linux.step2 ? (
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
                      Дополнительная информация
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      Важные примечания по установке в Linux:
                    </p>

                    <div className="mt-3 bg-accent/5 p-4 rounded-xl border border-border">
                      <ul className="list-disc list-inside space-y-3 text-sm">
                        <li>
                          Скрипт установит CLI и добавит путь до исполняемого
                          файла в переменную окружения PATH
                        </li>
                        <li>
                          Скрипт дополнит переменную PATH только если его
                          запустить в командных оболочках bash или zsh
                        </li>
                        <li>
                          Если вы запустили скрипт в другой оболочке, добавьте
                          путь до CLI в переменную PATH самостоятельно
                        </li>
                        <li>
                          После завершения установки перезапустите командную
                          оболочку
                        </li>
                      </ul>

                      <div className="mt-4 p-3 bg-primary/5 rounded-md border border-primary/10 text-sm">
                        <p>
                          <strong>Важно:</strong> Для корректной работы
                          автодополнения при использовании zsh требуется версия
                          оболочки не ниже 5.1, а при использовании bash на
                          CentOS и производных дистрибутивах необходимо
                          установить пакет bash-completion.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            {/* Контент вкладки macOS */}
            <TabsContent value="mac" className="space-y-8">
              {/* Шаг 1 - Установка */}
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
                        completed.mac.step1
                          ? "bg-green-100 dark:bg-green-900"
                          : "bg-primary/10"
                      }`}
                    >
                      {completed.mac.step1 ? (
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
                      Установка CLI в macOS
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      Откройте терминал и выполните следующую команду:
                    </p>
                    <div className="mt-3 bg-accent/5 p-4 rounded-xl border border-border">
                      <div className="bg-background rounded-md p-3 border border-border/50">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium flex items-center">
                            <FaApple className="mr-2 h-4 w-4 text-primary" />
                            Команда для установки
                          </h4>
                          <button
                            onClick={() => {
                              copyToClipboard(
                                installCommands.mac,
                                "Команда для macOS"
                              );
                              markStepComplete("mac", "step1");
                            }}
                            className="inline-flex items-center px-3 py-1.5 text-xs rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                          >
                            <FaCopy className="mr-1.5 h-3 w-3" />
                            Копировать
                          </button>
                        </div>
                        <div className="mt-2">
                          <div className="bg-muted p-2 rounded-md font-mono text-xs overflow-x-auto">
                            {installCommands.mac}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Шаг 2 - Настройка автодополнения */}
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
                        completed.mac.step2
                          ? "bg-green-100 dark:bg-green-900"
                          : "bg-primary/10"
                      }`}
                    >
                      {completed.mac.step2 ? (
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
                      Настройка автодополнения
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      CLI поддерживает автодополнение команд в bash и zsh. Для
                      включения автодополнения:
                    </p>

                    <div className="mt-3 bg-accent/5 p-4 rounded-xl border border-border">
                      <ol className="list-decimal list-inside space-y-3 text-sm">
                        <li>Установите менеджер пакетов Homebrew</li>
                        <li>
                          Установите пакет zsh-completion или bash-completion:
                          <div className="mt-2 bg-background rounded-md p-3 border border-border/50">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium flex items-center">
                                <FaTerminal className="mr-2 h-4 w-4 text-primary" />
                                Команда CLI
                              </h4>
                              <button
                                onClick={() =>
                                  copyToClipboard(
                                    "brew install zsh-completion",
                                    "Команда CLI"
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
                                brew install zsh-completion
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          Скрипт установки автоматически дополнит
                          конфигурационный файл ~/.zshrc
                        </li>
                        <li>
                          Добавьте в ~/.zshrc следующие строки выше строк,
                          автоматически добавленных скриптом установки:
                          <div className="mt-2 bg-background rounded-md p-3 border border-border/50">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium flex items-center">
                                <FaTerminal className="mr-2 h-4 w-4 text-primary" />
                                Код для ~/.zshrc
                              </h4>
                              <button
                                onClick={() =>
                                  copyToClipboard(
                                    "if [ -f $(brew --prefix)/etc/zsh_completion ]; then\n  . $(brew --prefix)/etc/zsh_completion\nfi",
                                    "Код для zshrc"
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
                                if [ -f $(brew --prefix)/etc/zsh_completion ];
                                then
                                <br />
                                . $(brew --prefix)/etc/zsh_completion
                                <br />
                                fi
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          Перезапустите командную оболочку:
                          <div className="mt-2 bg-background rounded-md p-3 border border-border/50">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium flex items-center">
                                <FaTerminal className="mr-2 h-4 w-4 text-primary" />
                                Команда CLI
                              </h4>
                              <button
                                onClick={() =>
                                  copyToClipboard(
                                    "source ~/.zshrc",
                                    "Команда CLI"
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
                                source ~/.zshrc
                              </div>
                            </div>
                          </div>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Шаг 3 - Завершение */}
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
                        completed.mac.step3
                          ? "bg-green-100 dark:bg-green-900"
                          : "bg-primary/10"
                      }`}
                    >
                      {completed.mac.step3 ? (
                        <FaCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <span className="text-xl font-semibold text-primary">
                          3
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-medium">Проверка установки</h3>
                    <p className="mt-1 text-muted-foreground">
                      После установки и настройки проверьте работу CLI:
                    </p>

                    <div className="mt-3 bg-accent/5 p-4 rounded-xl border border-border">
                      <div className="space-y-3 text-sm">
                        <p>Выполните в терминале:</p>
                        <div className="bg-background rounded-md p-3 border border-border/50">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium flex items-center">
                              <FaTerminal className="mr-2 h-4 w-4 text-primary" />
                              Команда CLI
                            </h4>
                            <button
                              onClick={() =>
                                copyToClipboard("yc --version", "Команда CLI")
                              }
                              className="inline-flex items-center px-3 py-1.5 text-xs rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                            >
                              <FaCopy className="mr-1.5 h-3 w-3" />
                              Копировать
                            </button>
                          </div>
                          <div className="mt-2">
                            <div className="bg-muted p-2 rounded-md font-mono text-xs overflow-x-auto">
                              yc --version
                            </div>
                          </div>
                        </div>
                        <p>Должна отобразиться версия установленного CLI.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>

          {/* Следующий шаг */}
          <div className="mt-10 pt-6 border-t border-border">
            <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4">
              <Link
                href="/tokens"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center"
              >
                <FaArrowLeft className="mr-1.5 h-3 w-3" />
                Вернуться к токенам
              </Link>

              <Link
                href="/tokens/oauth-token"
                className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  isTabCompleted(activeTab)
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                Следующий шаг: Получение OAuth токена
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
          Подробнее об установке и использовании CLI Яндекс.Облака вы можете
          узнать в официальной документации:
        </p>
        <a
          href="https://cloud.yandex.ru/docs/cli/quickstart"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 rounded-lg bg-background border border-border hover:bg-accent/5 transition-colors"
        >
          <FaExternalLinkAlt className="mr-2 h-3 w-3 text-primary" />
          <span>Документация CLI Яндекс.Облака</span>
        </a>
      </div>
    </div>
  );
}
